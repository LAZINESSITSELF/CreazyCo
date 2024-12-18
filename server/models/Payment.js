import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    payment_status: { type: String, enum: ['not paid off', 'paid off'], default: 'not paid off' },
    payment_method: { type: String },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    order_payment_detail: { type: Number },
});

export default mongoose.model('Payment', paymentSchema);