const authService = require('../services/auth.service');

// Đăng ký (Register)
exports.register = async (req, res) => {
  try {
    const data = await authService.registerUser(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      data
    });
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error.message);
    // Nếu lỗi do dữ liệu đầu vào hoặc nghiệp vụ thì trả về 400
    if (error.message === 'Email đã được sử dụng') {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
  }
};

// Đăng nhập (Login)
exports.login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      token: result.token,
      data: result.user
    });
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error.message);
    // Nếu lỗi do thông tin sai, trả về 401 hoặc 403
    if (error.message.includes('không chính xác')) {
        return res.status(401).json({ success: false, message: error.message });
    }
    if (error.message.includes('vô hiệu hóa')) {
        return res.status(403).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
  }
};
