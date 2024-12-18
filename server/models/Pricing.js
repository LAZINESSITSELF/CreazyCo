import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema({
    customer_name: { type: String, required: true },
    customer_phone: { type: String },
    design: { type: String },
    pricing_status: { type: String, enum: ['nego', 'fix', 'cancel'], default: 'nego' },
    price_per_unit: { type: Number },
    transactionCode: { type: String, unique: true, required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
});

export default mongoose.model('Pricing', pricingSchema);
