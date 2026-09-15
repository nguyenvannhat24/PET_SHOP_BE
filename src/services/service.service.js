const ServiceModel = require('../models/Service');
const Clinic = require('../models/Clinic');

exports.createService = async (clinicId, ownerId, data) => {
  // Kiểm tra quyền sở hữu clinic
  const clinic = await Clinic.findOne({ _id: clinicId, owner_id: ownerId });
  if (!clinic) throw new Error('Không tìm thấy phòng khám hoặc bạn không có quyền thêm dịch vụ vào phòng khám này.');

  const newService = new ServiceModel({
    clinic_id: clinicId,
    ...data
  });
  return await newService.save();
};

exports.getServicesByClinic = async (clinicId) => {
  return await ServiceModel.find({ clinic_id: clinicId }).sort({ created_at: -1 });
};

exports.updateService = async (serviceId, ownerId, data) => {
  const service = await ServiceModel.findById(serviceId);
  if (!service) throw new Error('Dịch vụ không tồn tại.');

  const clinic = await Clinic.findOne({ _id: service.clinic_id, owner_id: ownerId });
  if (!clinic) throw new Error('Bạn không có quyền sửa dịch vụ này.');

  return await ServiceModel.findByIdAndUpdate(serviceId, data, { new: true, runValidators: true });
};

exports.deleteService = async (serviceId, ownerId) => {
  const service = await ServiceModel.findById(serviceId);
  if (!service) throw new Error('Dịch vụ không tồn tại.');

  const clinic = await Clinic.findOne({ _id: service.clinic_id, owner_id: ownerId });
  if (!clinic) throw new Error('Bạn không có quyền xóa dịch vụ này.');

  await ServiceModel.findByIdAndDelete(serviceId);
  return true;
};
