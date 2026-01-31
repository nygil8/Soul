const axios = require('axios');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../server/.env' });
const Product = require('../server/models/Product');
const User = require('../server/models/User');

const TEST_URL = 'http://localhost:5000';
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

async function runTest() {
    try {
        console.log('1. Connecting to DB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        console.log('2. Finding Admin User...');
        const admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            console.error('No admin found!');
            process.exit(1);
        }
        console.log(`Found admin: ${admin.email}`);

        // Generate Token
        const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' });
        console.log('Generated Temp Token.');

        console.log('3. Finding a Product...');
        const product = await Product.findOne();
        if (!product) {
            console.error('No products found!');
            process.exit(1);
        }
        console.log(`Found Product: ${product.name} (ID: ${product._id})`);

        console.log(`4. Testing PUT ${TEST_URL}/api/products/${product._id}/popularity ...`);

        try {
            const res = await axios.put(
                `${TEST_URL}/api/products/${product._id}/popularity`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('SUCCESS! Server responded:', res.status, res.data);
        } catch (err) {
            console.error('REQUEST FAILED:', err.message);
            if (err.response) {
                console.error('Status:', err.response.status);
                console.error('Data:', err.response.data);
            }
        }

    } catch (error) {
        console.error('Script Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

runTest();
