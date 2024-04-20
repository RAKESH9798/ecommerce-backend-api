const productView = require("../Views/productView.js");

const createProduct = async (req, res) => {
    try {
        const product = await productView.createProduct(req.body);
        console.log(product);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productView.deleteProduct(productId);
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productView.updateProduct(productId, req.body);
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const findProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productView.findProductById(productId);
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await productView.getAllProducts(req.query);
        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const createMultipleProduct = async (req, res) => {
    try {
        await productView.createMultipleProduct(req.body);
        return res.status(201).send({ message: "Products created successfully" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    createMultipleProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById
}
