const express = require('express');
const router = express.Router();
const vetController = require('../controllers/veterinarian.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

// Public
router.get('/', vetController.getVeterinarians);
router.get('/:id', vetController.getVeterinarian);

// Protected (Only VETERINARIAN)
router.use(protect);
router.use(authorize('VETERINARIAN', 'ADMIN'));

router.post('/', vetController.createProfile);
router.put('/me', vetController.updateProfile);

module.exports = router;
