const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.checkout = async (req, res) => {
    try {
        // 1. Get User's Cart
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // 2. Calculate Total & Prepare Order Items with Snapshot data
        let totalAmount = 0;
        const orderItems = [];

        for (const item of cart.items) {
            if (!item.product) continue; // Skip if product deleted

            const price = item.product.price;
            const amount = price * item.quantity;
            totalAmount += amount;

            orderItems.push({
                product: item.product._id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity
            });

            // Optional: Reduce stock here if managing inventory
        }

        // 3. Create Order
        const order = new Order({
            user: req.user.id,
            items: orderItems,
            totalAmount,
            status: 'completed', // Simulating successful payment
            paymentId: `PAY_${Date.now()}_${Math.floor(Math.random() * 1000)}` // Mock Payment ID
        });

        await order.save();

        // 4. Clear Cart
        cart.items = [];
        await cart.save();

        res.status(201).json({
            success: true,
            message: 'Payment successful and Order placed',
            data: order
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
