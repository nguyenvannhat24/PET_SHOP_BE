const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductCategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  image_url: { type: String },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
