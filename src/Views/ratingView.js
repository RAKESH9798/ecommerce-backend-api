const Rating = require("../Models/ratingModel.js");
const productView = require("./productView.js");

async function createRating(req, user) {
    try {
        const product = await productView.findProductById(req.productId);
        console.log(product);
        const rating = new Rating({
            user: user._id,
            product: product._id,
            rating: req.rating,
            createdAt: new Date(),
        });

        await rating.save();

        return rating;
    } catch (error) {
        throw new Error(`Failed to create rating: ${error.message}`);
    }
}

async function getAllRating(productId) {
    try {
        const ratings = await Rating.find({ product: productId });
        return ratings;
    } catch (error) {
        throw new Error(`Failed to get ratings: ${error.message}`);
    }
}

module.exports = {
    createRating,
    getAllRating
};
