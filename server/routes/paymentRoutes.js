const express = require('express');
const { checkout } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/checkout', checkout);

module.exports = router;
