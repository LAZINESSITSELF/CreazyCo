import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    picture: { type: String },
    description: { type: String },
    stock: { type: Number, required: true },
    base_price: { type: Number, required: true },
});

export default mongoose.model('Product', productSchema);