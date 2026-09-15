const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdvertisementPackageSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  duration_days: { type: Number, required: true },
  priority_level: { type: Number, default: 0 },
  max_impressions: { type: Number },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('AdvertisementPackage', AdvertisementPackageSchema);
