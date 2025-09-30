# 👔 How to Create Staff Users in the System

## ✅ **System is Now Ready!**

I've created admin utilities that let you create staff (and student) users directly from the browser console. These users are immediately saved to the database and can log in right away.

---

## 🚀 **Quick Start - Create Staff User**

### **Step 1: Open Browser Console**
Press **F12** on any page (login, admin dashboard, anywhere)

### **Step 2: Run This Command**

```javascript
adminCreateStaff(
  "Staff/Adustech/2001",  // Staff ID
  "Dr. Ibrahim Musa",     // Full Name
  "ibrahim.musa@adustech.edu.ng",  // Email
  "Transport Department",  // Department
  "password123"           // Password (optional, defaults to "Staff@123")
)
```

### **Step 3: You'll See:**
```
👑 Admin creating staff: {staffId: "Staff/Adustech/2001", ...}
✅ Staff saved to localStorage: {...}
✅✅✅ VERIFIED: Staff is in database!
{
  success: true,
  message: "Staff Dr. Ibrahim Musa created successfully. Login ID: Staff/Adustech/2001, Password: password123",
  user: {...}
}
```

### **Step 4: Staff Can Now Login!**
The staff member can immediately login with:
- **ID:** `Staff/Adustech/2001`
- **Email:** `ibrahim.musa@adustech.edu.ng`
- **Password:** `password123`

---

## 📋 **Examples**

### **Create Staff with Default Password:**
```javascript
adminCreateStaff(
  "Staff/Adustech/2002",
  "Hajiya Amina Hassan",
  "amina.hassan@adustech.edu.ng",
  "Administration"
)
// Password will be: Staff@123
```

### **Create Staff with Custom Password:**
```javascript
adminCreateStaff(
  "Staff/Adustech/2003",
  "Mallam Yusuf Salisu",
  "yusuf.salisu@adustech.edu.ng",
  "IT Department",
  "MySecurePass123"
)
// Password will be: MySecurePass123
```

### **Create Multiple Staff at Once:**
```javascript
// Create multiple staff members
const staffList = [
  ["Staff/Adustech/2004", "Dr. Fatima Usman", "fatima.usman@adustech.edu.ng", "Academic Affairs", "pass123"],
  ["Staff/Adustech/2005", "Malam Sani Ahmed", "sani.ahmed@adustech.edu.ng", "Security", "pass123"],
  ["Staff/Adustech/2006", "Mrs. Zainab Bello", "zainab.bello@adustech.edu.ng", "Finance", "pass123"]
];

staffList.forEach(([id, name, email, dept, pass]) => {
  adminCreateStaff(id, name, email, dept, pass);
});
```

---

## 👨‍🎓 **Also Works for Students**

### **Create Student:**
```javascript
adminCreateStudent(
  "UG24/COMS/5678",              // Reg Number
  "Aisha Abdullahi",             // Full Name
  "aisha.abdullahi@student.adustech.edu.ng",  // Email
  "Computer Science",            // Course
  "2024",                        // Admission Year
  "student123"                   // Password (optional, defaults to "Student@123")
)
```

---

## 📊 **View All Staff/Students**

### **See All Staff:**
```javascript
getAllStaff()
```

Returns array of all staff with full details:
```javascript
[
  {
    id: "Staff/Adustech/2001",
    name: "Dr. Ibrahim Musa",
    email: "ibrahim.musa@adustech.edu.ng",
    department: "Transport Department",
    role: "staff",
    password: "password123"
  },
  ...
]
```

### **See All Students:**
```javascript
getAllStudents()
```

---

## 🗑️ **Delete Users**

### **Delete Staff:**
```javascript
adminDeleteUser("Staff/Adustech/2001", "staff")
```

### **Delete Student:**
```javascript
adminDeleteUser("UG24/COMS/5678", "student")
```

---

## ✅ **Verification**

### **Check if Staff Was Created:**
```javascript
// Method 1: Using findUser
findUser("Staff/Adustech/2001")

// Method 2: Check all staff
const allStaff = getAllStaff()
console.log(allStaff)

// Method 3: Check localStorage directly
const staff = JSON.parse(localStorage.getItem('registeredStaff'))
console.log(staff["Staff/Adustech/2001"])
```

### **Test Login:**
1. Go to login page
2. Enter staff ID or email
3. Enter password
4. Should login successfully!

---

## 🎯 **Department Options**

Common departments you can use:
- Transport Department
- Academic Affairs
- Administration
- IT Department
- Security
- Maintenance
- Human Resources
- Finance
- Student Affairs

---

## 📝 **Staff ID Format**

**Format:** `Staff/Adustech/XXXX`

Where XXXX is a 3-4 digit number:
- `Staff/Adustech/1001` ✅
- `Staff/Adustech/2001` ✅
- `Staff/Adustech/999` ✅ (3 digits ok)
- `Staff/Adustech/12345` ❌ (too long)
- `Staff/Something/1001` ❌ (must be "Adustech")

---

## 🔐 **Default Passwords**

- **Staff:** `Staff@123`
- **Students:** `Student@123`

Users can change password after first login (when you implement password change feature).

---

## 💡 **Pro Tips**

### **1. Create with Consistent Passwords:**
```javascript
// Use same password for testing
const testPassword = "Test@123"
adminCreateStaff("Staff/Adustech/2001", "Name", "email@...", "Dept", testPassword)
```

### **2. Keep Track of IDs:**
```javascript
// Log all created staff
console.table(getAllStaff().map(s => ({
  ID: s.id,
  Name: s.name,
  Email: s.email,
  Department: s.department
})))
```

### **3. Bulk Import from Array:**
```javascript
const staffData = [
  // [ID, Name, Email, Department, Password]
  ["Staff/Adustech/3001", "Ali Mohammed", "ali.m@adustech.edu.ng", "IT", "pass123"],
  ["Staff/Adustech/3002", "Halima Yusuf", "halima.y@adustech.edu.ng", "HR", "pass123"]
];

staffData.forEach(data => adminCreateStaff(...data));
```

---

## 🎬 **Complete Example Session**

```javascript
// 1. Create a staff member
adminCreateStaff(
  "Staff/Adustech/2001",
  "Dr. Mohammed Ibrahim",
  "mohammed.ibrahim@adustech.edu.ng",
  "Transport Department",
  "transport123"
)

// 2. Verify creation
findUser("Staff/Adustech/2001")
// ✅ Found: {name: "Dr. Mohammed Ibrahim", ...}

// 3. Check all staff
getAllStaff()
// Returns array with our new staff

// 4. Test login
// Go to login page, enter:
// ID: Staff/Adustech/2001
// Password: transport123
// ✅ Should login successfully!
```

---

## 🔍 **Troubleshooting**

### **Problem: Function not found**
**Solution:** Make sure you're on a page where the utilities are loaded (any page should work after refresh)

### **Problem: Staff created but can't login**
**Solution:**
```javascript
// Check if staff is in database
findUser("Staff/Adustech/2001")

// If not found, re-create
adminCreateStaff("Staff/Adustech/2001", "Name", "email", "Dept", "pass")

// Verify role detection
detectUserRole("Staff/Adustech/2001")  // Should return "staff"
```

### **Problem: Want to change password**
**Solution:**
```javascript
// Get current staff
const staff = JSON.parse(localStorage.getItem('registeredStaff'))
const user = staff["Staff/Adustech/2001"]

// Update password
user.password = "newpassword123"

// Save back
staff[user.id] = user
staff[user.email] = user
localStorage.setItem('registeredStaff', JSON.stringify(staff))
```

---

## 📊 **Available Commands Summary**

```javascript
// CREATE
adminCreateStaff(staffId, name, email, department, password?)
adminCreateStudent(regNumber, name, email, course, year, password?)

// READ
getAllStaff()
getAllStudents()
findUser(identifier)

// DELETE
adminDeleteUser(userId, role)

// CHECK
checkLocalStorageUsers()
```

---

## 🎯 **Next Steps**

1. **Create your first staff:**
   ```javascript
   adminCreateStaff("Staff/Adustech/2001", "Your Name", "your.email@adustech.edu.ng", "IT Department", "test123")
   ```

2. **Verify it worked:**
   ```javascript
   getAllStaff()
   ```

3. **Test login:**
   - Go to login page
   - Login with Staff/Adustech/2001 and test123
   - ✅ Success!

4. **Create more staff as needed** using the same pattern

---

**All staff you create will:**
- ✅ Be saved to localStorage immediately
- ✅ Be saved to Firestore (if available)
- ✅ Be able to login right away
- ✅ Work with both ID and email for login
- ✅ Show up in getAllStaff() list

**Ready to create your first staff member? Open console and run the command!** 🚀