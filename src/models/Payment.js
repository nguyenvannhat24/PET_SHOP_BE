const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  payment_method: { type: String, required: true },
  transaction_code: { type: String },
  reference_type: { type: String },
  reference_id: { type: Schema.Types.ObjectId },
  status: { type: String, default: 'PENDING' },
  paid_at: { type: Date }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Payment', PaymentSchema);
