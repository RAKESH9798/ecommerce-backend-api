const Review = require("../Models/reviewModel.js");
const productView = require("./productView.js");

async function createReview(req, user) {
    try {
        const product = await productView.findProductById(req.productId);
        console.log("Found review product: ",product);
        const review = new Review({
            user: user._id,
            product: product._id,
            review: req.review,
            createdAt: new Date(),
        });

        await review.save();
        return review;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllReview(productId) {
    try {
        const product = await productView.findProductById(productId);
        return await Review.find({ product: productId }).populate("user");
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createReview,
    getAllReview
};
