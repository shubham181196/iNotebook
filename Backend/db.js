require('dotenv').config();
// DB connection file 
const mongoose=require('mongoose');
const mongoURI=process.env.MONGO_URI

const mongoose = require('mongoose');



const connectToMongo=()=>{
    mongoose.connect(mongoURI)
    console.log("moongose connected"),
    { useNewUrlParser: true, useUnifiedTopology: true }
}

module.exports=connectToMongo;