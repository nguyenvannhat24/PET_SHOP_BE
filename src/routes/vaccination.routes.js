const express = require('express');
const router = express.Router();
const vaccineController = require('../controllers/vaccination.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

router.use(protect);

// Xem sổ tiêm (Cho phép Owner, Vet, Clinic, Admin)
router.get('/pet/:petId', vaccineController.getPetVaccines);

// Thêm mũi tiêm mới (Chỉ cho phép VETERINARIAN, CLINIC, ADMIN)
router.post('/', authorize('VETERINARIAN', 'CLINIC', 'ADMIN'), vaccineController.addVaccine);

module.exports = router;
