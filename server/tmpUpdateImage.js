const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const updateImage = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const result = await Product.updateMany(
            { image: "https://images.unsplash.com/photo-1622290291314-ec15e966ce94?auto=format&fit=crop&q=80&w=1000" },
            { $set: { image: "https://images.unsplash.com/photo-1513364776144-60967f0f7f45?auto=format&fit=crop&q=80&w=1000" } }
        );
        
        console.log(`Updated ${result.modifiedCount} products with broken image.`);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

updateImage();
