const express = require('express');
const router = express.Router();
const { createReview, getAllReviews ,updateReview, getReviewById, getPendingReviews, getApprovedReviews} = require('./../controllers/review')
const {getAdminById} = require('../controllers/admin')

router.param('reviewId', getReviewById);
//router.param('adminId', getAdminById);


router.post('/review/create', createReview);
router.get('/review/all', getAllReviews);
router.get('/review/pending/all', getPendingReviews);
router.get('/review/approved/all', getApprovedReviews);
router.put('/review/update/:reviewId', updateReview);


module.exports = router;