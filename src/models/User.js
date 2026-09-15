const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  phone: { type: String, required: true },
  avatar_url: { type: String },
  role: { type: String, enum: ['PET_OWNER', 'VETERINARIAN', 'CLINIC', 'ADMIN'], default: 'PET_OWNER' },
  status: { type: String, enum: ['ACTIVE', 'BLOCKED', 'INACTIVE'], default: 'ACTIVE' },
  email_verified: { type: Boolean, default: false },
  phone_verified: { type: Boolean, default: false },
  address: { type: String },
  latitude: { type: Number },
  longitude: { type: Number }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('User', UserSchema);
