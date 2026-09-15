const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (userData) => {
  const { full_name, email, password, phone, role } = userData;

  // Kiểm tra xem email đã tồn tại chưa
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email đã được sử dụng');
  }

  // Hash mật khẩu
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  // Tạo user mới
  const newUser = new User({
    full_name,
    email,
    password_hash,
    phone,
    role: role || 'PET_OWNER',
  });

  await newUser.save();

  return {
    id: newUser._id,
    full_name: newUser.full_name,
    email: newUser.email,
    role: newUser.role
  };
};

exports.loginUser = async (credentials) => {
  const { email, password } = credentials;

  // Kiểm tra email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email hoặc mật khẩu không chính xác');
  }

  // Kiểm tra trạng thái tài khoản
  if (user.status !== 'ACTIVE') {
    throw new Error('Tài khoản của bạn đã bị vô hiệu hóa hoặc bị khóa');
  }

  // Kiểm tra mật khẩu
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Email hoặc mật khẩu không chính xác');
  }

  // Tạo JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );

  return {
    token,
    user: {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      avatar_url: user.avatar_url
    }
  };
};
