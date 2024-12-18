import Review from '../models/Review.js';
import Order from '../models/Order.js';

// Create a Review
export const createReview = async (req, res) => {
    try {
        const { order_id, rating, review, picture } = req.body;

        // Validate if order exists
        const order = await Order.findById(order_id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        const newReview = new Review({
            order_id,
            rating,
            review: review || null,
            picture: picture || null,
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('order_id');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Reviews by Order ID
export const getReviewsByOrderId = async (req, res) => {
    try {
        const reviews = await Review.find({ order_id: req.params.orderId });
        if (!reviews.length) return res.status(404).json({ message: 'No reviews found for this order' });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Review
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
