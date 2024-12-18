import Order from '../models/Order.js';
import OrderPriceDetail from '../models/OrderPriceDetail.js';
import Payment from '../models/Payment.js';

// Get Order Details by Order Code
export const getOrderDetailsByCode = async (req, res) => {
    try {
        const { orderCode } = req.params;

        // Find the order by its unique code
        const order = await Order.findOne({ order_code: orderCode })
            .populate('pricing_id') // Include pricing details
            .populate('user_id', 'name email phone') // Include customer/admin details
            .exec();

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Fetch additional order price details
        const orderPriceDetail = await OrderPriceDetail.findOne({ order_id: order._id });

        // Fetch payment details
        const payment = await Payment.findOne({ order_id: order._id });

        // Construct the response
        const response = {
            order_code: order.order_code,
            order_status: order.order_status,
            product_details: order.pricing_id ? order.pricing_id.product_id : null,
            sizes: {
                s_size_count: order.s_size_count,
                l_size_count: order.l_size_count,
                xl_size_count: order.xl_size_count,
                under_size_count: order.under_size_count,
                under_size_note: order.under_size_note,
                over_size_count: order.over_size_count,
                over_size_note: order.over_size_note,
            },
            note: order.note,
            pricing_status: order.pricing_id ? order.pricing_id.pricing_status : null,
            customer: order.user_id ? {
                name: order.user_id.name,
                phone: order.user_id.phone,
                email: order.user_id.email,
            } : null,
            payment: payment ? {
                payment_status: payment.payment_status,
                payment_method: payment.payment_method,
                paid_amount: payment.order_payment_detail,
            } : null,
            price_details: orderPriceDetail ? {
                unit_price_agreed: orderPriceDetail.unit_price_agreed,
                additional_price: orderPriceDetail.additional_price,
                total_price: orderPriceDetail.total_price,
            } : null,
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Order
export const createOrder = async (req, res) => {
    try {
        const { transactionCode, s_size_count, l_size_count, xl_size_count, under_size_count, under_size_note, over_size_count, over_size_note, note, pricing_id } = req.body;

        // Verify Pricing
        const pricing = await Pricing.findOne({ transactionCode });
        if (!pricing) return res.status(404).json({ message: 'Pricing not found' });

        const order = new Order({
            transactionCode,
            s_size_count,
            l_size_count,
            xl_size_count,
            under_size_count,
            under_size_note,
            over_size_count,
            over_size_note,
            note,
            pricing_id,
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createOrderWithPriceDetail = async (req, res) => {
    try {
        const { transactionCode, pricing_id, priceDetails } = req.body;

        // Create Order
        const order = new Order({
            transactionCode,
            pricing_id,
            order_status: 'queue',
        });
        await order.save();

        // Create Order Price Detail
        for (const detail of priceDetails) {
            const { product_id, quantity, price_per_unit, discount } = detail;

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
        }

        res.status(201).json({ order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};