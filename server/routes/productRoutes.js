const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductById, togglePopularity, getLowStockProducts } = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/products/low-stock - Admin only
router.get('/low-stock', protect, admin, getLowStockProducts);

// PUT /api/products/toggle-popularity/:id - Admin only
router.put('/toggle-popularity/:id', protect, admin, togglePopularity);

// GET /api/products - Public
router.get('/', getAllProducts);

// GET /api/products/:id - Public
router.get('/:id', getProductById);

// POST /api/products - Admin only
router.post('/', protect, admin, createProduct);

// PUT /api/products/:id - Admin only
router.put('/:id', protect, admin, updateProduct);

// DELETE /api/products/:id - Admin only
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
