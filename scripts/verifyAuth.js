const http = require('http');

// Helper to make requests
const request = (path, method, body, token = null) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data ? Buffer.byteLength(data) : 0,
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        };

        const req = http.request(options, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => responseBody += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        body: responseBody ? JSON.parse(responseBody) : {},
                        headers: res.headers
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        body: responseBody, // Return raw text if not JSON
                        headers: res.headers
                    });
                }
            });
        });

        req.on('error', (e) => reject(e));
        if (data) req.write(data);
        req.end();
    });
};

const runTests = async () => {
    console.log('Starting Verification...');

    // 1. Register User
    const testUser = {
        username: `testuser_${Date.now()}`,
        email: `test_${Date.now()}@example.com`,
        password: 'password123',
        confirmPassword: 'password123'
    };

    try {
        console.log(`\n1. Testing Registration for ${testUser.username}...`);
        const registerRes = await request('/api/auth/register', 'POST', testUser);

        if (registerRes.status === 201 && registerRes.body.success) {
            console.log('✅ Registration Successful');
            console.log('Token received:', !!registerRes.body.token);
        } else {
            console.error('❌ Registration Failed', registerRes.status, registerRes.body);
            process.exit(1);
        }

        // 2. Login User
        console.log('\n2. Testing Login...');
        const loginRes = await request('/api/auth/login', 'POST', {
            email: testUser.email,
            password: testUser.password
        });

        if (loginRes.status === 200 && loginRes.body.success) {
            console.log('✅ Login Successful');
        } else {
            console.error('❌ Login Failed', loginRes.status, loginRes.body);
            process.exit(1);
        }

        const token = loginRes.body.token;

        // 3. Protected Route
        console.log('\n3. Testing Protected Route (/api/auth/me)...');
        const meRes = await request('/api/auth/me', 'GET', null, token);

        if (meRes.status === 200 && meRes.body.success) {
            console.log('✅ Protected Route Access Successful');
            console.log('User Data:', meRes.body.data.username);
        } else {
            console.error('❌ Protected Route Failed', meRes.status, meRes.body);
        }

        // 4. Mismatch Password Test
        console.log('\n4. Testing Mismatch Password Registration...');
        const failUser = { ...testUser, username: 'failuser', email: 'fail@test.com', confirmPassword: 'wrongpassword' };
        const failRes = await request('/api/auth/register', 'POST', failUser);

        if (failRes.status === 400) {
            console.log('✅ Mismatch Password Check Successful (Correctly Rejected)');
        } else {
            console.error('❌ Mismatch Password Check Failed (Should have been rejected)', failRes.status);
        }

        console.log('\nAll tests completed.');

    } catch (error) {
        console.error('Test Execution Error:', error);
    }
};

runTests();
