const mongoose=require('mongoose');
const {Schema}=mongoose
const userSchema=new Schema ({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
// first arg is model name and second is schema used to generate the model
module.exports=mongoose.model('user',userSchema);