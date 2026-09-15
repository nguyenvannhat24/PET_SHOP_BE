const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Đảm bảo token tồn tại
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Không có quyền truy cập API này, vui lòng đăng nhập.',
    });
  }

  try {
    // Xác thực token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your_jwt_secret_key_here'
    );

    // Gắn thông tin user vào request
    req.user = await User.findById(decoded.id).select('-password_hash');
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản không tồn tại.',
      });
    }

    if (req.user.status !== 'ACTIVE') {
      return res.status(403).json({
        success: false,
        message: 'Tài khoản đã bị vô hiệu hóa.',
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ hoặc đã hết hạn.',
    });
  }
};

// Phân quyền theo role
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Tài khoản với quyền '${req.user.role}' không được phép truy cập.`,
      });
    }
    next();
  };
};
