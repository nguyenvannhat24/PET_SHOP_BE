const Product = require('../models/Product');
const Clinic = require('../models/Clinic');

exports.createProduct = async (clinicId, ownerId, data) => {
  // Kiểm tra quyền: Clinic này có phải của người đang đăng nhập không
  const clinic = await Clinic.findOne({ _id: clinicId, owner_id: ownerId });
  if (!clinic) throw new Error('Bạn không có quyền đăng bán sản phẩm cho cửa hàng này.');

  const newProduct = new Product({
    clinic_id: clinicId,
    ...data
  });
  return await newProduct.save();
};

exports.getProducts = async (filters) => {
  const query = {};
  if (filters.clinic_id) query.clinic_id = filters.clinic_id;
  if (filters.category) query.category = filters.category;
  if (filters.q) query.name = { $regex: filters.q, $options: 'i' };

  return await Product.find(query).sort({ created_at: -1 });
};

exports.getProductById = async (id) => {
  const product = await Product.findById(id).populate('clinic_id', 'name address');
  if (!product) throw new Error('Sản phẩm không tồn tại.');
  return product;
};

exports.updateProduct = async (productId, ownerId, data) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error('Sản phẩm không tồn tại.');

  const clinic = await Clinic.findOne({ _id: product.clinic_id, owner_id: ownerId });
  if (!clinic) throw new Error('Bạn không có quyền sửa sản phẩm này.');

  return await Product.findByIdAndUpdate(productId, data, { new: true });
};

exports.deleteProduct = async (productId, ownerId) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error('Sản phẩm không tồn tại.');

  const clinic = await Clinic.findOne({ _id: product.clinic_id, owner_id: ownerId });
  if (!clinic) throw new Error('Bạn không có quyền xóa sản phẩm này.');

  await Product.findByIdAndDelete(productId);
  return true;
};
