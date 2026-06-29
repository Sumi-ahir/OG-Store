import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const userSchema=mongoose.Schema({
    username:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    contact:{type:String,require:false},
    password:{type:String,require:function(){
        return !this.googleId;
    },select:false},
    role:{
        type:String,
        enum:['buyer','seller'],
        default:'buyer'
    },
    googleId:{
        type:String,
    }
})
// bcrypt password
userSchema.pre('save',async function(){
    if(!this.isModified('password'))return ;

    const hash=await bcrypt.hash(this.password,10);
    this.password=hash
    
})
// compare password
userSchema.methods.comparePassword=async function (password) {
    return await bcrypt.compare(password,this.password)
}
// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    { id: this._id },
    config.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const userModel=mongoose.model('user',userSchema);
export default userModel;



