# 🔧 Fix Your Login Issue - UG20/COMS/1168

## Your Problem:
You registered with `UG20/COMS/1168` but can't log in with it.

## Quick Fix (3 Steps):

### **Step 1: Check if Your User Exists**

1. Go to: http://localhost:3001/login
2. Press **F12** to open browser console
3. Type this command and press Enter:
   ```javascript
   findUser("UG20/COMS/1168")
   ```

**Result A:** If you see `✅ Found user` - Go to Step 2
**Result B:** If you see `❌ User not found` - Go to Step 3

---

### **Step 2: Fix Your User Data** (If user was found)

Your user exists but might be saved with wrong keys. Run this in console:

```javascript
fixUserData("UG20/COMS/1168")
```

You should see: `✅ Fixed user data for: [Your Name]`

**Now try logging in again!** It should work.

---

### **Step 3: Add Your User Manually** (If user was not found)

You need to re-register. In console, run:

```javascript
addUserManually({
  id: "UG20/COMS/1168",
  role: "student",
  regNumber: "UG20/COMS/1168",
  name: "YOUR NAME HERE",  // ← Change this
  course: "Computer Science",
  admissionYear: "2020",
  email: "your.email@student.adustech.edu.ng",  // ← Change this
  password: "YOUR_PASSWORD_HERE"  // ← Change this
})
```

**Replace:**
- `YOUR NAME HERE` with your actual name
- `your.email@student.adustech.edu.ng` with your email
- `YOUR_PASSWORD_HERE` with your password

You should see: `✅ Manually added user: [Your Name]`

**Now try logging in!**

---

## Alternative Method: Visual Database Inspector

1. Open this file in your browser:
   ```
   file:///C:/Users/lenovo/Documents/DevFlux/bus-tracker/check-database.html
   ```

2. You'll see all users in the database with their:
   - ID
   - Name
   - Email
   - **Password** (visible!)
   - Course/Department
   - Role

3. Find your user `UG20/COMS/1168` and check:
   - Is it listed?
   - What's the exact password?
   - Is all data correct?

4. If it's there but you can't login, copy the exact ID and password shown

---

## Debug Commands (Use in Browser Console)

### **See All Users:**
```javascript
checkLocalStorageUsers()
```

### **Find Specific User:**
```javascript
findUser("UG20/COMS/1168")
// or by email
findUser("your.email@student.adustech.edu.ng")
```

### **See Database Export:**
```javascript
// Copy all data
const students = JSON.parse(localStorage.getItem('registeredUsers'))
console.log('All students:', students)

// Find your specific user
console.log('Your user:', students["UG20/COMS/1168"])
```

### **Clear Everything and Start Fresh:**
```javascript
localStorage.clear()
location.reload()
// Then register again
```

---

## Common Issues:

### Issue 1: Password Mismatch
**Symptom:** User found but login fails
**Solution:**
```javascript
// Check your exact password in database
const user = JSON.parse(localStorage.getItem('registeredUsers'))["UG20/COMS/1168"]
console.log("Your password is:", user.password)
```
Then use THAT exact password to login.

### Issue 2: Case Sensitivity
**Symptom:** `UG20/coms/1168` vs `UG20/COMS/1168`
**Solution:** Always use UPPERCASE for course code:
```javascript
// Fix case
fixUserData("UG20/COMS/1168")
```

### Issue 3: User Saved in Wrong Storage
**Symptom:** Staff user in student storage or vice versa
**Solution:**
```javascript
// Check both storages
console.log('Students:', Object.keys(JSON.parse(localStorage.getItem('registeredUsers') || '{}')))
console.log('Staff:', Object.keys(JSON.parse(localStorage.getItem('registeredStaff') || '{}')))
```

---

## Step-by-Step Verification:

### 1. **Verify Data Exists:**
```javascript
findUser("UG20/COMS/1168")
```
Expected: `{ found: true, user: {...}, location: "registeredUsers" }`

### 2. **Check Password:**
```javascript
const user = findUser("UG20/COMS/1168")
console.log("Password:", user.user?.password)
```

### 3. **Fix if Needed:**
```javascript
fixUserData("UG20/COMS/1168")
```

### 4. **Verify Fix:**
```javascript
findUser("UG20/COMS/1168")
// Should show found: true
```

### 5. **Try Login:**
- Go to login page
- Enter: `UG20/COMS/1168`
- Enter password shown in Step 2
- Click Sign In

---

## Still Not Working?

### Last Resort: Complete Re-Registration

1. **Clear your old data:**
   ```javascript
   // Remove old entry
   const students = JSON.parse(localStorage.getItem('registeredUsers') || '{}')
   delete students["UG20/COMS/1168"]
   // Also try deleting by email if you know it
   delete students["your.email@student.adustech.edu.ng"]
   localStorage.setItem('registeredUsers', JSON.stringify(students))
   ```

2. **Register again:**
   - Go to: http://localhost:3001/register
   - Enter: `UG20/COMS/1168`
   - Fill all details carefully
   - Click "Complete Registration"
   - **Pay attention to success message**

3. **Check console during registration:**
   - Should see: `✅ Student saved to localStorage`
   - Should NOT see errors

4. **Immediately test login:**
   - Go to login page
   - Use exact credentials from registration
   - Should work!

---

## Quick Test Script

Run this complete diagnostic:

```javascript
console.clear()
console.log("🔍 DIAGNOSTIC FOR UG20/COMS/1168")
console.log("="".repeat(50))

// 1. Check if user exists
const result = findUser("UG20/COMS/1168")
console.log("\n1. User Search Result:", result.found ? "✅ FOUND" : "❌ NOT FOUND")
if (result.found) {
  console.log("   Name:", result.user?.name)
  console.log("   Email:", result.user?.email)
  console.log("   Password:", result.user?.password)
  console.log("   Location:", result.location)
}

// 2. Check total users
const students = JSON.parse(localStorage.getItem('registeredUsers') || '{}')
const uniqueStudents = new Set(Object.values(students).map(u => u.id))
console.log("\n2. Total Students:", uniqueStudents.size)

// 3. List all student IDs
console.log("\n3. All Student IDs:")
Array.from(uniqueStudents).forEach(id => console.log("   -", id))

// 4. Recommendation
console.log("\n4. RECOMMENDATION:")
if (result.found) {
  console.log("   → Run: fixUserData('UG20/COMS/1168')")
  console.log("   → Then try logging in")
} else {
  console.log("   → User not found in database")
  console.log("   → Need to re-register or add manually")
  console.log("   → Run: addUserManually({...}) with your details")
}

console.log("\n" + "=".repeat(50))
```

---

## Contact Info

If none of this works, provide these details:
1. Output from the diagnostic script above
2. Screenshot of browser console
3. Your exact registration number
4. Steps you took during registration

**The system IS working** - we just need to make sure your data is saved correctly!

---

## TL;DR - Fastest Fix:

**Option 1** (if user exists):
```javascript
fixUserData("UG20/COMS/1168")
// Then login
```

**Option 2** (if user doesn't exist):
```javascript
addUserManually({
  id: "UG20/COMS/1168",
  role: "student",
  regNumber: "UG20/COMS/1168",
  name: "Your Name",
  course: "Computer Science",
  admissionYear: "2020",
  email: "your.email@student.adustech.edu.ng",
  password: "your_password"
})
// Then login
```

**Option 3** (nuclear option):
```javascript
localStorage.clear()
// Refresh page, then register again properly
```

---

**Server:** http://localhost:3001
**Database Inspector:** file:///C:/Users/lenovo/Documents/DevFlux/bus-tracker/check-database.html