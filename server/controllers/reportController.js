import Report from '../models/Report.js';
import Payment from '../models/Payment.js';
import Review from '../models/Review.js';

// Create a Report
export const createReport = async (req, res) => {
    try {
        const { payment_id, review_id } = req.body;

        // Validate payment and review existence
        const payment = await Payment.findById(payment_id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });

        const review = review_id ? await Review.findById(review_id) : null;

        const report = new Report({
            payment_id,
            review_id: review ? review._id : null,
        });

        await report.save();
        res.status(201).json(report);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Reports
export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find().populate('payment_id').populate('review_id');
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a Report by ID
export const getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id).populate('payment_id').populate('review_id');
        if (!report) return res.status(404).json({ message: 'Report not found' });

        res.json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
