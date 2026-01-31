const express = require('express');
const { check } = require('express-validator');
const { submitContactForm } = require('../controllers/contactController');

const router = express.Router();

router.post(
    '/',
    [
        check('firstName', 'First Name is required').not().isEmpty(),
        check('lastName', 'Last Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('message', 'Message is required').not().isEmpty()
    ],
    submitContactForm
);

module.exports = router;
