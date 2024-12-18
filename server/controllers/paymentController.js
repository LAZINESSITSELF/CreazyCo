import Payment from '../models/Payment.js';

// Create Payment
export const createPayment = async (req, res) => {
    try {
        const { transactionCode, payment_method, order_payment_detail } = req.body;

        const payment = new Payment({
            transactionCode,
            payment_method,
            order_payment_detail,
        });

        await payment.save();
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
