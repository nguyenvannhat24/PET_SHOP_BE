const mongoose = require('mongoose');
const { Schema } = mongoose;

const PointWalletSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balance: { type: Number, default: 0 },
  total_earned: { type: Number, default: 0 },
  total_spent: { type: Number, default: 0 }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('PointWallet', PointWalletSchema);
