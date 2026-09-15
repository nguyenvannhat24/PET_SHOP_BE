const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');

// @route   GET /api/search
// @desc    Tìm kiếm clinic, veterinarian, service
// @access  Public
router.get('/', searchController.search);

module.exports = router;
