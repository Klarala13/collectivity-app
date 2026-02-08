const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../lib/controllers/authController');
const authMiddleware = require('../middleware/auth');

// Validation rules
const registerValidation = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required')
];

const loginValidation = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

// Routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
