const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

router.use(protect);

// Pet Owner
router.post('/', orderController.createOrder);
router.get('/my-orders', orderController.getMyOrders);

// Clinic
router.get('/clinic/:clinicId', authorize('CLINIC', 'ADMIN'), orderController.getClinicOrders);
router.patch('/:id/status', authorize('CLINIC', 'ADMIN'), orderController.updateOrderStatus);

module.exports = router;
