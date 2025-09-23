import { db } from './firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import {
  generateOTP,
  generateOTPEmailHTML,
  generateOTPEmailText,
  storeOTP,
  validateOTP,
  markOTPAsUsed,
  canRequestNewOTP,
  type OTPData
} from './otp-service';

export type UserRole = 'admin' | 'driver' | 'student' | 'staff';

export interface UserData {
  id: string;
  role: UserRole;
  email?: string;
  regNumber?: string;
  staffId?: string;
  name: string;
  department?: string;
  course?: string;
  admissionYear?: string;
  busAssigned?: string;
  password?: string;
}

// Student registration number pattern: UGYear/COURSE/SerialNo
const STUDENT_REG_PATTERN = /^UG\d{2}\/[A-Z]{2,6}\/\d{3,4}$/i;

// Staff ID pattern: Staff/Adustech/SerialNo
const STAFF_ID_PATTERN = /^Staff\/Adustech\/\d{3,4}$/i;

// Admin email
const ADMIN_EMAIL = 'admin@adustech.edu.ng';
const DEFAULT_PASSWORD = 'pass123';

export function detectUserRole(identifier: string): UserRole | null {
  // Check if it's admin email
  if (identifier.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    return 'admin';
  }

  // Check if it's a student registration number
  if (STUDENT_REG_PATTERN.test(identifier)) {
    return 'student';
  }

  // Check if it's a staff ID
  if (STAFF_ID_PATTERN.test(identifier)) {
    return 'staff';
  }

  // Check if it's a driver email (any email created by admin)
  if (identifier.includes('@') && !identifier.toLowerCase().includes('admin')) {
    // Check if it's in the registered drivers (created by admin)
    if (typeof window !== 'undefined') {
      const registeredDrivers = JSON.parse(localStorage.getItem('registeredDrivers') || '{}');
      if (registeredDrivers[identifier]) {
        return 'driver';
      }
    }
  }

  return null;
}

export function validateCredentials(identifier: string, password: string): boolean {
  return identifier.trim().length > 0 && password.trim().length > 0;
}

export function formatDisplayName(userData: UserData): string {
  if (userData.name) return userData.name;

  if (userData.role === 'student' && userData.regNumber) {
    const parts = userData.regNumber.split('/');
    return `${parts[1]} Student - ${parts[2]}`;
  }

  if (userData.role === 'staff' && userData.staffId) {
    return `Staff ${userData.staffId.split('/')[2]}`;
  }

  if (userData.email) {
    return userData.email.split('@')[0];
  }

  return userData.id;
}

export function getDashboardPath(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/dashboard/admin';
    case 'driver':
      return '/dashboard/driver';
    case 'student':
      return '/student/dashboard';
    case 'staff':
      return '/staff/dashboard';
    default:
      return '/dashboard';
  }
}

export function getAvailableFeatures(role: UserRole): string[] {
  switch (role) {
    case 'admin':
      return ['user-management', 'bus-management', 'driver-management', 'route-management', 'analytics'];
    case 'driver':
      return ['driver-dashboard', 'route-management', 'passenger-list'];
    case 'student':
      return ['book-seat', 'track-bus', 'view-schedule'];
    case 'staff':
      return ['book-seat', 'track-bus', 'view-schedule', 'staff-reports'];
    default:
      return [];
  }
}

// Admin user data
const adminUser: UserData = {
  id: 'admin@adustech.edu.ng',
  role: 'admin',
  email: 'admin@adustech.edu.ng',
  name: 'Admin User'
};

export async function authenticateUser(identifier: string, password: string): Promise<UserData | null> {
  // Check admin credentials
  if (identifier.toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === DEFAULT_PASSWORD) {
    return adminUser;
  }

  const role = detectUserRole(identifier);
  if (!role || !db) return null;

  try {
    // Check user credentials in Firestore
    const userDoc = await getDoc(doc(db, 'users', identifier));

    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData;
      if (userData.password === password) {
        return userData;
      }
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
  }

  return null;
}

// Course mapping based on registration number prefix
const COURSE_MAPPING: { [key: string]: string } = {
  'COMS': 'Computer Science',
  'ICT': 'Information Communication Technology',
  'BIOL': 'Biology',
  'MATHS': 'Mathematics',
  'STA': 'Statistics',
  'CRS': 'Crop Science',
  'BIOC': 'Biochemistry',
  'CHEM': 'Chemistry'
};

// Helper functions for validation
export function parseStudentRegNo(regNo: string): { year: string, course: string, serialNo: string } | null {
  const match = regNo.match(STUDENT_REG_PATTERN);
  if (!match) return null;

  const parts = regNo.split('/');
  const courseCode = parts[1].toUpperCase();
  const fullCourseName = COURSE_MAPPING[courseCode] || courseCode;

  return {
    year: parts[0].substring(2), // Remove UG prefix
    course: fullCourseName,
    serialNo: parts[2]
  };
}

export function detectCourseFromRegNo(regNo: string): string | null {
  const parsed = parseStudentRegNo(regNo);
  return parsed ? parsed.course : null;
}

export function parseStaffId(staffId: string): { serialNo: string } | null {
  const match = staffId.match(STAFF_ID_PATTERN);
  if (!match) return null;

  const parts = staffId.split('/');
  return {
    serialNo: parts[2]
  };
}

export function isValidStudentRegNo(regNo: string): boolean {
  return STUDENT_REG_PATTERN.test(regNo);
}

export function isValidStaffId(staffId: string): boolean {
  return STAFF_ID_PATTERN.test(staffId);
}

// Registration functions
export async function registerStudent(regNo: string, password: string, name: string, course?: string, email?: string): Promise<UserData | null> {
  console.log('Registering student:', { regNo, name, course, dbStatus: !!db });

  if (!isValidStudentRegNo(regNo)) {
    throw new Error('Invalid registration number format');
  }

  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }

  if (!name || name.trim().length < 2) {
    throw new Error('Name must be at least 2 characters long');
  }

  if (!db) {
    throw new Error('Database connection not available. Please check your internet connection.');
  }

  const parsedRegNo = parseStudentRegNo(regNo);
  if (!parsedRegNo) {
    throw new Error('Unable to parse registration number');
  }

  const student: UserData = {
    id: regNo,
    role: 'student',
    regNumber: regNo,
    name: name,
    course: course || parsedRegNo.course,
    admissionYear: `20${parsedRegNo.year}`,
    email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@student.adustech.edu.ng`,
    password: password
  };

  try {
    // Check if user already exists
    const userDoc = await getDoc(doc(db, 'users', regNo));
    if (userDoc.exists()) {
      throw new Error('A student with this registration number is already registered');
    }

    // Save to Firestore
    await setDoc(doc(db, 'users', regNo), student);
    console.log('Student registered successfully:', regNo);
    return student;
  } catch (error: any) {
    console.error('Error registering student:', error);
    if (error.message) {
      throw error; // Re-throw with original message
    }
    throw new Error('Failed to register student. Please try again.');
  }
}

export async function registerStaff(staffId: string, password: string, name: string, department?: string, email?: string): Promise<UserData | null> {
  console.log('Registering staff:', { staffId, name, department, dbStatus: !!db });

  if (!isValidStaffId(staffId)) {
    throw new Error('Invalid staff ID format');
  }

  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }

  if (!name || name.trim().length < 2) {
    throw new Error('Name must be at least 2 characters long');
  }

  if (!db) {
    throw new Error('Database connection not available. Please check your internet connection.');
  }

  const parsedStaffId = parseStaffId(staffId);
  if (!parsedStaffId) {
    throw new Error('Unable to parse staff ID');
  }

  const staff: UserData = {
    id: staffId,
    role: 'staff',
    staffId: staffId,
    name: name,
    department: department || 'General',
    email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@adustech.edu.ng`,
    password: password
  };

  try {
    // Check if user already exists
    const userDoc = await getDoc(doc(db, 'users', staffId));
    if (userDoc.exists()) {
      throw new Error('A staff member with this ID is already registered');
    }

    // Save to Firestore
    await setDoc(doc(db, 'users', staffId), staff);
    console.log('Staff registered successfully:', staffId);
    return staff;
  } catch (error: any) {
    console.error('Error registering staff:', error);
    if (error.message) {
      throw error; // Re-throw with original message
    }
    throw new Error('Failed to register staff member. Please try again.');
  }
}

// Simple email sending function for OTP (mock implementation)
async function sendOTPEmail(data: OTPData): Promise<boolean> {
  try {
    // For development/testing - log email content
    console.log('📧 OTP Email:', {
      to: data.userEmail,
      subject: 'Password Reset Verification Code - ADUSTECH Bus Tracker',
      otp: data.otp,
      expiresAt: data.expiresAt,
    });

    console.log('📄 Email Content:', generateOTPEmailHTML(data));

    // In a real implementation, you would integrate with:
    // - Resend API
    // - Nodemailer with SMTP
    // - SendGrid API
    // - AWS SES
    // etc.

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For now, always return success (replace with actual email service call)
    return true;
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    return false;
  }
}

// Password Reset Functions (OTP-based)
export async function requestPasswordReset(identifier: string): Promise<{ success: boolean; message: string }> {
  if (!identifier || !identifier.trim()) {
    return { success: false, message: 'Please enter your email address, registration number, or staff ID' };
  }

  if (!db) {
    return { success: false, message: 'Database connection not available. Please check your internet connection.' };
  }

  try {
    let userData: UserData | null = null;
    let userEmail: string | null = null;

    // Check if it's admin email
    if (identifier.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      userData = adminUser;
      userEmail = ADMIN_EMAIL;
    } else {
      // Check if it's a direct email
      if (identifier.includes('@')) {
        // Search by email
        const usersRef = collection(db, 'users');
        const emailQuery = query(usersRef, where('email', '==', identifier.toLowerCase()));
        const emailSnapshot = await getDocs(emailQuery);

        if (!emailSnapshot.empty) {
          const userDoc = emailSnapshot.docs[0];
          userData = userDoc.data() as UserData;
          userEmail = userData.email || identifier;
        }
      } else {
        // Check by registration number or staff ID
        const userDoc = await getDoc(doc(db, 'users', identifier));
        if (userDoc.exists()) {
          userData = userDoc.data() as UserData;
          userEmail = userData.email || generateEmailFromIdentifier(identifier, userData.name);
        }
      }
    }

    if (!userData || !userEmail) {
      return {
        success: false,
        message: 'No account found with that email address, registration number, or staff ID'
      };
    }

    // Check if user can request new OTP (rate limiting)
    if (!canRequestNewOTP(userEmail)) {
      return {
        success: false,
        message: 'A verification code was already sent to your email. Please check your inbox or wait before requesting a new code.'
      };
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP
    storeOTP(userEmail, otp, expiresAt);

    // Prepare email data
    const emailData: OTPData = {
      userEmail,
      userName: userData.name,
      otp,
      expiresAt,
      userType: userData.role
    };

    // Send OTP email
    const emailSent = await sendOTPEmail(emailData);

    if (emailSent) {
      console.log(`Password reset OTP sent to: ${userEmail}`);
      return {
        success: true,
        message: 'A 6-digit verification code has been sent to your email address. Please check your inbox.'
      };
    } else {
      return {
        success: false,
        message: 'Failed to send reset email. Please try again later.'
      };
    }

  } catch (error) {
    console.error('Error in password reset request:', error);
    return {
      success: false,
      message: 'An error occurred while processing your request. Please try again.'
    };
  }
}

export async function resetPasswordWithOTP(email: string, otp: string, newPassword: string): Promise<{ success: boolean; message: string }> {
  if (!email || !otp || !newPassword) {
    return { success: false, message: 'Email, verification code, and new password are required' };
  }

  if (newPassword.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters long' };
  }

  if (!db) {
    return { success: false, message: 'Database connection not available' };
  }

  // Validate OTP
  const otpValidation = validateOTP(email.toLowerCase(), otp);
  if (!otpValidation.valid) {
    return { success: false, message: otpValidation.error || 'Invalid verification code' };
  }

  try {
    // Find user by email
    let userData: UserData | null = null;
    let userId: string | null = null;

    // Check if it's admin
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      return {
        success: false,
        message: 'Admin password cannot be reset through this system. Please contact system administrator.'
      };
    }

    // Search by email in Firestore
    const usersRef = collection(db, 'users');
    const emailQuery = query(usersRef, where('email', '==', email.toLowerCase()));
    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      const userDoc = emailSnapshot.docs[0];
      userData = userDoc.data() as UserData;
      userId = userDoc.id;
    }

    if (!userData || !userId) {
      return { success: false, message: 'User account not found' };
    }

    // Update password in Firestore
    await updateDoc(doc(db, 'users', userId), {
      password: newPassword,
      passwordUpdatedAt: new Date()
    });

    // Mark OTP as used
    markOTPAsUsed(otp);

    console.log(`Password reset successful for user: ${userId}`);
    return {
      success: true,
      message: 'Your password has been reset successfully. You can now log in with your new password.'
    };

  } catch (error) {
    console.error('Error resetting password:', error);
    return {
      success: false,
      message: 'An error occurred while resetting your password. Please try again.'
    };
  }
}

// Helper function to generate email from identifier and name
function generateEmailFromIdentifier(identifier: string, name: string): string {
  if (isValidStudentRegNo(identifier)) {
    return `${name.toLowerCase().replace(/\s+/g, '.')}@student.adustech.edu.ng`;
  } else if (isValidStaffId(identifier)) {
    return `${name.toLowerCase().replace(/\s+/g, '.')}@adustech.edu.ng`;
  }
  return `${identifier.toLowerCase()}@adustech.edu.ng`;
}

// Function to find user by various identifiers
export async function findUserByIdentifier(identifier: string): Promise<UserData | null> {
  if (!db) return null;

  try {
    // Check admin
    if (identifier.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      return adminUser;
    }

    // Check by direct ID
    const userDoc = await getDoc(doc(db, 'users', identifier));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }

    // Check by email
    if (identifier.includes('@')) {
      const usersRef = collection(db, 'users');
      const emailQuery = query(usersRef, where('email', '==', identifier.toLowerCase()));
      const emailSnapshot = await getDocs(emailQuery);

      if (!emailSnapshot.empty) {
        return emailSnapshot.docs[0].data() as UserData;
      }
    }

    return null;
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
}

