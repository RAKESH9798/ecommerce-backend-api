const Address = require("../Models/addressModel.js");
const Order = require("../Models/OrderModel.js");
const cartView = require("../Views/cartView.js");
const OrderItem = require("../Models/orderItemModel.js");

async function createOrder(user, shippedAddress) {
    try {
        let address;
        if (shippedAddress._id) {
            let existingAddress = await Address.findById(shippedAddress._id);
            address = existingAddress;
        } else {
            address = new Address(shippedAddress);
            address.user = user;
            await address.save();
            user.address.push(address);
            await user.save();
        }
        console.log("address:",address);

        const cart = await cartView.findUserCart(user._id);
        console.log("cart:",cart);

        const orderItems = [];
        for (const item of cart.cartItems) {
            const orderItem = new OrderItem({
                price: item.price,
                product: item.product._id,
                quantity: item.quantity,
                size: item.size,
                user: item.user._id,
                discountedPrice: item.discountedPrice,
            });
            const createdOrderItem = await orderItem.save();
            orderItems.push(createdOrderItem);
        }
        console.log("orderItems:", orderItems);


        const createdOrder = new Order({
            user,
            orderItems,
            totalPrice: cart.totalPrice,
            totalDiscountedPrice: cart.totalDiscountedPrice,
            totalItem: cart.totalItem,
            shippingAddress: address,
        });
        console.log("createdOrder:",createdOrder);

        const savedOrder = await createdOrder.save();
        return savedOrder;
    } catch (error) {
        throw new Error(error.message);
    }
}


async function placedOrder(orderId) {
    try {
        const order = await findOrderById(orderId);
        order.orderStatus = "PLACED";
        order.paymentDetails.status = "COMPLETED";
        return await order.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

async function confirmedOrder(orderId) {
    try {
        const order = await findOrderById(orderId);
        order.orderStatus = "CONFIRMED";
        return await order.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

async function shippedOrder(orderId) {
    try {
        const order = await findOrderById(orderId);
        order.orderStatus = "SHIPPED";
        return await order.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

async function deliveredOrder(orderId) {
    try {
        const order = await findOrderById(orderId);
        order.orderStatus = "DELIVERED";
        return await order.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

async function canceledOrder(orderId) {
    try {
        const order = await findOrderById(orderId);
        order.orderStatus = "CANCELLED";
        return await order.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findOrderById(orderId) {
    console.log(orderId);
    try {
        const order = await Order.findById(orderId);
            // .populate("user")
            // .populate({ path: "orderitems", populate: { path: "product" } })
            // .populate("shippingAddress");
        return order;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function userOrderHistory(userId) {
    try {
        const orders = await Order.find({ user: userId, orderStatus: "PENDING" });
            // .populate({ path: "orderItems", populate: { path: "product" } })
            // .lean();
        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllOrders() {
    try {
        return await Order.find({ orderStatus: "PENDING" });
            // .populate({ path: "orderItems", populate: { path: "product" } })
            // .lean();
    } catch (error) {
        throw new Error(error.message);
    }
}

async function deletedOrder(orderId) {
    try {
        const order = await findOrderById(orderId);
        await Order.findByIdAndDelete(order);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createOrder,
    placedOrder,
    confirmedOrder,
    shippedOrder,
    deliveredOrder,
    canceledOrder,
    findOrderById,
    userOrderHistory,
    getAllOrders,
    deletedOrder
};
