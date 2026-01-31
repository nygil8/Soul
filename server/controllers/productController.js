const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getLowStockProducts = async (req, res) => {
    try {
        const products = await Product.find({ stock: { $lt: 10 } }).limit(5);
        res.json({ success: true, data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching low stock' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, stock, gender, ageType, discount, isPopular } = req.body;

        const product = new Product({
            name,
            description,
            price,
            image,
            category,
            stock,
            gender,
            ageType,
            discount,
            isPopular
        });

        await product.save();

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            // Increment view count
            product.viewCount = (product.viewCount || 0) + 1;
            await product.save({ validateBeforeSave: false }); // Skip validation for just view count

            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, stock, gender, ageType, discount, isPopular } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.image = image || product.image;
            product.category = category || product.category;
            product.stock = stock || product.stock;
            product.gender = gender || product.gender;
            product.ageType = ageType || product.ageType;

            if (discount) product.discount = discount;
            if (typeof isPopular !== 'undefined') product.isPopular = isPopular;

            const updatedProduct = await product.save();
            res.json({
                success: true,
                data: updatedProduct
            });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.togglePopularity = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.isPopular = !product.isPopular;
            await product.save({ validateBeforeSave: false }); // Skip validation for just popularity toggle
            res.json({ success: true, isPopular: product.isPopular });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
