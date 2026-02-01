const express = require('express');
const { getDashboardStats, getSalesChart, getCategoryStats } = require('../controllers/statsController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/summary', protect, admin, getDashboardStats);
router.get('/sales-chart', protect, admin, getSalesChart);
router.get('/categories', protect, admin, getCategoryStats);

module.exports = router;
