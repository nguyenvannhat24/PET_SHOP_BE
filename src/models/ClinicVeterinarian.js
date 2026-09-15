const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClinicVeterinarianSchema = new Schema({
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  veterinarian_id: { type: Schema.Types.ObjectId, ref: 'Veterinarian', required: true },
  position: { type: String },
  joined_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('ClinicVeterinarian', ClinicVeterinarianSchema);
