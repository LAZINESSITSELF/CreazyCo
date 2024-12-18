import express from 'express';
import { createReview, getAllReviews, getReviewsByOrderId, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', createReview);
router.get('/', getAllReviews);
router.get('/order/:orderId', getReviewsByOrderId);
router.delete('/:id', deleteReview);

export default router;
