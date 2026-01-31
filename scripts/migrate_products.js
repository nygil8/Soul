const mongoose = require('mongoose');
require('dotenv').config({ path: '../server/.env' });
const Product = require('../server/models/Product');

async function migrateProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB...');

        const products = await Product.find({});
        console.log(`Found ${products.length} products to check.`);

        let updatedCount = 0;

        for (const p of products) {
            // Check if discount is a number or undefined (legacy)
            // Note: Mongoose document.toObject() or direct access might hide type mismatch if strict,
            // but we can check if it has the 'value' property.

            // If p.discount is a number (it shouldn't be loaded as such by mongoose if valid, 
            // but might be in _doc if invalid).

            // Let's force an update for ALL products to the correct structure if they look wrong.
            // Since we can't easily detect the "wrong" type via Mongoose model instance (it casts or ignores),
            // we will use updateOne with $set to overwrite strictly.

            let needsUpdate = false;
            let newDiscount = {
                type: 'percentage',
                value: 0,
                isActive: false
            };

            // Heuristic: if p.discount is undefined null, or doesn't have .value property
            if (!p.discount || typeof p.discount === 'number' || p.discount.value === undefined) {
                // It's likely legacy.
                // If it was a number, try to preserve it as value
                if (typeof p.discount === 'number') {
                    newDiscount.value = p.discount;
                }
                needsUpdate = true;
            }

            if (needsUpdate) {
                console.log(`Migrating Product ${p._id}...`);
                await Product.updateOne(
                    { _id: p._id },
                    { $set: { discount: newDiscount } }
                );
                updatedCount++;
            }
        }

        console.log(`Migration Complete. Updated ${updatedCount} products.`);

    } catch (error) {
        console.error('Migration Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

migrateProducts();
