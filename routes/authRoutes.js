// backend/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path to your User model
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid login credentials.' });
    }

    // Compare provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid login credentials.' });
    }

    // If successful, return a success response or token
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
