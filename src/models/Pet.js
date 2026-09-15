const mongoose = require('mongoose');
const { Schema } = mongoose;

const PetSchema = new Schema({
  owner_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String },
  gender: { type: String, enum: ['MALE', 'FEMALE', 'UNKNOWN'], default: 'UNKNOWN' },
  date_of_birth: { type: Date },
  weight: { type: Number },
  color: { type: String },
  avatar_url: { type: String },
  is_neutered: { type: Boolean, default: false },
  allergies: { type: String },
  chronic_conditions: { type: String },
  notes: { type: String }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Pet', PetSchema);
