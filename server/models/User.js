import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, enum: ['customer', 'admin'], required: true },
});

export default mongoose.model('User', userSchema);