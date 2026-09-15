const mongoose = require('mongoose');
const { Schema } = mongoose;

const VeterinarianSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  license_number: { type: String },
  specialization: { type: String },
  experience_years: { type: Number },
  education: { type: String },
  bio: { type: String },
  avatar_url: { type: String },
  average_rating: { type: Number, default: 0 },
  total_reviews: { type: Number, default: 0 },
  is_verified: { type: Boolean, default: false }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Veterinarian', VeterinarianSchema);
