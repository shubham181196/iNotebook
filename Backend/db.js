require('dotenv').config();
// DB connection file 
const mongoose=require('mongoose');
const mongoURI=process.env.MONGO_URI


const connectToMongo=()=>{
    mongoose.connect(mongoURI)
    console.log("moongose connected");
}

module.exports=connectToMongo;