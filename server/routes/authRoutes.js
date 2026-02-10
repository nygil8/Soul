const express = require('express');
const { check } = require('express-validator');
const { register, login, logout, getMe } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
    '/register',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
        check('confirmPassword', 'Confirm password is required').not().isEmpty()
    ],
    register
);

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload an image.'), false);
        }
    }
});
const { updateDetails, updatePassword, uploadPhoto, getAllUsers, deleteUser } = require('../controllers/authController');

router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/uploadphoto', protect, upload.single('photo'), uploadPhoto);

// Admin Routes for User Management
router.get('/users', protect, admin, getAllUsers);
router.delete('/users/:id', protect, admin, deleteUser);

module.exports = router;
