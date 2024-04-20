const cartItemView = require("../Views/cartItemView.js");

const findCartItemById=async(req,res)=>{
    try {
        const findCartItem = await cartItemView.findCartItemById(req.params.id);
        return res.status(200).send(findCartItem);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const updateCartItem = async (req, res) => {
    const user =await req.user;
    try {
        const updatedCartItem = await cartItemView.updateCartItem(user._id, req.params.id, req.body);
        return res.status(200).send(updatedCartItem);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const removeCartItem = async (req, res) => {
    const user = await req.user;
    try {
        await cartItemView.removeCartItem(user._id, req.params.id);
        return res.status(200).send("Cart item removed successfully");
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    findCartItemById,
    updateCartItem,
    removeCartItem
}
