const productService = require('../services/product.service');

exports.getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts(req.query);
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.params.clinicId, req.user._id, req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.user._id, req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id, req.user._id);
    res.status(200).json({ success: true, message: 'Đã xóa sản phẩm' });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};
