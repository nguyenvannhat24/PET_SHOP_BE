const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect); // Phải đăng nhập mới dùng được giỏ hàng

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.delete('/remove/:productId', cartController.removeFromCart);
router.delete('/clear', cartController.clearCart);

module.exports = router;
