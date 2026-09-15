const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  clinic_id: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, default: 0 },
  image_url: { type: String },
  brand: { type: String },
  species: { type: String },
  status: { type: String, default: 'ACTIVE' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Product', ProductSchema);
