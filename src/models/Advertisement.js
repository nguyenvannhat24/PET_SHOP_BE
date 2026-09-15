const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdvertisementSchema = new Schema({
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  package_id: { type: Schema.Types.ObjectId, ref: 'AdvertisementPackage', required: true },
  title: { type: String, required: true },
  image_url: { type: String, required: true },
  target_url: { type: String },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  budget: { type: Number },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Advertisement', AdvertisementSchema);
