const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  owner_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pet_id: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  veterinarian_id: { type: Schema.Types.ObjectId, ref: 'Veterinarian' },
  service_id: { type: Schema.Types.ObjectId, ref: 'Service' },
  appointment_date: { type: Date, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String },
  reason: { type: String },
  symptoms: { type: String },
  notes: { type: String },
  status: { type: String, enum: ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REJECTED', 'NO_SHOW'], default: 'PENDING' },
  cancellation_reason: { type: String },
  completed_at: { type: Date }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
