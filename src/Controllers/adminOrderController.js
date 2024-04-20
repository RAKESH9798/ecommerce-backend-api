const orderView = require("../Views/OrderView.js");

const getAllOrders=async(req,res)=>{
    try {
        const orders=await orderView.getAllOrders();
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const confirmedOrder=async(req,res)=>{
    try {
        const orderId=req.params.orderId;
        const orders=await orderView.confirmedOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const shippedOrder=async(req,res)=>{
    try {
        const orderId=req.params.orderId;
        const orders=await orderView.shippedOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const deliveredOrder=async(req,res)=>{
    try {
        const orderId=req.params.orderId;
        const orders=await orderView.deliveredOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const canceledOrder=async(req,res)=>{
    try {
        const orderId=req.params.orderId;
        const orders=await orderView.canceledOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const deletedOrder=async(req,res)=>{
    try {
        const orderId=req.params.orderId;
        const orders=await orderView.deletedOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

module.exports={
    getAllOrders,
    confirmedOrder,
    shippedOrder,
    deliveredOrder,
    canceledOrder,
    deletedOrder
}