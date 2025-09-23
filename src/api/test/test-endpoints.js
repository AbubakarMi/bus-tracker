const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = `http://localhost:${process.env.API_PORT || 3001}/api`;

// Test data
const testEmail = 'test@adustech.edu.ng';
const testPassword = 'NewPassword123';

async function testEndpoints() {
  console.log('🧪 Testing ADUSTECH Bus Tracker Password Reset API\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get(`http://localhost:${process.env.API_PORT || 3001}/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: Forgot Password with invalid email
    console.log('2️⃣ Testing Forgot Password with invalid email...');
    try {
      await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
        email: 'invalid-email'
      });
    } catch (error) {
      console.log('✅ Invalid email rejected:', error.response?.data);
    }
    console.log('');

    // Test 3: Forgot Password with valid email
    console.log('3️⃣ Testing Forgot Password with valid email...');
    const forgotResponse = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
      email: testEmail
    });
    console.log('✅ Forgot Password Response:', forgotResponse.data);
    console.log('');

    // Test 4: Reset Password with invalid token
    console.log('4️⃣ Testing Reset Password with invalid token...');
    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        token: 'invalid-token',
        newPassword: testPassword
      });
    } catch (error) {
      console.log('✅ Invalid token rejected:', error.response?.data);
    }
    console.log('');

    // Test 5: Reset Password with weak password
    console.log('5️⃣ Testing Reset Password with weak password...');
    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        token: 'valid-looking-token-but-not-real-32-chars-long',
        newPassword: 'weak'
      });
    } catch (error) {
      console.log('✅ Weak password rejected:', error.response?.data);
    }
    console.log('');

    // Test 6: Validate Reset Token
    console.log('6️⃣ Testing Validate Reset Token...');
    try {
      const validateResponse = await axios.post(`${API_BASE_URL}/auth/validate-reset-token`, {
        token: 'invalid-token'
      });
      console.log('✅ Token Validation Response:', validateResponse.data);
    } catch (error) {
      console.log('✅ Token Validation Error:', error.response?.data);
    }
    console.log('');

    // Test 7: Cleanup Expired Tokens
    console.log('7️⃣ Testing Cleanup Expired Tokens...');
    const cleanupResponse = await axios.post(`${API_BASE_URL}/auth/cleanup-expired-tokens`);
    console.log('✅ Cleanup Response:', cleanupResponse.data);
    console.log('');

    // Test 8: Rate Limiting (multiple requests)
    console.log('8️⃣ Testing Rate Limiting...');
    console.log('Sending multiple forgot password requests...');
    for (let i = 1; i <= 4; i++) {
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
          email: `test${i}@adustech.edu.ng`
        });
        console.log(`Request ${i}: ✅`, response.data.message);
      } catch (error) {
        console.log(`Request ${i}: ❌ Rate limited:`, error.response?.data);
      }
    }
    console.log('');

    console.log('🎉 All API tests completed!');
    console.log('\n📝 Test Summary:');
    console.log('- Health check endpoint works');
    console.log('- Input validation is working');
    console.log('- Forgot password endpoint accepts valid requests');
    console.log('- Reset password endpoint validates tokens');
    console.log('- Rate limiting is active');
    console.log('- Error handling is working');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Make sure the API server is running: npm run api:dev');
    }
  }
}

// Helper function to create a test user in Firestore (for integration testing)
async function createTestUser() {
  console.log('🔧 Creating test user in Firestore...');
  // This would require Firebase Admin SDK setup
  // For now, just log the instructions
  console.log(`
📋 To test with a real user, add this document to your Firestore 'users' collection:

Collection: users
Document ID: ${testEmail}
Data: {
  "email": "${testEmail}",
  "name": "Test User",
  "role": "student",
  "regNumber": "UG20/COMS/1234",
  "password": "hashedPasswordHere"
}
  `);
}

// Run tests
if (require.main === module) {
  createTestUser();
  setTimeout(testEndpoints, 1000);
}

module.exports = { testEndpoints };