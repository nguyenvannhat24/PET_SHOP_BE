const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceCategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('ServiceCategory', ServiceCategorySchema);
