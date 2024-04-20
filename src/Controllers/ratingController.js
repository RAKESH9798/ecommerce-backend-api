const ratingView = require("../Views/ratingView.js");

const createRating = async (req, res) => {
    const user =await req.user;
    try {
        const rating = await ratingView.createRating(req.body, user);
        return res.status(200).send(rating);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getAllRating = async (req, res) => {
    const productId = req.params.productId;
    try {
        const ratings = await ratingView.getAllRating(productId);
        return res.status(200).send(ratings);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    createRating,
    getAllRating
}
