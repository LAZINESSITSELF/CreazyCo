import express from 'express';
import { createReport, getAllReports, getReportById } from '../controllers/reportController.js';

const router = express.Router();

router.post('/', createReport);
router.get('/', getAllReports);
router.get('/:id', getReportById);

export default router;
