require('dotenv').config();
var jwt = require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET;
fetchuser=async (req,res,next)=>{
    //GET THE USER FROM JWT TOKEN AND ADD IT TO REQ OBJECT
    const token=req.header('auth-token');
    
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try{
        
        const data =await jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    }catch(error){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
   
}

module.exports=fetchuser;