const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    res.send("appu")
})
app.listen(3000,()=>{
    console.log("Server start from 3000");
})