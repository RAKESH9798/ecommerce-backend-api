const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    level:{
        type:Number,
        required:true,
    },
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories",
    }
})

const Category = mongoose.model("categories",categorySchema);
module.exports=Category;

