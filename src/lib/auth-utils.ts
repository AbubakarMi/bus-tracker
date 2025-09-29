import { db, isFirebaseReady, waitForFirebase } from './firebase';
import { db as simpleDb, isSimpleFirebaseReady } from './firebase-fix';
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
import { emailService, type EmailOtpData } from './client-email-service';

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

// Helper function to check for existing users by email or ID with enhanced validation
async function checkForDuplicateUser(identifier: string, email: string, expectedRole: 'student' | 'staff'): Promise<{ exists: boolean; message: string }> {
  if (!db) {
    return { exists: false, message: '' };
  }

  try {
    // Check by ID/registration number
    const userDocById = await getDoc(doc(db, 'users', identifier));
    if (userDocById.exists()) {
      const existingUser = userDocById.data() as UserData;

      if (existingUser.role === expectedRole) {
        // Same role, same ID - duplicate account
        return {
          exists: true,
          message: `${identifier} already exists. Please login instead.`
        };
      } else {
        // Different role, same ID - prevent cross-role usage
        const existingRole = existingUser.role === 'student' ? 'student' : 'staff';
        return {
          exists: true,
          message: `${identifier} is registered as ${existingRole}. Cannot reuse ID.`
        };
      }
    }

    // Check by email across all users
    const usersRef = collection(db, 'users');
    const emailQuery = query(usersRef, where('email', '==', email.toLowerCase()));
    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      const existingUser = emailSnapshot.docs[0].data() as UserData;
      const userType = existingUser.role === 'student' ? 'student' : 'staff member';
      const userIdentifier = existingUser.regNumber || existingUser.staffId || existingUser.id;

      if (existingUser.role === expectedRole) {
        return {
          exists: true,
          message: `Email ${email} already exists. Try logging in.`
        };
      } else {
        return {
          exists: true,
          message: `Email used by ${userType}. Use different email.`
        };
      }
    }

    // Additional check: Look for similar identifiers that might be confused
    // This helps prevent registration number/staff ID conflicts
    const usersCollection = collection(db, 'users');
    const allUsersSnapshot = await getDocs(usersCollection);

    for (const userDoc of allUsersSnapshot.docs) {
      const userData = userDoc.data() as UserData;
      const existingId = userData.regNumber || userData.staffId || userData.id;

      // Check if identifier is very similar (case-insensitive)
      if (existingId && existingId.toLowerCase() === identifier.toLowerCase() && existingId !== identifier) {
        return {
          exists: true,
          message: `Similar ID "${existingId}" exists. Check your ${expectedRole === 'student' ? 'reg number' : 'staff ID'}.`
        };
      }
    }

    return { exists: false, message: '' };
  } catch (error) {
    console.error('Error checking for duplicate user:', error);
    return { exists: false, message: '' };
  }
}

// Registration functions
export async function registerStudent(regNo: string, password: string, name: string, course?: string, email?: string): Promise<UserData | null> {
  console.log('Registering student:', { regNo, name, course, dbStatus: !!db });

  if (!isValidStudentRegNo(regNo)) {
    throw new Error('Invalid registration number format');
  }

  if (!password || password.length < 6) {
    throw new Error('Password too short (min 6 chars)');
  }

  if (!name || name.trim().length < 2) {
    throw new Error('Name too short (min 2 chars)');
  }

  // Try primary Firebase first, then fallback to simple Firebase
  const firebaseReady = await waitForFirebase(3000);
  const useSimpleFirebase = !firebaseReady && isSimpleFirebaseReady();
  const activeDb = firebaseReady && db ? db : (useSimpleFirebase ? simpleDb : null);

  console.log('🔥 Firebase status check:', {
    primaryReady: firebaseReady,
    primaryDb: !!db,
    simpleReady: isSimpleFirebaseReady(),
    simpleDb: !!simpleDb,
    activeDb: !!activeDb,
    usingSimple: useSimpleFirebase
  });

  if (!activeDb) {
    console.warn('🔥 No Firestore available (primary or simple), using localStorage only');
    // Don't throw error, continue with localStorage-only registration
  }

  const parsedRegNo = parseStudentRegNo(regNo);
  if (!parsedRegNo) {
    throw new Error('Invalid reg number format');
  }

  const studentEmail = email || `${name.toLowerCase().replace(/\s+/g, '.')}@student.adustech.edu.ng`;

  // Check for duplicate users (by ID and email)
  const duplicateCheck = await checkForDuplicateUser(regNo, studentEmail, 'student');
  if (duplicateCheck.exists) {
    throw new Error(duplicateCheck.message);
  }

  const student: UserData = {
    id: regNo,
    role: 'student',
    regNumber: regNo,
    name: name,
    course: course || parsedRegNo.course,
    admissionYear: `20${parsedRegNo.year}`,
    email: studentEmail,
    password: password
  };

  try {
    // Always save to localStorage first (this will work regardless of Firebase)
    const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    localUsers[student.email] = student;
    localStorage.setItem('registeredUsers', JSON.stringify(localUsers));
    console.log('Student saved to localStorage for forgot password');

    // Try to save to Firestore if available
    if (activeDb) {
      const dbType = useSimpleFirebase ? 'Simple Firebase' : 'Primary Firebase';
      console.log(`🔄 Attempting to save student to ${dbType}...`, { regNo });
      await setDoc(doc(activeDb, 'users', regNo), student);
      console.log(`✅ Student registered successfully in ${dbType}:`, regNo);
    } else {
      console.log('📱 No Firestore available, student saved to localStorage only');
    }

    return student;
  } catch (error: any) {
    console.error('Error registering student:', error);
    if (error.message) {
      throw error; // Re-throw with original message
    }
    throw new Error('Registration failed. Try again.');
  }
}

export async function registerStaff(staffId: string, password: string, name: string, department?: string, email?: string): Promise<UserData | null> {
  console.log('Registering staff:', { staffId, name, department, dbStatus: !!db });

  if (!isValidStaffId(staffId)) {
    throw new Error('Invalid staff ID format');
  }

  if (!password || password.length < 6) {
    throw new Error('Password too short (min 6 chars)');
  }

  if (!name || name.trim().length < 2) {
    throw new Error('Name too short (min 2 chars)');
  }

  if (!db) {
    console.warn('Firestore not available, using localStorage only for staff registration');
    // Don't throw error, continue with localStorage-only registration
  }

  const parsedStaffId = parseStaffId(staffId);
  if (!parsedStaffId) {
    throw new Error('Invalid staff ID format');
  }

  const staffEmail = email || `${name.toLowerCase().replace(/\s+/g, '.')}@adustech.edu.ng`;

  // Check for duplicate users (by ID and email)
  const duplicateCheck = await checkForDuplicateUser(staffId, staffEmail, 'staff');
  if (duplicateCheck.exists) {
    throw new Error(duplicateCheck.message);
  }

  const staff: UserData = {
    id: staffId,
    role: 'staff',
    staffId: staffId,
    name: name,
    department: department || 'General',
    email: staffEmail,
    password: password
  };

  try {
    // Always save to localStorage first (this will work regardless of Firebase)
    const localStaff = JSON.parse(localStorage.getItem('registeredStaff') || '{}');
    localStaff[staff.email] = staff;
    localStorage.setItem('registeredStaff', JSON.stringify(localStaff));
    console.log('Staff saved to localStorage for forgot password');

    // Try to save to Firestore if available
    if (db) {
      console.log('Attempting to save staff to Firestore...', { staffId });
      await setDoc(doc(db, 'users', staffId), staff);
      console.log('Staff registered successfully in Firestore:', staffId);
    } else {
      console.log('Firestore not available, staff saved to localStorage only');
    }

    return staff;
  } catch (error: any) {
    console.error('Error registering staff:', error);
    if (error.message) {
      throw error; // Re-throw with original message
    }
    throw new Error('Registration failed. Try again.');
  }
}

// Send OTP email using the real email service
async function sendOTPEmail(data: OTPData): Promise<boolean> {
  try {
    // For development/testing, show the OTP clearly in console
    console.log('🔐 OTP GENERATED FOR TESTING:');
    console.log('============================');
    console.log(`📧 Email: ${data.userEmail}`);
    console.log(`🔑 OTP Code: ${data.otp}`);
    console.log(`⏰ Expires: ${data.expiresAt.toLocaleString()}`);
    console.log(`👤 User: ${data.userName} (${data.userType})`);
    console.log('============================');

    // Prepare email data for the email service
    const emailData: EmailOtpData = {
      email: data.userEmail,
      userName: data.userName,
      otp: data.otp,
      userType: data.userType,
      expiresAt: data.expiresAt.toLocaleString(),
    };

    // Send email using the real email service
    const result = await emailService.sendOtpEmail(emailData);

    if (result.success) {
      console.log('✅ OTP email sent successfully!');
      if (result.messageId) {
        console.log(`📧 Email ID: ${result.messageId}`);
      }
      return true;
    } else {
      console.error('❌ Failed to send OTP email:', result.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Failed to send OTP email:', error);
    return false;
  }
}

// Password Reset Functions (Email-based)

// Send password email function
async function sendPasswordEmail(data: {
  userEmail: string;
  userName: string;
  password: string;
  userType: string;
}): Promise<boolean> {
  try {
    // Simulate email sending
    console.log(`Sending password email to: ${data.userEmail}`);
    console.log(`Username: ${data.userName}`);
    console.log(`Password: ${data.password}`);
    console.log(`User Type: ${data.userType}`);

    // In a real application, you would use an email service like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - AWS SES
    // - etc.

    // For now, we'll simulate success
    return true;
  } catch (error) {
    console.error('Error sending password email:', error);
    return false;
  }
}
export async function requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
  if (!email || !email.trim()) {
    return { success: false, message: 'Email is required' };
  }

  if (!email.includes('@')) {
    return { success: false, message: 'Please enter a valid email address' };
  }

  console.log('Password reset requested for email:', email);

  try {
    let userData: UserData | null = null;

    // Check if it's admin email
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      userData = adminUser;
    } else {
      // Check localStorage first for registered users
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
      const registeredDrivers = JSON.parse(localStorage.getItem('registeredDrivers') || '{}');
      const registeredStaff = JSON.parse(localStorage.getItem('registeredStaff') || '{}');

      console.log('Checking localStorage for users...');
      console.log('registeredUsers:', Object.keys(registeredUsers).length, 'entries');
      console.log('registeredDrivers:', Object.keys(registeredDrivers).length, 'entries');
      console.log('registeredStaff:', Object.keys(registeredStaff).length, 'entries');

      // Debug: show all localStorage data
      console.log('All localStorage users:', {
        users: Object.keys(registeredUsers),
        drivers: Object.keys(registeredDrivers),
        staff: Object.keys(registeredStaff)
      });

      // Search by email in all localStorage data (exact match first)
      if (registeredUsers[email]) {
        userData = registeredUsers[email];
        console.log('Found user in registeredUsers by direct email key');
      } else if (registeredDrivers[email]) {
        userData = registeredDrivers[email];
        console.log('Found user in registeredDrivers by direct email key');
      } else if (registeredStaff[email]) {
        userData = registeredStaff[email];
        console.log('Found user in registeredStaff by direct email key');
      } else {
        // Search by iterating through all users (in case email is stored differently)
        console.log('Direct email key not found, searching all user objects...');

        for (const [key, user] of Object.entries(registeredUsers)) {
          console.log('Checking user:', key, 'email:', (user as any).email);
          if ((user as any).email === email) {
            userData = user as UserData;
            console.log('Found user in registeredUsers by email property');
            break;
          }
        }

        if (!userData) {
          for (const [key, user] of Object.entries(registeredDrivers)) {
            console.log('Checking driver:', key, 'email:', (user as any).email);
            if ((user as any).email === email) {
              userData = user as UserData;
              console.log('Found user in registeredDrivers by email property');
              break;
            }
          }
        }

        if (!userData) {
          for (const [key, user] of Object.entries(registeredStaff)) {
            console.log('Checking staff:', key, 'email:', (user as any).email);
            if ((user as any).email === email) {
              userData = user as UserData;
              console.log('Found user in registeredStaff by email property');
              break;
            }
          }
        }
      }

      // If not found locally and database is available, check Firestore
      if (!userData && db) {
        try {
          // First try exact match with lowercase email
          const usersRef = collection(db, 'users');
          const emailQuery = query(usersRef, where('email', '==', email.toLowerCase()));
          const emailSnapshot = await getDocs(emailQuery);

          if (!emailSnapshot.empty) {
            const userDoc = emailSnapshot.docs[0];
            userData = userDoc.data() as UserData;
          } else {
            // If not found, try case-insensitive search by getting all users and filtering
            console.log('Email not found with lowercase match, trying case-insensitive search...');
            const allUsersSnapshot = await getDocs(usersRef);
            console.log(`Total users in database: ${allUsersSnapshot.docs.length}`);

            // Debug: Log all user emails for troubleshooting
            const allEmails = allUsersSnapshot.docs.map(doc => {
              const user = doc.data() as UserData;
              return { id: doc.id, email: user.email, name: user.name, role: user.role };
            });
            console.log('All users in database:', allEmails);

            for (const userDoc of allUsersSnapshot.docs) {
              const user = userDoc.data() as UserData;
              if (user.email && user.email.toLowerCase() === email.toLowerCase()) {
                userData = user;
                console.log('Found user with case-insensitive match:', user.email);
                break;
              }
            }
          }
        } catch (error) {
          console.error('Error searching Firestore for user:', error);
        }
      }
    }

    if (!userData) {
      return {
        success: false,
        message: 'No account found with this email address'
      };
    }

    // Check if user can request new OTP
    if (!canRequestNewOTP(email.toLowerCase())) {
      return {
        success: false,
        message: 'Please wait before requesting another OTP'
      };
    }

    // Generate OTP
    const otp = generateOTP();
    const otpData: OTPData = {
      email: email.toLowerCase(),
      otp,
      userEmail: email,
      userName: userData.name,
      userType: userData.role,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      isUsed: false,
      createdAt: new Date(),
    };

    // Store OTP
    storeOTP(email.toLowerCase(), otp, otpData.expiresAt);

    // Send OTP email (simulated for now)
    const emailSent = await sendOTPEmail(otpData);

    if (emailSent) {
      console.log(`OTP sent to: ${email}`);
      return {
        success: true,
        message: 'OTP sent to your email address! Check your inbox and enter the code.'
      };
    } else {
      return {
        success: false,
        message: 'Could not send email. Please try again.'
      };
    }
  } catch (error) {
    console.error('Password reset error:', error);
    return {
      success: false,
      message: 'Could not send password email. Please try again.'
    };
  }
}

export async function resetPasswordWithOTP(email: string, otp: string, newPassword: string): Promise<{ success: boolean; message: string }> {
  if (!email || !otp || !newPassword) {
    return { success: false, message: 'All fields required' };
  }

  if (newPassword.length < 6) {
    return { success: false, message: 'Password too short (min 6 chars)' };
  }

  if (!db) {
    return { success: false, message: 'No internet connection' };
  }

  // Validate OTP
  const otpValidation = validateOTP(email.toLowerCase(), otp);
  if (!otpValidation.valid) {
    return { success: false, message: otpValidation.error || 'Invalid code' };
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
      message: 'Password reset successful. You can now login.'
    };

  } catch (error) {
    console.error('Error resetting password:', error);
    return {
      success: false,
      message: 'Reset failed. Try again.'
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

