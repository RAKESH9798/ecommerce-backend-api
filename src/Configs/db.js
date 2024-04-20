
const mongoose = require('mongoose');

const mongodbURL = "mongodb+srv://Rakesh9798:yadav@cluster1.qzhujrr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

const connectDB=()=>{
    return mongoose.connect(mongodbURL);
}

module.exports={connectDB};
  
