import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    payment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
    review_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
});

export default mongoose.model('Report', reportSchema);