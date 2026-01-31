const express = require('express');
const { check } = require('express-validator');
const { createOrder, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
    '/',
    [
        // Customer Validation
        check('customer.firstName', 'First Name is required').not().isEmpty(),
        check('customer.lastName', 'Last Name is required').not().isEmpty(),
        check('customer.phone', 'Phone number is required').not().isEmpty(),
        check('customer.email', 'Please include a valid email').isEmail(),

        // Address Validation
        check('address.houseNumberStreet', 'Address is required').not().isEmpty(),
        check('address.townCity', 'Town/City is required').not().isEmpty(),
        check('address.pincode', 'Pincode must be 6 digits')
            .isLength({ min: 6, max: 6 })
            .isNumeric(),

        // Order Details Validation
        check('orderDetails.items', 'Items are required').isArray({ min: 1 }),
        check('orderDetails.totalAmount', 'Total amount is required').isNumeric()
    ],
    createOrder
);

// Admin Routes
router.get('/', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);
router.delete('/:id', protect, admin, deleteOrder);

module.exports = router;
