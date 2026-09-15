const reviewService = require('../services/review.service');

exports.createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(req.user._id, req.body);
    res.status(201).json({ success: true, message: 'Cảm ơn bạn đã đánh giá!', data: review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getClinicReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getClinicReviews(req.params.clinicId);
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
  }
};

exports.getVetReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getVeterinarianReviews(req.params.vetId);
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
  }
};
