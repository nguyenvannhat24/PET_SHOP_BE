const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClinicSymptomSchema = new Schema({
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  symptom_id: { type: Schema.Types.ObjectId, ref: 'Symptom', required: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('ClinicSymptom', ClinicSymptomSchema);
