const mongoose = require('mongoose');
const { Schema } = mongoose;

const VaccinationSchema = new Schema({
  pet_id: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
  vaccine_name: { type: String, required: true },
  vaccination_date: { type: Date, required: true },
  next_due_date: { type: Date },
  veterinarian_id: { type: Schema.Types.ObjectId, ref: 'Veterinarian' },
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic' },
  batch_number: { type: String },
  notes: { type: String },
  reminder_enabled: { type: Boolean, default: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Vaccination', VaccinationSchema);
