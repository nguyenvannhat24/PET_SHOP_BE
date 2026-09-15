const mongoose = require('mongoose');
const { Schema } = mongoose;

const VoucherSchema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  discount_type: { type: String, required: true },
  discount_value: { type: Number, required: true },
  min_order_value: { type: Number },
  max_discount: { type: Number },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  quantity: { type: Number, required: true },
  used_quantity: { type: Number, default: 0 },
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic' },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Voucher', VoucherSchema);
