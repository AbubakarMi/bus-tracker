/**
 * Admin User Management Utilities
 * Functions for admins to create and manage users (students and staff)
 */

import { db } from './firebase';
import { doc, setDoc, getDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import type { UserData } from './auth-utils';

/**
 * Admin function to create a new staff member
 */
export async function adminCreateStaff(
  staffId: string,
  name: string,
  email: string,
  department: string,
  password: string = 'Staff@123'  // Default password
): Promise<{ success: boolean; message: string; user?: UserData }> {
  console.log('👑 Admin creating staff:', { staffId, name, email, department });

  try {
    // Validate inputs
    if (!staffId || !name || !email) {
      return { success: false, message: 'Missing required fields' };
    }

    // Create staff user object
    const newStaff: UserData = {
      id: staffId,
      role: 'staff',
      staffId: staffId,
      name: name,
      department: department,
      email: email.toLowerCase(),
      password: password
    };

    // Save to localStorage (always works)
    const registeredStaff = JSON.parse(localStorage.getItem('registeredStaff') || '{}');

    // Check if already exists
    if (registeredStaff[staffId]) {
      console.log('⚠️ Staff already exists in localStorage');
      return { success: false, message: `Staff ${staffId} already exists` };
    }

    // Save with both staffId and email as keys
    registeredStaff[newStaff.id] = newStaff;
    registeredStaff[newStaff.email] = newStaff;
    localStorage.setItem('registeredStaff', JSON.stringify(registeredStaff));

    console.log('✅ Staff saved to localStorage:', {
      staffId: newStaff.id,
      email: newStaff.email,
      name: newStaff.name
    });

    // Try to save to Firestore if available
    if (db) {
      try {
        await setDoc(doc(db, 'users', staffId), newStaff);
        console.log('✅ Staff saved to Firestore');
      } catch (firestoreError) {
        console.warn('⚠️ Failed to save to Firestore, but saved to localStorage:', firestoreError);
      }
    }

    // Verify it was saved
    const verify = JSON.parse(localStorage.getItem('registeredStaff') || '{}');
    if (verify[staffId]) {
      console.log('✅✅✅ VERIFIED: Staff is in database!');
      return {
        success: true,
        message: `Staff ${name} created successfully. Login ID: ${staffId}, Password: ${password}`,
        user: newStaff
      };
    } else {
      return { success: false, message: 'Failed to save staff' };
    }
  } catch (error) {
    console.error('❌ Error creating staff:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Admin function to create a new student
 */
export async function adminCreateStudent(
  regNumber: string,
  name: string,
  email: string,
  course: string,
  admissionYear: string,
  password: string = 'Student@123'  // Default password
): Promise<{ success: boolean; message: string; user?: UserData }> {
  console.log('👑 Admin creating student:', { regNumber, name, email, course });

  try {
    // Validate inputs
    if (!regNumber || !name || !email) {
      return { success: false, message: 'Missing required fields' };
    }

    // Create student user object
    const newStudent: UserData = {
      id: regNumber,
      role: 'student',
      regNumber: regNumber,
      name: name,
      course: course,
      admissionYear: admissionYear,
      email: email.toLowerCase(),
      password: password
    };

    // Save to localStorage (always works)
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');

    // Check if already exists
    if (registeredUsers[regNumber]) {
      console.log('⚠️ Student already exists in localStorage');
      return { success: false, message: `Student ${regNumber} already exists` };
    }

    // Save with both regNumber and email as keys
    registeredUsers[newStudent.id] = newStudent;
    registeredUsers[newStudent.email] = newStudent;
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    console.log('✅ Student saved to localStorage:', {
      regNumber: newStudent.id,
      email: newStudent.email,
      name: newStudent.name
    });

    // Try to save to Firestore if available
    if (db) {
      try {
        await setDoc(doc(db, 'users', regNumber), newStudent);
        console.log('✅ Student saved to Firestore');
      } catch (firestoreError) {
        console.warn('⚠️ Failed to save to Firestore, but saved to localStorage:', firestoreError);
      }
    }

    // Verify it was saved
    const verify = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    if (verify[regNumber]) {
      console.log('✅✅✅ VERIFIED: Student is in database!');
      return {
        success: true,
        message: `Student ${name} created successfully. Login ID: ${regNumber}, Password: ${password}`,
        user: newStudent
      };
    } else {
      return { success: false, message: 'Failed to save student' };
    }
  } catch (error) {
    console.error('❌ Error creating student:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get all staff members
 */
export function getAllStaff(): UserData[] {
  try {
    const registeredStaff = JSON.parse(localStorage.getItem('registeredStaff') || '{}');
    const uniqueStaff = new Map<string, UserData>();

    Object.values(registeredStaff).forEach((user: any) => {
      if (user && user.id) {
        uniqueStaff.set(user.id, user);
      }
    });

    return Array.from(uniqueStaff.values());
  } catch (error) {
    console.error('Error getting staff:', error);
    return [];
  }
}

/**
 * Get all students
 */
export function getAllStudents(): UserData[] {
  try {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    const uniqueStudents = new Map<string, UserData>();

    Object.values(registeredUsers).forEach((user: any) => {
      if (user && user.id) {
        uniqueStudents.set(user.id, user);
      }
    });

    return Array.from(uniqueStudents.values());
  } catch (error) {
    console.error('Error getting students:', error);
    return [];
  }
}

/**
 * Delete a user (student or staff)
 */
export async function adminDeleteUser(userId: string, role: 'student' | 'staff'): Promise<{ success: boolean; message: string }> {
  try {
    const storageKey = role === 'student' ? 'registeredUsers' : 'registeredStaff';
    const users = JSON.parse(localStorage.getItem(storageKey) || '{}');

    // Find and remove user
    let userEmail = '';
    for (const [key, user] of Object.entries(users)) {
      const userData = user as UserData;
      if (userData.id === userId) {
        userEmail = userData.email || '';
        break;
      }
    }

    delete users[userId];
    if (userEmail) {
      delete users[userEmail];
    }

    localStorage.setItem(storageKey, JSON.stringify(users));

    // Try to delete from Firestore
    if (db) {
      try {
        await deleteDoc(doc(db, 'users', userId));
      } catch (error) {
        console.warn('Failed to delete from Firestore:', error);
      }
    }

    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    console.error('Error deleting user:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Make functions available globally in browser console
if (typeof window !== 'undefined') {
  (window as any).adminCreateStaff = adminCreateStaff;
  (window as any).adminCreateStudent = adminCreateStudent;
  (window as any).getAllStaff = getAllStaff;
  (window as any).getAllStudents = getAllStudents;
  (window as any).adminDeleteUser = adminDeleteUser;

  console.log('👑 Admin utilities loaded. Available commands:');
  console.log('  - adminCreateStaff("Staff/Adustech/2001", "Name", "email@...", "Department", "password")');
  console.log('  - adminCreateStudent("UG24/COMS/1234", "Name", "email@...", "Course", "2024", "password")');
  console.log('  - getAllStaff()');
  console.log('  - getAllStudents()');
  console.log('  - adminDeleteUser("userId", "student" | "staff")');
}