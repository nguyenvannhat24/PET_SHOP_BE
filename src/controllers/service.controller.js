const serviceLogic = require('../services/service.service');

exports.getClinicServices = async (req, res) => {
  try {
    const services = await serviceLogic.getServicesByClinic(req.params.clinicId);
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
  }
};

exports.createService = async (req, res) => {
  try {
    const service = await serviceLogic.createService(req.params.clinicId, req.user._id, req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const updated = await serviceLogic.updateService(req.params.id, req.user._id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await serviceLogic.deleteService(req.params.id, req.user._id);
    res.status(200).json({ success: true, message: 'Xóa dịch vụ thành công' });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};
