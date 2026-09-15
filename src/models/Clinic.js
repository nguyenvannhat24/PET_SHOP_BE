const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClinicSchema = new Schema({
  owner_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['VETERINARY_CLINIC', 'PET_SHOP', 'PET_HOSPITAL', 'PET_SPA', 'PET_HOTEL'], required: true },
  description: { type: String },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  logo_url: { type: String },
  cover_url: { type: String },
  opening_time: { type: String },
  closing_time: { type: String },
  status: { type: String, default: 'ACTIVE' },
  average_rating: { type: Number, default: 0 },
  total_reviews: { type: Number, default: 0 },
  is_verified: { type: Boolean, default: false }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Clinic', ClinicSchema);
