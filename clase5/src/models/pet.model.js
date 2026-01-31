import mongoose, { Types } from "mongoose";

const petSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    specie:String, 
    age:Number, 
    profile:String,
    idUser:{
        type:Types.ObjectId,
        required:true
    }
})

export const petModel = mongoose.model("pets",petSchema)