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
    console.log('Starting Advanced Order System Verification...');

    // 1. Valid Order
    const validOrder = {
        customer: {
            firstName: 'Rahul',
            lastName: 'Dravid',
            phone: '9876543210',
            email: 'rahul@example.com'
        },
        address: {
            houseNumberStreet: '123 MG Road',
            townCity: 'Kochi',
            state: 'Kerala',
            pincode: '682001'
        },
        orderDetails: {
            items: [{ name: 'Boy\'s cotton Shirt and Pant', quantity: 1, price: 500 }],
            subtotal: 500,
            shipping: 50,
            totalAmount: 550
        }
    };

    console.log('\n1. Testing Valid Order Submission...');
    const validRes = await request('/api/orders', 'POST', validOrder);

    if (validRes.status === 201 && validRes.body.success) {
        console.log('✅ Valid Order Successful');
        console.log('   Order ID:', validRes.body.orderId);
    } else {
        console.error('❌ Valid Order Failed', validRes.status, validRes.body);
    }

    // 2. Invalid Email
    console.log('\n2. Testing Invalid Email...');
    const invalidEmailOrder = JSON.parse(JSON.stringify(validOrder));
    invalidEmailOrder.customer.email = 'notanemail';

    const badEmailRes = await request('/api/orders', 'POST', invalidEmailOrder);
    if (badEmailRes.status === 400 && JSON.stringify(badEmailRes.body).includes('valid email')) {
        console.log('✅ Invalid Email Rejected Correctly');
    } else {
        console.error('❌ Invalid Email Check Failed', badEmailRes.status, badEmailRes.body);
    }

    // 3. Invalid Pincode (Length)
    console.log('\n3. Testing Invalid Pincode (5 digits)...');
    const invalidPinOrder = JSON.parse(JSON.stringify(validOrder));
    invalidPinOrder.address.pincode = '12345';

    const badPinRes = await request('/api/orders', 'POST', invalidPinOrder);
    if (badPinRes.status === 400 && JSON.stringify(badPinRes.body).includes('Pincode must be 6 digits')) {
        console.log('✅ Invalid Pincode Rejected Correctly');
    } else {
        console.error('❌ Invalid Pincode Check Failed', badPinRes.status, badPinRes.body);
    }

    console.log('\nAdvanced Order verification completed.');
};

runTests();
