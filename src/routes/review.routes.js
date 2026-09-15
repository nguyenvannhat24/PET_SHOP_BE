const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

// Public
router.get('/clinic/:clinicId', reviewController.getClinicReviews);
router.get('/veterinarian/:vetId', reviewController.getVetReviews);

// Protected (Chỉ PET_OWNER được đánh giá)
router.use(protect);
router.post('/', authorize('PET_OWNER'), reviewController.createReview);

module.exports = router;
