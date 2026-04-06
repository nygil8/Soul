const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
    {
        name: "Cool Kid Shirt",
        description: "A very cool shirt for cool kids.",
        price: 499,
        category: "Shirt",
        stock: 10,
        image: "https://images.unsplash.com/photo-1513364776144-60967f0f7f45?auto=format&fit=crop&q=80&w=1000",
        gender: "Boys",
        ageType: "3-6 Yrs"
    },
    {
        name: "Pretty Dress",
        description: "Elegant dress for special occasions.",
        price: 799,
        category: "Dress",
        stock: 15,
        image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=1000",
        gender: "Girls",
        ageType: "3-6 Yrs"
    },
    {
        name: "Fast Running Shoes",
        description: "Speedy shoes for active play.",
        price: 1299,
        category: "Shoes",
        stock: 5,
        image: "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?auto=format&fit=crop&q=80&w=1000",
        gender: "Unisex",
        ageType: "7-12 Yrs"
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        await Product.deleteMany({});
        console.log('Cleared existing products');

        await Product.insertMany(products);
        console.log('Products Seeded!');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedProducts();
