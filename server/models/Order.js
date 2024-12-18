import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    s_size_count: { type: Number },
    l_size_count: { type: Number },
    xl_size_count: { type: Number },
    under_size_count: { type: Number },
    under_size_note: { type: String },
    over_size_count: { type: Number },
    over_size_note: { type: String },
    note: { type: String },
    order_status: { 
        type: String, 
        enum: ['queue', 'production', 'pending', 'cancel', 'ready for pickup', 'done'], 
        default: 'queue' 
    },
    transactionCode: { type: String, unique: true, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pricing_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pricing', required: true },
});

export default mongoose.model('Order', orderSchema);
