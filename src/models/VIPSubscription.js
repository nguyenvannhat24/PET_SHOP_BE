const mongoose = require('mongoose');
const { Schema } = mongoose;

const VIPSubscriptionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plan_id: { type: Schema.Types.ObjectId, ref: 'VIPPlan', required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: 'ACTIVE' },
  payment_id: { type: Schema.Types.ObjectId, ref: 'Payment' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('VIPSubscription', VIPSubscriptionSchema);
