// controllers/authController.js
const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
    const { email, password, name, position, companyName, companyPhone, companyAddress, contactName, contactJobTitle, contactEmail, altContactName, altContactJobTitle, altContactEmail } = req.body;

    try {
        const newUser = new User({
            email,
            password, // Don't forget to hash this password before saving
            name,
            position,
            companyName,
            companyPhone,
            companyAddress,
            contactName,
            contactJobTitle,
            contactEmail,
            altContactName,
            altContactJobTitle,
            altContactEmail,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};
