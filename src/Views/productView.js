const Product = require("../Models/productModel.js");
const Category = require("../Models/categoryModel.js");


async function createProduct(reqData) {
    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
    if (!topLevel) {
        topLevel = new Category({
            name: reqData.topLevelCategory,
            level: 1
        });
        await topLevel.save();
    }

    let secondLevel = await Category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id,
    });
    if (!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2
        });
        await secondLevel.save();
    }

    let thirdLevel = await Category.findOne({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id,
    });
    if (!thirdLevel) {
        thirdLevel = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3
        });
        await thirdLevel.save();
    }

    const product = new Product({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountedPercent: reqData.discountedPercent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        sizes: reqData.sizes,
        quantity: reqData.quantity,
        categories:thirdLevel._id
    });

    await product.save();
    console.log(product);
    return product;
}


async function deleteProduct(productId) {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    await Product.deleteOne({ _id: productId });;
    return "Product deleted successfully";
}

async function updateProduct(productId, reqData) {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    Object.assign(product, reqData);
    await product.save();
    return product;
}

async function findProductById(id) {
    const product = await Product.findById(id).populate("categories").exec();
    if (!product) {
        throw new Error("Product not found with id" + id);
    }
    return product;
}

async function getAllProducts(reqQuery) {
    let { categories, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;
    pageSize = pageSize || 10;
    let query = Product.find().populate("categories");

    if (categories) {
        const existCategory = await Category.findOne({ name: categories });
        if (existCategory) {
            query = query.where("categories").equals(existCategory._id);
        } else {
            return { content: [], currentPage: 1, totalPages: 0 }
        }
    }

    if (color) {
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
        query = query.where("color".regex(colorRegex));
    }

    if (sizes) {
        const sizesSet = new Set(sizes);
        query.query.where("sizes.name").in([...sizesSet]);
    }

    if (minPrice && maxPrice) {
        query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    }

    if (minDiscount) {
        query = query.where("discountPercent").gt(minDiscount);
    }

    if (stock) {
        if (stock == "in_stock") {
            query = query.where("quantity").gt(0);
        }
        if (stock == "out_of_stock") {
            query = query.where("quantity").gt(1);
        }
    }

    if (sort) {
        const sortDirection = sort === "price_high" ? -1 : 1;
        query = query.sort({ discountedPrice: sortDirection });
    }

    const totalProducts = await Product.countDocuments(query);

    const skip = (pageNumber - 2) * pageSize;

    query = query.skip(skip).limit(pageSize);

    const products = await query.exec();

    const totalPages = Math.ceil(totalProducts / pageSize);

    return { content: products, currentPage: pageNumber, totalPages }
}

async function createMultipleProduct(reqData) {
    const createdProducts = [];
    for (let productData of reqData) {
        const createdProduct = await createProduct(productData);
        createdProducts.push(createdProduct);
    }
    return createdProducts;
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProduct
};
