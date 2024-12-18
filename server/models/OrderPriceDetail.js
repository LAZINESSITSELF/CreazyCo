import mongoose from 'mongoose';

const orderPriceDetailSchema = new mongoose.Schema({
    transactionCode: { type: String, required: true, unique: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price_per_unit: { type: Number, required: true },
    total_price: { type: Number, required: true },
    discount: { type: Number, default: 0 }, // Optional discount field
    final_price: { type: Number, required: true }, // total_price - discount
});

export default mongoose.model('OrderPriceDetail', orderPriceDetailSchema);