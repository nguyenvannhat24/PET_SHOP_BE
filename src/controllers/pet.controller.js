const petService = require('../services/pet.service');

// Lấy tất cả thú cưng của user đăng nhập
exports.getMyPets = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const pets = await petService.getPetsByOwner(ownerId);
    
    res.status(200).json({
      success: true,
      count: pets.length,
      data: pets
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách thú cưng:', error.message);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
  }
};

// Lấy chi tiết 1 thú cưng
exports.getPet = async (req, res) => {
  try {
    const petId = req.params.id;
    const ownerId = req.user._id;
    
    const pet = await petService.getPetById(petId, ownerId);
    
    res.status(200).json({
      success: true,
      data: pet
    });
  } catch (error) {
    if (error.message.includes('không tồn tại')) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
  }
};

// Tạo thú cưng mới
exports.createPet = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const petData = req.body;
    
    const newPet = await petService.createPet(ownerId, petData);
    
    res.status(201).json({
      success: true,
      message: 'Thêm thú cưng thành công',
      data: newPet
    });
  } catch (error) {
    if (error.message.includes('tối đa 3 thú cưng')) {
      return res.status(400).json({ success: false, message: error.message });
    }
    console.error('Lỗi khi thêm thú cưng:', error.message);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
  }
};

// Cập nhật thông tin thú cưng
exports.updatePet = async (req, res) => {
  try {
    const petId = req.params.id;
    const ownerId = req.user._id;
    const updateData = req.body;
    
    const updatedPet = await petService.updatePet(petId, ownerId, updateData);
    
    res.status(200).json({
      success: true,
      message: 'Cập nhật thú cưng thành công',
      data: updatedPet
    });
  } catch (error) {
    if (error.message.includes('không tồn tại')) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
  }
};

// Xóa thú cưng
exports.deletePet = async (req, res) => {
  try {
    const petId = req.params.id;
    const ownerId = req.user._id;
    
    await petService.deletePet(petId, ownerId);
    
    res.status(200).json({
      success: true,
      message: 'Xóa thú cưng thành công'
    });
  } catch (error) {
    if (error.message.includes('không tồn tại')) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
  }
};
