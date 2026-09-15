# PET_SHOP_BE

Đây là mã nguồn Backend cho dự án Hệ thống quản lý và chăm sóc thú cưng (Pet Shop). Dự án được xây dựng bằng **Node.js**, framework **Express.js**, và cơ sở dữ liệu **MongoDB** (thông qua `mongoose`).

## 🚀 Công nghệ sử dụng

- **Node.js** & **Express.js**: Framework xây dựng server API.
- **MongoDB** & **Mongoose**: Hệ quản trị cơ sở dữ liệu NoSQL.
- **JWT (JSON Web Token)**: Xác thực và phân quyền người dùng.
- **Bcryptjs**: Mã hóa mật khẩu.
- **Cors**, **Dotenv**: Hỗ trợ bảo mật và quản lý biến môi trường.

## ⚙️ Cài đặt và sử dụng

Yêu cầu hệ thống phải cài đặt sẵn **Node.js** và **MongoDB**.

### 1. Clone dự án

```bash
git clone https://github.com/nguyenvannhat24/PET_SHOP_BE.git
cd PET_SHOP_BE
```

### 2. Cài đặt thư viện (dependencies)

```bash
npm install
```

### 3. Cấu hình biến môi trường

Tạo một file `.env` ở thư mục gốc của dự án (ngang hàng với `package.json`) và thêm các biến môi trường cần thiết. Ví dụ:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pet_shop_db
JWT_SECRET=your_jwt_secret_key
```

### 4. Khởi chạy server

**Môi trường phát triển (Development):**

Chạy lệnh dưới đây để khởi động server với `nodemon` (tự động reload khi có thay đổi code):

```bash
npm run dev
```

**Môi trường sản xuất (Production):**

```bash
npm start
```

Server sẽ mặc định chạy tại `http://localhost:5000` (hoặc cổng bạn cấu hình trong file `.env`).

## 📁 Cấu trúc thư mục chính

- `src/controllers/`: Xử lý logic của các API (nhận request, trả response).
- `src/models/`: Định nghĩa các schema của MongoDB (User, Pet, Product, Order, ...).
- `src/routes/`: Định nghĩa các endpoint của API và liên kết với controller tương ứng.
- `src/services/`: Chứa các hàm xử lý logic nghiệp vụ, làm việc trực tiếp với database.
- `src/middlewares/`: Chứa các middleware (ví dụ: xác thực token, kiểm tra quyền, xử lý lỗi).
- `src/config/`: Cấu hình kết nối database, các biến môi trường.
- `src/utils/`: Các hàm tiện ích dùng chung.
- `src/server.js`: File khởi chạy server Express.
