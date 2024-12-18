import Pricing from '../models/Pricing.js';
import Product from '../models/Product.js';

// Create Pricing
export const createPricing = async (req, res) => {
    try {
        const { customer_name, customer_phone, design, product_id } = req.body;
        const transactionCode = `TRX-${Date.now()}`;
        const pricing = new Pricing({
            customer_name,
            customer_phone,
            design,
            transactionCode,
            product_id,
        });

        await pricing.save();
        res.status(201).json(pricing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get Pricing by Transaction Code
export const getPricingByCode = async (req, res) => {
    try {
        const pricing = await Pricing.findOne({ transactionCode: req.params.code }).populate('product_id');
        if (!pricing) return res.status(404).json({ message: 'Pricing not found' });
        res.json(pricing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
