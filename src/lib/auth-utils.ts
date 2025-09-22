import { db } from './firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

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
export async function registerStudent(regNo: string, password: string, name: string, course?: string): Promise<UserData | null> {
  if (!isValidStudentRegNo(regNo) || !password || !name || !db) return null;

  const parsedRegNo = parseStudentRegNo(regNo);
  if (!parsedRegNo) return null;

  const student: UserData = {
    id: regNo,
    role: 'student',
    regNumber: regNo,
    name: name,
    course: course || parsedRegNo.course,
    admissionYear: `20${parsedRegNo.year}`,
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@student.adustech.edu.ng`,
    password: password
  };

  try {
    // Check if user already exists
    const userDoc = await getDoc(doc(db, 'users', regNo));
    if (userDoc.exists()) {
      console.error('Student already registered');
      return null;
    }

    // Save to Firestore
    await setDoc(doc(db, 'users', regNo), student);
    return student;
  } catch (error) {
    console.error('Error registering student:', error);
    return null;
  }
}

export async function registerStaff(staffId: string, password: string, name: string, department?: string): Promise<UserData | null> {
  if (!isValidStaffId(staffId) || !password || !name || !db) return null;

  const parsedStaffId = parseStaffId(staffId);
  if (!parsedStaffId) return null;

  const staff: UserData = {
    id: staffId,
    role: 'staff',
    staffId: staffId,
    name: name,
    department: department || 'General',
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@adustech.edu.ng`,
    password: password
  };

  try {
    // Check if user already exists
    const userDoc = await getDoc(doc(db, 'users', staffId));
    if (userDoc.exists()) {
      console.error('Staff already registered');
      return null;
    }

    // Save to Firestore
    await setDoc(doc(db, 'users', staffId), staff);
    return staff;
  } catch (error) {
    console.error('Error registering staff:', error);
    return null;
  }
}

