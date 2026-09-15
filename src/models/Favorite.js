const mongoose = require('mongoose');
const { Schema } = mongoose;

const FavoriteSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  target_type: { type: String, enum: ['CLINIC', 'VETERINARIAN', 'SERVICE', 'PRODUCT'], required: true },
  target_id: { type: Schema.Types.ObjectId, required: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
