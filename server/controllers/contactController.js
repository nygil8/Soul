const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

exports.submitContactForm = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, message } = req.body;

    try {
        const contact = new Contact({
            firstName,
            lastName,
            email,
            message
        });

        await contact.save();

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: contact
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
