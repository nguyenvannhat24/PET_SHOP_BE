const mongoose = require('mongoose');
const { Schema } = mongoose;

const PointTransactionSchema = new Schema({
  wallet_id: { type: Schema.Types.ObjectId, ref: 'PointWallet', required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  balance_after: { type: Number, required: true },
  reference_type: { type: String },
  reference_id: { type: Schema.Types.ObjectId },
  description: { type: String }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('PointTransaction', PointTransactionSchema);
