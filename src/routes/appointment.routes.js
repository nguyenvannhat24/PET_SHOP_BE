const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const { protect } = require('../middlewares/auth.middleware');

// Toàn bộ các API về Appointment đều phải đăng nhập
router.use(protect);

// @route   POST /api/appointments
// @desc    Tạo lịch hẹn mới (Dành cho Pet Owner)
router.post('/', appointmentController.createAppointment);

// @route   GET /api/appointments
// @desc    Xem lịch sử đặt lịch (Dành cho Pet Owner)
router.get('/', appointmentController.getMyAppointments);

// @route   PATCH /api/appointments/:id/status
// @desc    Đổi trạng thái lịch hẹn (Owner hủy, Clinic xác nhận...)
router.patch('/:id/status', appointmentController.updateAppointmentStatus);

module.exports = router;
