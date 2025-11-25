import Router from 'express';
import { placeOrder, getOrderHistory, cancelOrder, updateOrderStatus } from '../controller/orderController.js';

const orderRouter = Router();

orderRouter.post('/place-order', placeOrder);

orderRouter.get('/order-history', getOrderHistory);

orderRouter.post('/cancel-order', cancelOrder);

orderRouter.post('/update-order-status', updateOrderStatus);



export default orderRouter;