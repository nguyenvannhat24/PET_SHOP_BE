const mongoose = require('mongoose');
const { Schema } = mongoose;

const SymptomSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  species: { type: String },
  severity: { type: String },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Symptom', SymptomSchema);
