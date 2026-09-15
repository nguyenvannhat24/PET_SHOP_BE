const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceSchema = new Schema({
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'ServiceCategory' },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  duration_minutes: { type: Number },
  species: { type: String },
  status: { type: String, default: 'ACTIVE' },
  image_url: { type: String }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Service', ServiceSchema);
