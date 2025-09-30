/**
 * User Database Seeding Utility
 *
 * This utility helps populate the database with test users
 * Run this in browser console or create an admin page to seed data
 */

import { db } from './firebase';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import type { UserData } from './auth-utils';

// Test users to seed
const testUsers: UserData[] = [
  // Student 1
  {
    id: 'UG20/COMS/1184',
    role: 'student',
    regNumber: 'UG20/COMS/1184',
    name: 'John Doe',
    course: 'Computer Science',
    admissionYear: '2020',
    email: 'john.doe@student.adustech.edu.ng',
    password: 'password123'
  },
  // Student 2
  {
    id: 'UG21/ICT/2234',
    role: 'student',
    regNumber: 'UG21/ICT/2234',
    name: 'Jane Smith',
    course: 'Information Communication Technology',
    admissionYear: '2021',
    email: 'jane.smith@student.adustech.edu.ng',
    password: 'password123'
  },
  // Staff 1
  {
    id: 'Staff/Adustech/1001',
    role: 'staff',
    staffId: 'Staff/Adustech/1001',
    name: 'Dr. Muhammad Ahmed',
    department: 'Transport Department',
    email: 'muhammad.ahmed@adustech.edu.ng',
    password: 'password123'
  },
  // Staff 2
  {
    id: 'Staff/Adustech/1002',
    role: 'staff',
    staffId: 'Staff/Adustech/1002',
    name: 'Fatima Hassan',
    department: 'Administration',
    email: 'fatima.hassan@adustech.edu.ng',
    password: 'password123'
  }
];

/**
 * Seed users to Firestore
 */
export async function seedUsersToFirestore(): Promise<{ success: boolean; message: string; count: number }> {
  if (!db) {
    return {
      success: false,
      message: 'Firestore not available',
      count: 0
    };
  }

  try {
    console.log('🌱 Starting user seeding to Firestore...');
    let successCount = 0;
    let errorCount = 0;

    for (const user of testUsers) {
      try {
        await setDoc(doc(db, 'users', user.id), user);
        console.log(`✅ Seeded user: ${user.name} (${user.id})`);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to seed user ${user.id}:`, error);
        errorCount++;
      }
    }

    return {
      success: errorCount === 0,
      message: `Seeded ${successCount} users successfully${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
      count: successCount
    };
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      count: 0
    };
  }
}

/**
 * Seed users to localStorage
 */
export function seedUsersToLocalStorage(): { success: boolean; message: string; count: number } {
  try {
    console.log('🌱 Starting user seeding to localStorage...');

    // Separate students and staff
    const students = testUsers.filter(u => u.role === 'student');
    const staff = testUsers.filter(u => u.role === 'staff');

    // Seed students
    const registeredUsers: Record<string, UserData> = {};
    students.forEach(student => {
      registeredUsers[student.id] = student; // By registration number
      if (student.email) {
        registeredUsers[student.email] = student; // By email
      }
    });
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    // Seed staff
    const registeredStaff: Record<string, UserData> = {};
    staff.forEach(staffMember => {
      registeredStaff[staffMember.id] = staffMember; // By staff ID
      if (staffMember.email) {
        registeredStaff[staffMember.email] = staffMember; // By email
      }
    });
    localStorage.setItem('registeredStaff', JSON.stringify(registeredStaff));

    console.log(`✅ Seeded ${students.length} students and ${staff.length} staff to localStorage`);

    return {
      success: true,
      message: `Seeded ${students.length} students and ${staff.length} staff to localStorage`,
      count: testUsers.length
    };
  } catch (error) {
    console.error('❌ Error seeding users to localStorage:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      count: 0
    };
  }
}

/**
 * Seed users to both Firestore and localStorage
 */
export async function seedUsers(): Promise<void> {
  console.log('🚀 Starting user seeding process...');
  console.log('📋 Test users to seed:', testUsers.length);

  // Seed to localStorage first (always works)
  const localResult = seedUsersToLocalStorage();
  console.log('📱 localStorage result:', localResult);

  // Seed to Firestore (if available)
  const firestoreResult = await seedUsersToFirestore();
  console.log('🔥 Firestore result:', firestoreResult);

  console.log('✨ Seeding complete!');
  console.log(`
Test User Credentials:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👨‍🎓 STUDENTS:
1. Reg No: UG20/COMS/1184
   Email: john.doe@student.adustech.edu.ng
   Password: password123

2. Reg No: UG21/ICT/2234
   Email: jane.smith@student.adustech.edu.ng
   Password: password123

👔 STAFF:
1. Staff ID: Staff/Adustech/1001
   Email: muhammad.ahmed@adustech.edu.ng
   Password: password123

2. Staff ID: Staff/Adustech/1002
   Email: fatima.hassan@adustech.edu.ng
   Password: password123

👑 ADMIN:
   Email: admin@adustech.edu.ng
   Password: pass123

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
}

/**
 * Check existing users in Firestore
 */
export async function checkFirestoreUsers(): Promise<void> {
  if (!db) {
    console.error('❌ Firestore not available');
    return;
  }

  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);

    console.log(`📊 Found ${snapshot.size} users in Firestore:`);
    snapshot.forEach((doc) => {
      const user = doc.data() as UserData;
      console.log(`  - ${user.name} (${user.role}): ${doc.id}`);
    });
  } catch (error) {
    console.error('❌ Error checking Firestore users:', error);
  }
}

/**
 * Check existing users in localStorage
 */
export function checkLocalStorageUsers(): void {
  try {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    const registeredStaff = JSON.parse(localStorage.getItem('registeredStaff') || '{}');

    const studentCount = Object.keys(registeredUsers).length;
    const staffCount = Object.keys(registeredStaff).length;

    console.log(`📱 localStorage users:`);
    console.log(`  - Students: ${studentCount}`);
    console.log(`  - Staff: ${staffCount}`);

    if (studentCount > 0) {
      console.log('  📚 Students:');
      Object.entries(registeredUsers).forEach(([key, user]) => {
        const userData = user as UserData;
        console.log(`    - ${userData.name} (${key})`);
      });
    }

    if (staffCount > 0) {
      console.log('  👔 Staff:');
      Object.entries(registeredStaff).forEach(([key, user]) => {
        const userData = user as UserData;
        console.log(`    - ${userData.name} (${key})`);
      });
    }
  } catch (error) {
    console.error('❌ Error checking localStorage users:', error);
  }
}

/**
 * Manually add a single user to localStorage (for debugging)
 */
export function addUserManually(userData: UserData): { success: boolean; message: string } {
  try {
    const storageKey = userData.role === 'student' ? 'registeredUsers' : 'registeredStaff';
    const existingUsers = JSON.parse(localStorage.getItem(storageKey) || '{}');

    // Save with both ID and email as keys
    existingUsers[userData.id] = userData;
    if (userData.email) {
      existingUsers[userData.email] = userData;
    }

    localStorage.setItem(storageKey, JSON.stringify(existingUsers));

    console.log(`✅ Manually added user: ${userData.name} (${userData.id})`);
    return {
      success: true,
      message: `User ${userData.id} added successfully`
    };
  } catch (error) {
    console.error('❌ Error adding user manually:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Search for a specific user in localStorage
 */
export function findUser(identifier: string): { found: boolean; user?: UserData; location?: string } {
  try {
    // Check students
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    if (registeredUsers[identifier]) {
      console.log('✅ Found user in registeredUsers:', registeredUsers[identifier]);
      return { found: true, user: registeredUsers[identifier], location: 'registeredUsers' };
    }

    // Check staff
    const registeredStaff = JSON.parse(localStorage.getItem('registeredStaff') || '{}');
    if (registeredStaff[identifier]) {
      console.log('✅ Found user in registeredStaff:', registeredStaff[identifier]);
      return { found: true, user: registeredStaff[identifier], location: 'registeredStaff' };
    }

    // Search by email in all users
    for (const [key, user] of Object.entries(registeredUsers)) {
      const userData = user as UserData;
      if (userData.email?.toLowerCase() === identifier.toLowerCase() ||
          userData.id === identifier ||
          userData.regNumber === identifier) {
        console.log('✅ Found user by search:', userData);
        return { found: true, user: userData, location: 'registeredUsers' };
      }
    }

    for (const [key, user] of Object.entries(registeredStaff)) {
      const userData = user as UserData;
      if (userData.email?.toLowerCase() === identifier.toLowerCase() ||
          userData.id === identifier ||
          userData.staffId === identifier) {
        console.log('✅ Found user by search:', userData);
        return { found: true, user: userData, location: 'registeredStaff' };
      }
    }

    console.log('❌ User not found:', identifier);
    return { found: false };
  } catch (error) {
    console.error('❌ Error searching for user:', error);
    return { found: false };
  }
}

/**
 * Fix user data (re-save with correct keys)
 */
export function fixUserData(identifier: string): { success: boolean; message: string } {
  const result = findUser(identifier);

  if (!result.found || !result.user) {
    return { success: false, message: 'User not found' };
  }

  const user = result.user;
  const storageKey = user.role === 'student' ? 'registeredUsers' : 'registeredStaff';
  const existingUsers = JSON.parse(localStorage.getItem(storageKey) || '{}');

  // Re-save with both keys
  existingUsers[user.id] = user;
  if (user.email) {
    existingUsers[user.email] = user;
  }
  if (user.regNumber) {
    existingUsers[user.regNumber] = user;
  }
  if (user.staffId) {
    existingUsers[user.staffId] = user;
  }

  localStorage.setItem(storageKey, JSON.stringify(existingUsers));

  console.log(`✅ Fixed user data for: ${user.name} (${user.id})`);
  return { success: true, message: `User ${user.id} data fixed successfully` };
}

// Make functions available globally in browser console
if (typeof window !== 'undefined') {
  (window as any).seedUsers = seedUsers;
  (window as any).seedUsersToFirestore = seedUsersToFirestore;
  (window as any).seedUsersToLocalStorage = seedUsersToLocalStorage;
  (window as any).checkFirestoreUsers = checkFirestoreUsers;
  (window as any).checkLocalStorageUsers = checkLocalStorageUsers;
  (window as any).addUserManually = addUserManually;
  (window as any).findUser = findUser;
  (window as any).fixUserData = fixUserData;

  console.log('🛠️ Debug utilities loaded. Available commands:');
  console.log('  - seedUsers()');
  console.log('  - checkLocalStorageUsers()');
  console.log('  - findUser("UG20/COMS/1168")');
  console.log('  - fixUserData("UG20/COMS/1168")');
  console.log('  - addUserManually({ id: "...", name: "...", ... })');
}