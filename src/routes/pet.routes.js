const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet.controller');
const { protect } = require('../middlewares/auth.middleware');

// Áp dụng middleware protect cho TẤT CẢ các routes ở dưới
// Nghĩa là: Phải đăng nhập và truyền JWT Bearer Token mới dùng được
router.use(protect);

// @route   GET /api/pets
// @desc    Lấy danh sách thú cưng của tôi
router.get('/', petController.getMyPets);

// @route   POST /api/pets
// @desc    Thêm thú cưng mới (Tối đa 3 con)
router.post('/', petController.createPet);

// @route   GET /api/pets/:id
// @desc    Lấy chi tiết 1 thú cưng
router.get('/:id', petController.getPet);

// @route   PUT /api/pets/:id
// @desc    Cập nhật thông tin thú cưng
router.put('/:id', petController.updatePet);

// @route   DELETE /api/pets/:id
// @desc    Xóa thú cưng
router.delete('/:id', petController.deletePet);

module.exports = router;
