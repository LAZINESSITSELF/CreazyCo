import OrderPriceDetail from '../models/OrderPriceDetail.js';
import Product from '../models/Product.js';

// Create Order Price Detail
export const createOrderPriceDetail = async (req, res) => {
    try {
        const { transactionCode, product_id, quantity, price_per_unit, discount } = req.body;

        // Calculate total and final price
        const total_price = quantity * price_per_unit;
        const final_price = total_price - (discount || 0);

        const orderPriceDetail = new OrderPriceDetail({
            transactionCode,
            product_id,
            quantity,
            price_per_unit,
            total_price,
            discount,
            final_price,
        });

        await orderPriceDetail.save();
        res.status(201).json(orderPriceDetail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get Order Price Details by Transaction Code
export const getOrderPriceDetailsByTransactionCode = async (req, res) => {
    try {
        const details = await OrderPriceDetail.find({ transactionCode: req.params.code }).populate('product_id');
        if (!details.length) return res.status(404).json({ message: 'No details found for this transaction.' });

        res.json(details);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
