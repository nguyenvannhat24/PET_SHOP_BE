const orderService = require('../services/order.service');

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.user._id, req.body);
    res.status(201).json({ success: true, message: 'Đặt hàng thành công', data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getMyOrders(req.user._id);
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
  }
};

exports.getClinicOrders = async (req, res) => {
  try {
    const orders = await orderService.getClinicOrders(req.params.clinicId, req.user._id);
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.user._id, req.body.status);
    res.status(200).json({ success: true, message: 'Đã cập nhật trạng thái', data: order });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};
