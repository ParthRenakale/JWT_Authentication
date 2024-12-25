const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require("../backend/models/userSchema")
const SECRET_KEY='secretkey';
//connect to express
const app=express()

//connect to mongoDB
const dbURI='mongodb+srv://root:root@cluster0.rmz2f.mongodb.net/UsersDB?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI)
.then(()=>{
  console.log("Connected to MongoDB");
})
.catch((error)=>{
  console.log("Error Connecting to MongoDB ",error)
})
//middleware
app.use(bodyParser.json());
app.use(cors());
//SCHEMA

//routes

//(USER REGISTRATION CREATION)
app.post('/register',async(req,res)=>{
  try{
    const {email,username,password}=req.body
    const hashedpassword=await bcrypt.hash(password,10)
    const newUser=new User({
      email:email,
      username:username,
      password:hashedpassword,
    })
    await newUser.save()
    res.status(201).json({message:"User created Successfully"})
  }catch(error){
    console.log("Error in creating user ",error);
    res.status(500).json({message:"Error creating User"})
  }
})
//GET REGISTERED USERS
app.get('/register',async (req,res)=>{
  try{
    const users=await User.find()
    res.status(201).json(users);
  }catch(error){
    console.log("Error in GET request ",error);
    res.status(500).json({message:"Error creating User"})
  }
})


//login
//post 

app.post('/login',async(req,res)=>{
  try{
    const {username,password}=req.body
    let u=await User.findOne({username:username})
    if(!u){
      res.status(401).json({message:"INVALID USERNAME"})
    }
    let isPassCorrect=await bcrypt.compare(password,u.password)
    if(!isPassCorrect){
      res.status(401).json({message:"INVALID PASSWORD"})
    }
    const token=jwt.sign({userId:u._id},SECRET_KEY,{expiresIn:'1hr'});
    res.json({message:'Login Successful!'})
  }catch(error){
    console.log("Error in LOGIN",error);
    res.status(500).json({message:"NO SUCH USER"})
  }
})



app.listen(3001,()=>{
  console.log("Server connected at 3001")
});
