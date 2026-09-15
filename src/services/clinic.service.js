const Clinic = require('../models/Clinic');

// Tạo phòng khám mới (Chỉ Role CLINIC)
exports.createClinic = async (ownerId, clinicData) => {
  // Mỗi user có thể chỉ được tạo 1 phòng khám (tùy nghiệp vụ), ở đây tạm cho phép tạo nhiều.
  const newClinic = new Clinic({
    owner_id: ownerId,
    ...clinicData
  });
  return await newClinic.save();
};

// Lấy danh sách phòng khám (Public)
exports.getClinics = async (filters) => {
  // Hỗ trợ tìm kiếm cơ bản
  const query = {};
  if (filters.type) query.type = filters.type;
  if (filters.status) query.status = filters.status;
  
  return await Clinic.find(query).sort({ created_at: -1 });
};

// Lấy chi tiết phòng khám (Public)
exports.getClinicById = async (id) => {
  const clinic = await Clinic.findById(id);
  if (!clinic) throw new Error('Không tìm thấy phòng khám.');
  return clinic;
};

// Cập nhật thông tin phòng khám
exports.updateClinic = async (clinicId, ownerId, updateData) => {
  const clinic = await Clinic.findOneAndUpdate(
    { _id: clinicId, owner_id: ownerId },
    updateData,
    { new: true, runValidators: true }
  );

  if (!clinic) throw new Error('Không tìm thấy phòng khám hoặc bạn không có quyền.');
  return clinic;
};

// Xóa phòng khám
exports.deleteClinic = async (clinicId, ownerId) => {
  const clinic = await Clinic.findOneAndDelete({ _id: clinicId, owner_id: ownerId });
  if (!clinic) throw new Error('Không tìm thấy phòng khám hoặc bạn không có quyền.');
  return true;
};
