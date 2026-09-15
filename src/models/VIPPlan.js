const mongoose = require('mongoose');
const { Schema } = mongoose;

const VIPPlanSchema = new Schema({
  name: { type: String, required: true },
  duration_days: { type: Number, required: true },
  price: { type: Number, required: true },
  max_pets: { type: Number, required: true },
  ad_free: { type: Boolean, default: false },
  benefits: { type: String },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('VIPPlan', VIPPlanSchema);
