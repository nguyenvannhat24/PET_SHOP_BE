const cartService = require('../services/cart.service');

exports.getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user._id);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartService.addToCart(req.user._id, productId, quantity || 1);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await cartService.removeFromCart(req.user._id, req.params.productId);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await cartService.clearCart(req.user._id);
    res.status(200).json({ success: true, message: 'Đã làm trống giỏ hàng' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
  }
};
