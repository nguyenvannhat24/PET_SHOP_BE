const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  appointment_id: { type: Schema.Types.ObjectId, ref: 'Appointment', required: true, unique: true },
  owner_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  veterinarian_id: { type: Schema.Types.ObjectId, ref: 'Veterinarian' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  images: [{ type: String }],
  response: { type: String }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Review', ReviewSchema);
