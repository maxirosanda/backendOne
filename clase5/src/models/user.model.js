import mongoose ,{ ObjectId } from "mongoose";


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    age:Number,
    email:{
        type:String,
        unique:true
    },
    pets:[ObjectId]
})

export const userModel =  mongoose.model("users",userSchema)