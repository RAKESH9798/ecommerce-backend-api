const CartItem = require("../Models/cartItemModel.js");
const userView = require("../Views/userView.js");


async function updateCartItem(userId, cartItemId, cartItemData) {
    try {
        const item = await findCartItemById(cartItemId);
        if (!item) {
            throw new Error("Cart item not found: ", cartItemId);
        }
        const user = await userView.getUserByIdentifier(userId);
        if (!user) {
            throw new Error("User not found: ", userId);
        }
        if (user._id.toString() === userId.toString()) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity*item.product.discountedPrice;
            const updatedCartItem = await item.save();
            return updatedCartItem;
        } else {
            throw new Error("You can't update this cart item");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function removeCartItem(userId, cartItemId) {
    const cartItem = await findCartItemById(cartItemId);
    console.log("cartItem",cartItem);
    const user = await userView.getUserByIdentifier(userId);

    console.log("user",user);

    if (user._id.toString() === cartItem.user.toString()) {
        return await CartItem.findByIdAndDelete(cartItemId);
    } else {
        throw new Error("You can't remove another user's item");
    }
}

async function findCartItemById(cartItemId) {
    const cartItem = await CartItem.findById(cartItemId).populate("product");
    if (cartItem) {
        return cartItem;
    } else {
        throw new Error("Cart item not found with id", cartItemId);
    }
}

module.exports = {
    updateCartItem,
    removeCartItem,
    findCartItemById
}
