const express = require('express');
const router = express.Router();
const recordController = require('../controllers/medicalRecord.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

router.use(protect);

// Xem bệnh án (Cho phép Owner, Vet, Clinic, Admin)
router.get('/pet/:petId', recordController.getPetRecords);
router.get('/:id', recordController.getRecordDetails);

// Tạo bệnh án mới (Chỉ cho phép VETERINARIAN, CLINIC, ADMIN)
router.post('/', authorize('VETERINARIAN', 'CLINIC', 'ADMIN'), recordController.createRecord);

module.exports = router;
