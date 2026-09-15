const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Clinic = require('../models/Clinic');
const Product = require('../models/Product');

exports.createOrder = async (userId, data) => {
  const { shipping_address, payment_method } = data;

  // Lấy giỏ hàng
  const cart = await Cart.findOne({ user_id: userId }).populate('items.product_id');
  if (!cart || cart.items.length === 0) {
    throw new Error('Giỏ hàng trống, không thể đặt hàng.');
  }

  // Phân loại item theo Clinic (để nếu mua từ 2 clinic khác nhau thì tạo 2 đơn hàng)
  // Tuy nhiên để đơn giản, ta gộp hoặc giả sử 1 đơn hàng chỉ mua từ 1 clinic. 
  // Ở đây ta tính tổng tiền và lưu chung (Nghiệp vụ thực tế sẽ tách đơn).
  let totalAmount = 0;
  const orderItems = cart.items.map(item => {
    totalAmount += item.quantity * item.product_id.price;
    return {
      product_id: item.product_id._id,
      quantity: item.quantity,
      price: item.product_id.price
    };
  });

  // Lấy clinic_id từ sản phẩm đầu tiên (Giả sử giỏ hàng chỉ mua từ 1 clinic)
  const clinicId = cart.items[0].product_id.clinic_id;

  const newOrder = new Order({
    user_id: userId,
    clinic_id: clinicId,
    items: orderItems,
    total_amount: totalAmount,
    shipping_address,
    payment_method: payment_method || 'COD',
    status: 'PENDING'
  });

  await newOrder.save();

  // Làm trống giỏ hàng sau khi đặt thành công
  cart.items = [];
  await cart.save();

  return newOrder;
};

exports.getMyOrders = async (userId) => {
  return await Order.find({ user_id: userId })
    .populate('clinic_id', 'name')
    .sort({ created_at: -1 });
};

exports.getClinicOrders = async (clinicId, ownerId) => {
  const clinic = await Clinic.findOne({ _id: clinicId, owner_id: ownerId });
  if (!clinic) throw new Error('Bạn không có quyền xem đơn hàng của cửa hàng này.');

  return await Order.find({ clinic_id: clinicId })
    .populate('user_id', 'full_name phone')
    .sort({ created_at: -1 });
};

exports.updateOrderStatus = async (orderId, ownerId, status) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Đơn hàng không tồn tại.');

  const clinic = await Clinic.findOne({ _id: order.clinic_id, owner_id: ownerId });
  if (!clinic) throw new Error('Bạn không có quyền cập nhật trạng thái đơn hàng này.');

  order.status = status;
  return await order.save();
};
