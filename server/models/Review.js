import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    review: { type: String },
    picture: { type: String },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
});

export default mongoose.model('Review', reviewSchema);