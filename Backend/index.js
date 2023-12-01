const express=require('express');
var cors=require('cors');
const app =express();
const port=process.env.PORT||5000;
app.use(express.json());
app.use(cors())
const connectToMongo=require('./db');
connectToMongo();
app.get('/',(req,res)=>{
    res.send("Hello world");
});
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port,()=>{
    console.log("app running at port",port);
});