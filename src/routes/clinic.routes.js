const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinic.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', clinicController.getClinics);
router.get('/:id', clinicController.getClinic);

// Protected routes (Only users with CLINIC role)
router.use(protect);
router.use(authorize('CLINIC', 'ADMIN'));

router.post('/', clinicController.createClinic);
router.put('/:id', clinicController.updateClinic);
router.delete('/:id', clinicController.deleteClinic);

module.exports = router;
