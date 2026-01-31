const http = require('http');

// Helper to make requests
const request = (path, method, body) => {
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
            }
        };

        const req = http.request(options, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => responseBody += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        body: responseBody ? JSON.parse(responseBody) : {}
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        body: responseBody
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
    console.log('Starting Contact Us Verification...');

    // 1. Valid Submission
    const validContact = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        message: 'Hello, this is a test message.'
    };

    try {
        console.log('\n1. Testing Valid Submission...');
        const result = await request('/api/contact', 'POST', validContact);

        if (result.status === 201 && result.body.success) {
            console.log('✅ Contact Submission Successful');
        } else {
            console.error('❌ Contact Submission Failed', result.status, result.body);
            process.exit(1);
        }

        // 2. Invalid Submission (Missing Fields)
        console.log('\n2. Testing Invalid Submission (Missing Message)...');
        const invalidContact = {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane@example.com'
        };

        const invalidRes = await request('/api/contact', 'POST', invalidContact);

        if (invalidRes.status === 400 && invalidRes.body.errors) {
            console.log('✅ Invalid Submission Validation Successful');
        } else {
            console.error('❌ Invalid Submission Validation Failed', invalidRes.status, invalidRes.body);
        }

        console.log('\nContact Us tests completed.');

    } catch (error) {
        console.error('Test Execution Error:', error);
    }
};

runTests();
