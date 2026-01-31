const http = require('http');

// Helper to make requests
const request = (path, method, body, token = null) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);
        const options = {
            hostname: 'localhost',
            port: 5000, // Make sure this matches your server port
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
    console.log('Starting E-Commerce Verification...');

    // 1. Authenticate (Login or Register)
    console.log('\n--- Authentication ---');
    const user = {
        username: `ecom_user_${Date.now()}`,
        email: `ecom_${Date.now()}@test.com`,
        password: 'password123',
        confirmPassword: 'password123'
    };

    let token;
    const regRes = await request('/api/auth/register', 'POST', user);
    if (regRes.status === 201) {
        token = regRes.body.token;
        console.log('✅ Registered new user');
    } else {
        // Try login if user exists (fallback for repeated runs)
        console.log('User might detail exist, trying login...');
        const loginRes = await request('/api/auth/login', 'POST', { email: user.email, password: user.password });
        if (loginRes.status === 200) {
            token = loginRes.body.token;
            console.log('✅ Logged in');
        } else {
            console.error('❌  Auth failed', regRes.body);
            process.exit(1);
        }
    }

    // 2. Create Product (Seed)
    console.log('\n--- Product Management ---');
    const productData = {
        name: 'Test Product ' + Date.now(),
        description: 'A great product',
        price: 100,
        category: 'Electronics',
        stock: 50
    };

    const prodRes = await request('/api/products', 'POST', productData); // Public for now
    let productId;
    if (prodRes.status === 201) {
        console.log('✅ Product Created');
        productId = prodRes.body.data._id;
    } else {
        console.error('❌ Create Product Failed', prodRes.status, prodRes.body);
        process.exit(1);
    }

    // 3. Get All Products
    const getProdRes = await request('/api/products', 'GET');
    if (getProdRes.status === 200 && getProdRes.body.data.length > 0) {
        console.log(`✅ Fetched ${getProdRes.body.data.length} Products`);
    } else {
        console.error('❌ Fetch Products Failed');
    }

    // 4. Add to Cart
    console.log('\n--- Cart Management ---');
    const cartRes = await request('/api/cart/add', 'POST', { productId, quantity: 2 }, token);
    if (cartRes.status === 200) {
        console.log('✅ Added to Cart');
        const item = cartRes.body.data.items.find(i => i.product._id === productId);
        if (item && item.quantity === 2) {
            console.log('   quantity verified: 2');
        } else {
            console.error('   quantity mismatch', item);
        }
    } else {
        console.error('❌ Add to Cart Failed', cartRes.status, cartRes.body);
    }

    // 5. Checkout
    console.log('\n--- Checkout ---');
    const checkoutRes = await request('/api/payment/checkout', 'POST', {}, token);
    if (checkoutRes.status === 201) {
        console.log('✅ Checkout Successful');
        console.log('   Order ID:', checkoutRes.body.data._id);
        console.log('   Total Amount:', checkoutRes.body.data.totalAmount);
    } else {
        console.error('❌ Checkout Failed', checkoutRes.status, checkoutRes.body);
    }

    // 6. Verify Cart Empty
    const verifyCartRes = await request('/api/cart', 'GET', null, token);
    if (verifyCartRes.status === 200 && verifyCartRes.body.data.items.length === 0) {
        console.log('✅ Cart Emptied after Checkout');
    } else {
        console.error('❌ Cart Not Empty', verifyCartRes.body);
    }

    console.log('\nE-Commerce verification completed.');
};

runTests();
