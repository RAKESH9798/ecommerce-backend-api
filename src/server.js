const app = require("./index.js");
const { connectDB } = require("./Configs/db.js");
const port = "5454";

app.listen(port, async () => {
    try {
        await connectDB();
        console.log("eCommerce application is connected to MongoDB database");
        console.log("eCommerce application is running on:", port);
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
        process.exit(1);
    }
});
