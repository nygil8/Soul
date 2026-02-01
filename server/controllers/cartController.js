const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart for current user
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

        if (!cart) {
            // Create empty cart if not exists
            cart = new Cart({ user: req.user.id, items: [] });
            await cart.save();
        }

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const qty = parseInt(quantity) || 1;

    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if item already in cart
        const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

        if (itemIndex > -1) {
            // Product exists in cart, update quantity
            cart.items[itemIndex].quantity += qty;
        } else {
            // Product does not exist in cart, add new item
            cart.items.push({ product: productId, quantity: qty });
        }

        await cart.save();

        // Populate for response
        cart = await cart.populate('items.product');

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    const { productId } = req.params;

    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();

        cart = await cart.populate('items.product');

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
