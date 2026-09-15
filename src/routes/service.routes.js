const express = require('express');
const router = express.Router({ mergeParams: true });
const serviceController = require('../controllers/service.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

// Public
router.get('/clinic/:clinicId', serviceController.getClinicServices);

// Protected (Only CLINIC)
router.use(protect);
router.use(authorize('CLINIC', 'ADMIN'));

router.post('/clinic/:clinicId', serviceController.createService);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
