const mongoose = require('mongoose');
require('dotenv').config({ path: '../server/.env' });
const Product = require('../server/models/Product');

async function checkProduct() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // Use the ID from the user's error message if possible, or just find one
        // The id in error was: 6975e69f6a87dd331bf0ce2d 
        // Note: That ID looks weird (starts with 69...), standard mongo ids ok.
        // Let's just list all products and look at their structure.

        const products = await Product.find().lean();
        console.log(`Found ${products.length} products.`);

        for (const p of products) {
            console.log(`ID: ${p._id}`);
            console.log(`- Discount Field:`, p.discount);
            console.log(`- Type of Discount:`, typeof p.discount);
            console.log('---');
        }

    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

checkProduct();
