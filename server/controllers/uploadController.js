const cloudinary = require('../config/cloudinary');
const stream = require('stream');

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const bufferStream = new stream.PassThrough();
        bufferStream.end(req.file.buffer);

        const uploadStream = cloudinary.uploader.upload_stream({
            resource_type: 'image',
            folder: 'e-kid-products', // Use a generic or specific folder
        }, (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Cloudinary upload failed' });
            }

            res.json({
                success: true,
                url: result.secure_url,
                message: 'Image upload successful'
            });
        });

        bufferStream.pipe(uploadStream);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
