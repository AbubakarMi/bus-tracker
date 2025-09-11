export type UserRole = 'student' | 'staff' | 'admin' | 'union' | 'driver';

export interface UserData {
  id: string;
  role: UserRole;
  email?: string;
  regNumber?: string;
  staffId?: string;
  name?: string;
  department?: string;
  course?: string;
  admissionYear?: string;
  busAssigned?: string;
}

// Student registration number pattern: UGYear/COURSE/SerialNo
const STUDENT_REG_PATTERN = /^UG\d{2}\/[A-Z]{2,6}\/\d{3,4}$/i;  // UG20/COMS/1284, UG25/BCHM/1003

// Staff ID pattern: Staff/Adustech/SerialNo
const STAFF_ID_PATTERN = /^Staff\/Adustech\/\d{3,4}$/i;  // Staff/Adustech/1022

// Admin email
const ADMIN_EMAIL = 'admin@adustech.edu.ng';

// Union identifier pattern (for external buses)
const UNION_ID_PATTERN = /^Union\/\d{3,4}$/i;

export function detectUserRole(identifier: string): UserRole | null {
  // Check if it's a student registration number
  if (STUDENT_REG_PATTERN.test(identifier)) {
    return 'student';
  }

  // Check if it's a staff ID
  if (STAFF_ID_PATTERN.test(identifier)) {
    return 'staff';
  }

  // Check if it's admin email
  if (identifier.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    return 'admin';
  }

  // Check if it's union identifier
  if (UNION_ID_PATTERN.test(identifier)) {
    return 'union';
  }

  // Check if it's a driver email (created by admin)
  if (identifier.includes('@') && identifier.includes('driver')) {
    return 'driver';
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
    case 'student':
      return '/dashboard/student';
    case 'staff':
      return '/dashboard/driver';
    case 'admin':
      return '/dashboard/admin';
    case 'driver':
      return '/dashboard/driver';
    case 'union':
      return '/dashboard';
    default:
      return '/dashboard';
  }
}

export function getAvailableFeatures(role: UserRole): string[] {
  switch (role) {
    case 'student':
      return ['book-seat', 'track-bus', 'view-schedule'];
    case 'staff':
      return ['driver-dashboard', 'route-management', 'passenger-list'];
    case 'driver':
      return ['driver-dashboard', 'route-management', 'passenger-list'];
    case 'admin':
      return ['user-management', 'bus-management', 'driver-management', 'route-management', 'analytics'];
    case 'union':
      return ['bus-management', 'route-management', 'passenger-list'];
    default:
      return [];
  }
}

// Mock user database - replace with real database later
export const mockUsers: Record<string, UserData> = {
  'UG20/COMS/1284': {
    id: 'UG20/COMS/1284',
    role: 'student',
    regNumber: 'UG20/COMS/1284',
    name: 'Ahmed Hassan',
    course: 'Computer Science',
    admissionYear: '2020',
    email: 'ahmed.hassan@student.adustech.edu.ng'
  },
  'UG25/BCHM/1003': {
    id: 'UG25/BCHM/1003',
    role: 'student',
    regNumber: 'UG25/BCHM/1003',
    name: 'Fatima Aliyu',
    course: 'Biochemistry',
    admissionYear: '2025',
    email: 'fatima.aliyu@student.adustech.edu.ng'
  },
  'Staff/Adustech/1022': {
    id: 'Staff/Adustech/1022',
    role: 'staff',
    staffId: 'Staff/Adustech/1022',
    name: 'Musa Ibrahim',
    department: 'Transport Department',
    email: 'musa.ibrahim@adustech.edu.ng'
  },
  'admin@adustech.edu.ng': {
    id: 'admin@adustech.edu.ng',
    role: 'admin',
    email: 'admin@adustech.edu.ng',
    name: 'Admin User'
  }
};

export function authenticateUser(identifier: string, password: string): UserData | null {
  // Special case for admin
  if (identifier.toLowerCase() === 'admin@adustech.edu.ng' && password === 'Password123') {
    return mockUsers['admin@adustech.edu.ng'];
  }

  const role = detectUserRole(identifier);
  if (!role) return null;

  // Check if user exists in mock database
  if (mockUsers[identifier]) {
    return mockUsers[identifier];
  }

  // Check if user exists in registered users (localStorage)
  if (typeof window !== 'undefined') {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    if (registeredUsers[identifier]) {
      return registeredUsers[identifier];
    }
  }

  // For demo, create a user if the format is valid and password is provided
  if (role === 'student' && STUDENT_REG_PATTERN.test(identifier)) {
    const parts = identifier.split('/');
    const year = parts[0].substring(2); // Extract year from UGxx
    const course = parts[1];
    const serialNo = parts[2];
    
    return {
      id: identifier,
      role: 'student',
      regNumber: identifier,
      name: `Student ${serialNo}`,
      course: course,
      admissionYear: `20${year}`,
      email: `student${serialNo}@student.adustech.edu.ng`
    };
  }

  if (role === 'staff' && STAFF_ID_PATTERN.test(identifier)) {
    const parts = identifier.split('/');
    const staffNo = parts[2];
    
    return {
      id: identifier,
      role: 'staff',
      staffId: identifier,
      name: `Staff ${staffNo}`,
      department: 'Transport Department',
      email: `staff${staffNo}@adustech.edu.ng`
    };
  }

  return null;
}

export function parseStudentRegNo(regNo: string): { year: string, course: string, serialNo: string } | null {
  const match = regNo.match(STUDENT_REG_PATTERN);
  if (!match) return null;
  
  const parts = regNo.split('/');
  return {
    year: parts[0].substring(2), // Remove UG prefix
    course: parts[1],
    serialNo: parts[2]
  };
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