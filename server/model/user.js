import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId:String,
    name:String,
    email:String,
    image:String
},{timestamps:true});

 const userdb = new mongoose.model("user",userSchema);

 export default userdb;

