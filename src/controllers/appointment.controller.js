const appointmentService = require('../services/appointment.service');

exports.createAppointment = async (req, res) => {
  try {
    const ownerId = req.user._id; // Từ token (PET_OWNER)
    const newAppt = await appointmentService.createAppointment(ownerId, req.body);
    
    res.status(201).json({
      success: true,
      message: 'Đặt lịch thành công',
      data: newAppt
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const appointments = await appointmentService.getMyAppointments(ownerId);
    
    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role;

    const appt = await appointmentService.updateStatus(id, status, userId, userRole);

    res.status(200).json({
      success: true,
      message: 'Cập nhật trạng thái thành công',
      data: appt
    });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};
