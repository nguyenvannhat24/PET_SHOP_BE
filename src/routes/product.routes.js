const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

// Public
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

// Protected (Chỉ CLINIC được quản lý sản phẩm)
router.use(protect);
router.use(authorize('CLINIC', 'ADMIN'));

router.post('/clinic/:clinicId', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
