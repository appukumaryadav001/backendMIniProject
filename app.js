const express = require("express");
const app = express();
const userModel = require("./models/user");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.get("/",(req,res)=>{
    res.render("index")
})

app.post('/register', async (req,res)=>{
    const {username , email , password, name, age} = req.body;

    const existUser = await userModel.findOne({email});
    if(existUser) return res.status(500).send("user already registered");

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password, salt , async (err, hash)=>{
            const user = await userModel.create({
                name,
                username,
                age,
                email,
                password:hash
            });
             
          const token =   jwt.sign({email:email,userId: user._id}, "appukumaryadav");

          res.cookie("token",token);
          res.send("User registered successfull");

        })
    });


})
app.listen(3000,()=>{
    console.log("Server start from 3000");
})