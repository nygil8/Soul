const express = require('express');
const {
    createReview,
    getProductReviews,
    getAllReviews,
    toggleReviewVisibility,
    deleteReview
} = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/', protect, createReview); // Auth required to post
router.get('/product/:productId', getProductReviews);

// Admin Routes
router.get('/', protect, admin, getAllReviews);
router.put('/:id/visibility', protect, admin, toggleReviewVisibility);
router.delete('/:id', protect, admin, deleteReview);

module.exports = router;
