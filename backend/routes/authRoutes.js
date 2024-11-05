const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Registration route
router.post('/register', authController.registerUser);

// Email verification route
router.get('/verify/:token', authController.verifyEmail);

// Login route
router.post('/login', authController.loginUser);

module.exports = router;
