const express=require('express');
const router=express.Router();
const {body,validationResult}=require('express-validator');
const User=require('../models/User')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET='shubhamIsAGoodPerson'
//ROUTE 1: creating a user using :POST "/api/auth/". Doesnt require auth
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password legnth less than 5' ).isLength({min:5})
    
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false,errors:errors.array()});
    }
   // check if user email already exist
   try{
        let user= await User.findOne({email:req.body.email}); // this returns a promise 
        // check if user is already there then  sending error bad req
        if(user){
            return res.status(400).json({success:false,error:"Sorry user with this email already exist"});
        }
        // else we will create a brand new user in db 
        const salt=await bcrypt.genSalt(10);
        secPass=await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name:req.body.name,
            password:secPass,
            email:req.body.email
        })
        // sending message after creating the user 
        const data={
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.status(200).json({success:true,"jwt_token":authToken,"message":"user created successfully!"});
   } catch(error){
    // this is to catch error if something goes wrong inside your db 
        console.log(error.message);
        res.status(500).json({success:false,message:"Some error occured"});
   }
    
})

// ROUTE 2:Authenticate a user using :POST "/api/auth/login". Doesnt require auth
router.post('/loginuser',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password can not be blank' ).exists()
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,error:"Please try to login with correct credentials"});
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({success:false,error:"Please try to login with correct credentials"});
        }
        
        const data={
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.status(200).json({success:true,"jwt_token":authToken,"message":"user login successfull!"});
        
    }catch(error){
        // this is to catch error if something goes wrong inside your db 
        console.log(error.message);
        res.status(500).json({success:false,message:"Interval server error"});
    }
})

// ROUTE 3:Get loggedin User Details using POST "/api/auth/getuser" login required
router.post('/getuser',fetchuser,async (req,res)=>{
try{
    console.log(req.user);
    const userId=req.user.id;
    const user =await User.findById(userId).select("-password");
    res.status(200).send(user);
}catch(error){
    // this is to catch error if something goes wrong inside your db 
    console.log(error.message);
    res.status(500).json({message:"Interval server error"});
}})
module.exports= router