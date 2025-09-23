const express = require('express');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { db } = require('../config/firebase');
const { sendResetEmail } = require('../services/sendResetEmail');

const router = express.Router();

// Rate limiting for password reset endpoints
const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many password reset attempts. Please try again later.',
    retryAfter: 15 * 60 // 15 minutes in seconds
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: {
    error: 'Too many forgot password requests. Please try again later.',
    retryAfter: 15 * 60 // 15 minutes in seconds
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Helper function to generate secure reset token
 */
function generateResetToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Helper function to find user by email
 */
async function findUserByEmail(email) {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email.toLowerCase()).get();

    if (snapshot.empty) {
      return null;
    }

    const userDoc = snapshot.docs[0];
    return {
      id: userDoc.id,
      ...userDoc.data()
    };
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
}

/**
 * POST /forgot-password
 * Request password reset for a user
 */
router.post('/forgot-password',
  forgotPasswordLimiter,
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Invalid email address',
          details: errors.array()
        });
      }

      const { email } = req.body;

      // Always respond with success message to prevent email enumeration
      const successResponse = {
        message: 'If that email exists in our system, a reset link was sent.'
      };

      // Check if user exists
      const user = await findUserByEmail(email);

      if (!user) {
        // Don't reveal that user doesn't exist - return success anyway
        console.log(`Password reset requested for non-existent email: ${email}`);
        return res.status(200).json(successResponse);
      }

      // Generate secure reset token
      const resetToken = generateResetToken();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

      // Save reset token to Firestore
      const resetData = {
        email: email.toLowerCase(),
        token: resetToken,
        expiresAt: expiresAt,
        createdAt: new Date(),
        used: false,
        userId: user.id
      };

      await db.collection('passwordResets').doc(resetToken).set(resetData);

      // Send reset email
      const emailSent = await sendResetEmail(email, resetToken, user.name || 'User');

      if (!emailSent) {
        console.error('Failed to send reset email for user:', email);
        // Don't reveal email sending failure to user
      }

      console.log(`Password reset token generated for user: ${email}`);
      res.status(200).json(successResponse);

    } catch (error) {
      console.error('Error in forgot password endpoint:', error);
      res.status(500).json({
        error: 'Internal server error. Please try again later.'
      });
    }
  }
);

/**
 * POST /reset-password
 * Reset user password using token
 */
router.post('/reset-password',
  resetPasswordLimiter,
  [
    body('token')
      .isLength({ min: 32, max: 128 })
      .withMessage('Invalid reset token format'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Invalid input',
          details: errors.array()
        });
      }

      const { token, newPassword } = req.body;

      // Look up reset token in Firestore
      const resetDoc = await db.collection('passwordResets').doc(token).get();

      if (!resetDoc.exists) {
        return res.status(400).json({
          error: 'Invalid or expired reset token'
        });
      }

      const resetData = resetDoc.data();

      // Check if token has expired
      if (resetData.expiresAt.toDate() < new Date()) {
        // Clean up expired token
        await db.collection('passwordResets').doc(token).delete();
        return res.status(400).json({
          error: 'Reset token has expired. Please request a new password reset.'
        });
      }

      // Check if token has already been used
      if (resetData.used) {
        return res.status(400).json({
          error: 'This reset token has already been used. Please request a new password reset.'
        });
      }

      // Find the user
      const user = await findUserByEmail(resetData.email);
      if (!user) {
        return res.status(400).json({
          error: 'User account not found'
        });
      }

      // Hash the new password
      const saltRounds = 12;
      const passwordHash = await bcryptjs.hash(newPassword, saltRounds);

      // Update user's password in Firestore
      await db.collection('users').doc(user.id).update({
        password: passwordHash, // Store as 'password' to match existing schema
        passwordHash: passwordHash, // Also store as 'passwordHash' for future compatibility
        passwordUpdatedAt: new Date()
      });

      // Mark token as used (don't delete for audit trail)
      await db.collection('passwordResets').doc(token).update({
        used: true,
        usedAt: new Date()
      });

      console.log(`Password successfully reset for user: ${resetData.email}`);

      res.status(200).json({
        message: 'Password reset successful. You can now log in with your new password.'
      });

    } catch (error) {
      console.error('Error in reset password endpoint:', error);
      res.status(500).json({
        error: 'Internal server error. Please try again later.'
      });
    }
  }
);

/**
 * POST /validate-reset-token
 * Validate if a reset token is valid (optional endpoint for frontend)
 */
router.post('/validate-reset-token',
  [
    body('token')
      .isLength({ min: 32, max: 128 })
      .withMessage('Invalid reset token format'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Invalid token format',
          valid: false
        });
      }

      const { token } = req.body;

      // Look up reset token
      const resetDoc = await db.collection('passwordResets').doc(token).get();

      if (!resetDoc.exists) {
        return res.status(200).json({
          valid: false,
          error: 'Invalid reset token'
        });
      }

      const resetData = resetDoc.data();

      // Check if expired
      if (resetData.expiresAt.toDate() < new Date()) {
        return res.status(200).json({
          valid: false,
          error: 'Reset token has expired'
        });
      }

      // Check if used
      if (resetData.used) {
        return res.status(200).json({
          valid: false,
          error: 'Reset token has already been used'
        });
      }

      res.status(200).json({
        valid: true,
        email: resetData.email
      });

    } catch (error) {
      console.error('Error validating reset token:', error);
      res.status(500).json({
        error: 'Internal server error',
        valid: false
      });
    }
  }
);

/**
 * GET /cleanup-expired-tokens
 * Cleanup expired reset tokens (should be called by a cron job)
 */
router.post('/cleanup-expired-tokens', async (req, res) => {
  try {
    const now = new Date();
    const expiredTokensRef = db.collection('passwordResets')
      .where('expiresAt', '<', now);

    const snapshot = await expiredTokensRef.get();

    if (snapshot.empty) {
      return res.status(200).json({
        message: 'No expired tokens to clean up',
        deletedCount: 0
      });
    }

    const batch = db.batch();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    console.log(`Cleaned up ${snapshot.size} expired reset tokens`);

    res.status(200).json({
      message: 'Expired tokens cleaned up successfully',
      deletedCount: snapshot.size
    });

  } catch (error) {
    console.error('Error cleaning up expired tokens:', error);
    res.status(500).json({
      error: 'Failed to clean up expired tokens'
    });
  }
});

module.exports = router;