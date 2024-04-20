const cartView = require("../Views/cartView");

const createCart = async (req, res) => {
    const user = await req.user;
    try {
        const cart = await cartView.createCart(user._id);
        return res.status(201).send(cart);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const findUserCart = async (req, res) => {
    const user = await req.user;
    try {
        const cart = await cartView.findUserCart(user._id);
        console.log("found", cart);
        return res.status(200).send(cart);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const addItemToCart = async (req, res) => {
    const user = await req.user;
    try {
        const cartItem = await cartView.addItemToCart(user._id, req.body);
        return res.status(200).send(cartItem);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    createCart,
    findUserCart,
    addItemToCart
}
