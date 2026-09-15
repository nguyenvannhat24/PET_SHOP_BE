const Pet = require('../models/Pet');

// Tạo thú cưng mới
exports.createPet = async (ownerId, petData) => {
  // Kiểm tra số lượng thú cưng hiện tại
  const count = await Pet.countDocuments({ owner_id: ownerId });
  
  if (count >= 3) {
    throw new Error('Bạn chỉ được phép tạo tối đa 3 thú cưng cho mỗi tài khoản.');
  }

  const newPet = new Pet({
    owner_id: ownerId,
    ...petData
  });

  return await newPet.save();
};

// Lấy danh sách thú cưng của một chủ
exports.getPetsByOwner = async (ownerId) => {
  return await Pet.find({ owner_id: ownerId }).sort({ created_at: -1 });
};

// Lấy thông tin chi tiết một thú cưng
exports.getPetById = async (petId, ownerId) => {
  const pet = await Pet.findOne({ _id: petId, owner_id: ownerId });
  
  if (!pet) {
    throw new Error('Thú cưng không tồn tại hoặc bạn không có quyền truy cập.');
  }
  return pet;
};

// Cập nhật thông tin thú cưng
exports.updatePet = async (petId, ownerId, updateData) => {
  const pet = await Pet.findOneAndUpdate(
    { _id: petId, owner_id: ownerId },
    updateData,
    { new: true, runValidators: true }
  );

  if (!pet) {
    throw new Error('Thú cưng không tồn tại hoặc bạn không có quyền truy cập.');
  }
  return pet;
};

// Xóa thú cưng
exports.deletePet = async (petId, ownerId) => {
  const pet = await Pet.findOneAndDelete({ _id: petId, owner_id: ownerId });
  
  if (!pet) {
    throw new Error('Thú cưng không tồn tại hoặc bạn không có quyền truy cập.');
  }
  return true;
};
