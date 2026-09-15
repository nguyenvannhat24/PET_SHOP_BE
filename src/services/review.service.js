const Review = require('../models/Review');
const Appointment = require('../models/Appointment');

exports.createReview = async (userId, data) => {
  const { appointment_id, clinic_id, veterinarian_id, rating, comment } = data;

  // 1. Kiểm tra Lịch hẹn có tồn tại và thuộc về user không
  const appt = await Appointment.findOne({ _id: appointment_id, owner_id: userId });
  if (!appt) throw new Error('Không tìm thấy lịch hẹn hoặc bạn không có quyền.');

  // 2. Chặn Spam: Phải khám xong mới được đánh giá
  if (appt.status !== 'COMPLETED') {
    throw new Error('Chỉ có thể đánh giá sau khi lịch hẹn đã hoàn thành.');
  }

  // 3. Kiểm tra xem đã đánh giá chưa
  const existingReview = await Review.findOne({ appointment_id });
  if (existingReview) {
    throw new Error('Bạn đã đánh giá lịch hẹn này rồi.');
  }

  // 4. Lưu đánh giá
  const newReview = new Review({
    user_id: userId,
    appointment_id,
    clinic_id,
    veterinarian_id,
    rating,
    comment
  });

  return await newReview.save();
};

exports.getClinicReviews = async (clinicId) => {
  return await Review.find({ clinic_id: clinicId })
    .populate('user_id', 'full_name avatar_url')
    .sort({ created_at: -1 });
};

exports.getVeterinarianReviews = async (vetId) => {
  return await Review.find({ veterinarian_id: vetId })
    .populate('user_id', 'full_name avatar_url')
    .sort({ created_at: -1 });
};
