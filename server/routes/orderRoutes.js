import express from 'express';
import { createOrder,getOrderDetailsByCode,createOrderWithPriceDetail } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);

router.get('/details/:orderCode', getOrderDetailsByCode);

router.post('/create', createOrderWithPriceDetail);

export default router;
