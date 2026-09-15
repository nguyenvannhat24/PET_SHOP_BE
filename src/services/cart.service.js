const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (userId) => {
  let cart = await Cart.findOne({ user_id: userId }).populate('items.product_id', 'name price images');
  
  if (!cart) {
    cart = await Cart.create({ user_id: userId, items: [] });
  }
  return cart;
};

exports.addToCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error('Sản phẩm không tồn tại');

  let cart = await Cart.findOne({ user_id: userId });
  if (!cart) {
    cart = new Cart({ user_id: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(p => p.product_id.toString() === productId);
  
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product_id: productId, quantity });
  }

  return await cart.save();
};

exports.removeFromCart = async (userId, productId) => {
  let cart = await Cart.findOne({ user_id: userId });
  if (!cart) throw new Error('Giỏ hàng trống');

  cart.items = cart.items.filter(item => item.product_id.toString() !== productId);
  return await cart.save();
};

exports.clearCart = async (userId) => {
  let cart = await Cart.findOne({ user_id: userId });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  return true;
};
