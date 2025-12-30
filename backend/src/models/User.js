//name,email pass phone no 
import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength:[50],
        minlength:[3],
        trim: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        minlength:[8],
        trim: true,
        required: true
    },
    role:{
        type: String,
        enum:['admin','user'],
        default: 'user'
    },
    phoneno: {
        type: String,
        required: true,
        unique: true
    },
    active:{
        type: Boolean,
        default: true
    }
},{timestamp: true})

//Hash Password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrpyt.hash(this.password,12);
    next();
})

//Compare
userSchema.methods.comparePass = async function(enteredPass) {
    return await bcrypt.compare(enteredPass,this.password);
}

//Generate Token


const User = mongoose.model("User",userSchema);
export default User;
