const Cart = require("../Models/cartModel.js");
const Product = require("../Models/productModel.js");
const CartItem = require("../Models/cartItemModel.js");

async function createCart(user) {
    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findUserCart(userId) {
    try {
        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'cartItems',
            populate: { path: 'product' }
        });

        if (!cart) {
            throw new Error("Cart not found for the user");
        }

        const { totalPrice, totalDiscountedPrice, totalItem } = cart.cartItems.reduce((acc, cartItem) => {
            acc.totalPrice += cartItem.price * cartItem.quantity;
            acc.totalDiscountedPrice += cartItem.discountedPrice * cartItem.quantity;
            acc.totalItem += cartItem.quantity;
            return acc;
        }, { totalPrice: 0, totalDiscountedPrice: 0, totalItem: 0 });

        const discount = totalPrice - totalDiscountedPrice;

        return { ...cart.toObject(), totalPrice, totalDiscountedPrice, totalItem, discount };
    } catch (error) {
        throw new Error(error.message);
    }
}

async function addItemToCart(userId, req) {
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error(`Cart not found for user with ID: ${userId}`);
        }

        const product = await Product.findById(req.productId);
        if (!product) {
            throw new Error(`Product not found with ID: ${req.productId}`);
        }

        const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId });
        if (!isPresent) {
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                user: userId,
                price: product.price,
                size: req.size,
                discountedPrice: product.discountedPrice,
            });

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();
            console.log("Item added to cart succcessfuly");
            return createdCartItem;
        } else {
            throw new Error("Item already exists in cart");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createCart, findUserCart, addItemToCart };
