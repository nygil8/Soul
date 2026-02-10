const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    customer: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true }
    },
    address: {
        houseNumberStreet: { type: String, required: true },
        townCity: { type: String, required: true },
        state: { type: String, default: 'Kerala' },
        pincode: { type: String, required: true }
    },
    orderDetails: {
        items: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true }
            }
        ],
        subtotal: { type: Number, required: true },
        shipping: { type: Number, required: true },
        totalAmount: { type: Number, required: true }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    }
});

module.exports = mongoose.model('Order', OrderSchema);
