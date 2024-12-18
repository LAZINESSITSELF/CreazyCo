import express from 'express';
import { createOrderPriceDetail, getOrderPriceDetailsByTransactionCode } from '../controllers/orderPriceDetailController.js';

const router = express.Router();

router.post('/', createOrderPriceDetail);
router.get('/:code', getOrderPriceDetailsByTransactionCode);

export default router;
