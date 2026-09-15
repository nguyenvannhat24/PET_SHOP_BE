const mongoose = require('mongoose');
const { Schema } = mongoose;

const MedicalRecordSchema = new Schema({
  pet_id: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
  veterinarian_id: { type: Schema.Types.ObjectId, ref: 'Veterinarian' },
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic' },
  appointment_id: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  diagnosis: { type: String, required: true },
  symptoms: { type: String },
  treatment: { type: String },
  prescription: { type: String },
  notes: { type: String },
  attachment_url: { type: String },
  record_date: { type: Date, default: Date.now }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);
