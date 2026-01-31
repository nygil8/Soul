const Review = require('../models/Review');
const Product = require('../models/Product');

exports.createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        // Check if user already reviewed
        const alreadyReviewed = await Review.findOne({
            user: req.user.id,
            product: productId
        });

        if (alreadyReviewed) {
            return res.status(400).json({ message: 'Product already reviewed' });
        }

        const review = new Review({
            user: req.user.id,
            product: productId,
            rating,
            comment
        });

        await review.save();

        res.status(201).json({ success: true, data: review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId, isHidden: false })
            .populate('user', 'username profilePhoto')
            .sort({ createdAt: -1 });

        res.json({ success: true, count: reviews.length, data: reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'username email')
            .populate('product', 'name')
            .sort({ createdAt: -1 });

        res.json({ success: true, data: reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.toggleReviewVisibility = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (review) {
            review.isHidden = !review.isHidden;
            await review.save();
            res.json({ success: true, isHidden: review.isHidden });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (review) {
            await review.deleteOne();
            res.json({ message: 'Review removed' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
