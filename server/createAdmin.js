const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const adminExists = await User.findOne({ email: 'admin@example.com' });
        if (adminExists) {
            console.log('Admin user already exists');
            // Optional: Reset password
            // adminExists.password = '123456';
            // await adminExists.save();
            // console.log('Admin password reset to 123456');
            process.exit();
        }

        const user = new User({
            username: 'Admin',
            email: 'admin@example.com',
            password: '123456', // Will be hashed by pre-save hook
            role: 'admin'
        });

        await user.save();
        console.log('Admin user created');
        console.log('Email: admin@example.com');
        console.log('Password: 123456');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createAdmin();
