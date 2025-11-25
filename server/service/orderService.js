import OrderModel from '../model/orderModel.js';
import { getUserIdFromRequest } from '../helper/helper.js';

const getOrderHistoryService = async(req , res) =>{
    try{
        const userId = getUserIdFromRequest(req);
        const orders = await OrderModel.find({ userId: userId });
        return orders;
    }
    catch(error){
        throw new Error(error.message);
    }
}


const placeOrderService = async(req , res) =>{
    try{
        const userId = getUserIdFromRequest(req);
        const { productIds, totalAmount } = req.body;
        
        const newOrder = new OrderModel({
            userId: userId,
            productIds: productIds,
            totalAmount: totalAmount
        });

        await newOrder.save();
        return newOrder;
    }
    catch(error){
        throw new Error(error.message);
    }
}      


const cancelOrderService = async(req , res) =>{
    try{
        const userId = await getUserIdFromRequest(req);
        const { orderId } = req.body;

        const order = await OrderModel.findOne({ _id: orderId, userId: userId });
        if (!order) {
            throw new Error('Order not found for user');
        }

        if(order.orderStatus === 'cancelled'){
            throw new Error('Order is already cancelled');
        }

        if(order.orderStatus === 'shipped' || order.orderStatus === 'delivered'){
            throw new Error('Order cannot be cancelled as it is already shipped or delivered');
        }

        order.orderStatus = 'cancelled';
        await order.save();
        return order;
    }
    catch(error){
        throw new Error(error.message);
    }
}

const updateOrderStatusService = async(req , res) =>{
    try{
        const { orderId, status } = req.body;

        const order = await OrderModel.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }

        order.orderStatus = status;
        await order.save();
        return order;
    }
    catch(error){
        throw new Error(error.message);
    }
}

export {
    placeOrderService,
    getOrderHistoryService, 
    cancelOrderService,
    updateOrderStatusService
}