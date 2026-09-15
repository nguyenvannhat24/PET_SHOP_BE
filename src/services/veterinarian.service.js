const Veterinarian = require('../models/Veterinarian');

// Tạo hồ sơ bác sĩ
exports.createProfile = async (userId, data) => {
  const existing = await Veterinarian.findOne({ user_id: userId });
  if (existing) throw new Error('Hồ sơ bác sĩ của bạn đã tồn tại.');

  const newVet = new Veterinarian({
    user_id: userId,
    ...data
  });
  return await newVet.save();
};

// Lấy danh sách bác sĩ
exports.getVeterinarians = async (filters) => {
  return await Veterinarian.find(filters).populate('user_id', 'full_name avatar_url');
};

// Chi tiết bác sĩ
exports.getVeterinarianById = async (id) => {
  const vet = await Veterinarian.findById(id).populate('user_id', 'full_name avatar_url email');
  if (!vet) throw new Error('Không tìm thấy bác sĩ.');
  return vet;
};

// Cập nhật hồ sơ
exports.updateProfile = async (userId, data) => {
  const vet = await Veterinarian.findOneAndUpdate(
    { user_id: userId },
    data,
    { new: true, runValidators: true }
  );
  if (!vet) throw new Error('Không tìm thấy hồ sơ hoặc bạn không có quyền.');
  return vet;
};
