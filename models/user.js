const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/miniproject");

const userSchema = new mongoose.Schema({
   username:{type:String},
   name:{type:String},
   age:{type:Number},
   email:{type:String},
   password:{String},
   posts:[
      {
         type:mongoose.Types.ObjectId,
         ref:"Post"
      }
   ]
},{timestamps:true});


module.exports = mongoose.model("User",userSchema);