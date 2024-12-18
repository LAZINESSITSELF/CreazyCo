import express from 'express';
import Pricing from '../models/Pricing.js';

const router = express.Router();

// Create Pricing
router.post('/', async (req, res) => {
    try {
        const pricing = new Pricing(req.body);
        pricing.pricing_code = Date.now(); // Unique code
        await pricing.save();
        res.status(201).json(pricing);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Pricing by Code
router.get('/:code', async (req, res) => {
    try {
        const pricing = await Pricing.findOne({ pricing_code: req.params.code }).populate('product_id');
        if (!pricing) return res.status(404).json({ error: 'Pricing not found' });
        res.json(pricing);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;