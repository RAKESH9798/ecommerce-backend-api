const express = require('express');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the eCommerce API' });
});

const authRoute = require("./Routes/authRoute.js");
app.use("/auth",authRoute);

const userRoute = require("./Routes/userRoute.js");
app.use("/api/users",userRoute);

const productRoute = require("./Routes/productRoute.js");
app.use("/api/products",productRoute);

const ratingRoute = require("./Routes/ratingRoute.js");
app.use("/api/ratings",ratingRoute);

const reviewRoute = require("./Routes/reviewRoute.js");
app.use("/api/reviews",reviewRoute);

const cartRoute = require("./Routes/cartRoute.js");
app.use("/api/cart",cartRoute);

const cartItemRoute = require("./Routes/cartItemRoute.js");
app.use("/api/cartitem",cartItemRoute);


const adminProductRoute = require("./Routes/adminProductRoute.js");
app.use("/api/admin/products",adminProductRoute);


const orderRoute = require("./Routes/OrderRoute.js");
app.use("/api/orders",orderRoute);

const adminOrderRoute = require("./Routes/adminOrderRoute.js");
app.use("/api/admin/orders",adminOrderRoute);

const paymentRoute=require("./Routes/paymentRoute.js");
app.use("/api/payments",paymentRoute);

module.exports = app;
