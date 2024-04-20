const orderView = require("../Views/OrderView.js");

const createOrder = async (req, res) => {
    const user = await req.user;
    try {
        let createdOrder = await orderView.createOrder(user, req.body);
        return res.status(201).send(createdOrder);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const findOrderById = async (req, res) => {
    console.log(req.params.id);
    try {
        let foundOrder = await orderView.findOrderById(req.params.id);
        console.log(foundOrder);
        return res.status(200).send(foundOrder);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const orderHistory = async (req, res) => {
    const user = await req.user;
    console.log("user:",user);
    try {
        let history = await orderView.userOrderHistory(user._id);
        return res.status(200).send(history);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    createOrder,
    findOrderById,
    orderHistory
}
