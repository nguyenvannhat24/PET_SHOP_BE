const clinicService = require('../services/clinic.service');

// Lấy danh sách phòng khám
exports.getClinics = async (req, res) => {
  try {
    const clinics = await clinicService.getClinics(req.query);
    res.status(200).json({ success: true, count: clinics.length, data: clinics });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
  }
};

// Chi tiết phòng khám
exports.getClinic = async (req, res) => {
  try {
    const clinic = await clinicService.getClinicById(req.params.id);
    res.status(200).json({ success: true, data: clinic });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Tạo phòng khám
exports.createClinic = async (req, res) => {
  try {
    const newClinic = await clinicService.createClinic(req.user._id, req.body);
    res.status(201).json({ success: true, data: newClinic });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Cập nhật phòng khám
exports.updateClinic = async (req, res) => {
  try {
    const updated = await clinicService.updateClinic(req.params.id, req.user._id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

// Xóa phòng khám
exports.deleteClinic = async (req, res) => {
  try {
    await clinicService.deleteClinic(req.params.id, req.user._id);
    res.status(200).json({ success: true, message: 'Xóa thành công' });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};
