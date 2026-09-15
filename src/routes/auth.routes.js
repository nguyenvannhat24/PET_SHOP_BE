const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// @route   POST /api/auth/register
// @desc    Đăng ký tài khoản mới
// @access  Public
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Đăng nhập
// @access  Public
router.post('/login', authController.login);

module.exports = router;
