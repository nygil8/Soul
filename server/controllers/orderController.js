const Order = require('../models/Order');
const { validationResult } = require('express-validator');

exports.createOrder = async (req, res) => {
    // Check for validation errors from middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { customer, address, orderDetails } = req.body;

        // Create new order
        const order = new Order({
            user: req.user.id, // Save the logged-in user's ID
            customer,
            address,
            orderDetails
        });

        // Save to database
        await order.save();

        // Return success message with Order ID
        res.status(201).json({
            success: true,
            message: 'Order saved successfully',
            orderId: order._id,
            data: order
        });
    } catch (error) {
        console.error('Create Order Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error processing order'
        });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error('Get My Orders Error:', error);
        res.status(500).json({ message: 'Server error fetching orders' });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error('Get All Orders Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = status;
            const updatedOrder = await order.save();
            res.json({
                success: true,
                data: updatedOrder
            });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error('Update Order Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.deleteOne();
            res.json({ message: 'Order removed' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error('Delete Order Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
