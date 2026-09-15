const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clinic_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
  items: [{
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  total_amount: { type: Number, required: true },
  shipping_address: { type: String, required: true },
  payment_method: { type: String, enum: ['COD', 'VNPAY', 'MOMO'], default: 'COD' },
  status: { 
    type: String, 
    enum: ['PENDING', 'PROCESSING', 'SHIPPING', 'DELIVERED', 'CANCELLED'], 
    default: 'PENDING' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
