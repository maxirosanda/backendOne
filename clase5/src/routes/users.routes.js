import { Router } from 'express'
import {userModel} from '../models/user.model.js'
import mongoose, { Types } from 'mongoose'

const router = Router()


router.get("/",async(req,res)=>{
    try {
        const users = await userModel.find()
        res.json(users)
    } catch (error) {
        res.json(error)
    }
})

router.get("/:id",async(req,res)=>{
    const { id } = req.params
    try {
        const user = await userModel.findOne({_id:id})
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

router.post("/",async (req,res)=>{
    const {firstName, lastName,age, telephone} = req.body

    if(!firstName && typeof firstName !== "string"){
        return res.json({message:"el nombre del usuario es invalido"})
    }

    if(!lastName && typeof lastName !== "string"){
        return res.json({message:"apellido invalido"})
    }

    if(age <= 18 && age > 110){
        return res.json({message:"edad invalida"})
    }

    const user = {
        firstName,
        lastName,
        age,
        telephone,
        pets:[]
    }

    try {
        const userCreated= await userModel.create(user)
        res.json(userCreated)
    } catch (error) {
        if(error.code === 11000){
            return res.json({message:"User duplicated"})
        }
        res.json(error)
    }
})

router.patch("/add-pet/:idUser",async(req,res)=>{
    const {idUser} = req.params
    const {idPet} = req.body
    try {
        const objectIdPet = new Types.ObjectId(idPet)
        const objectIdUser = new Types.ObjectId(idUser)
        const userUpdated = await userModel.findByIdAndUpdate(
            objectIdUser,
            {
              $addToSet: { pets: objectIdPet },
            },
            { new: true }
          );
          res.json(userUpdated)

    } catch (error) {
       res.json(error) 
    }
})

router.patch("/:id",async (req,res)=>{
    const { id } = req.params
    const {firstName, lastName, age, telephone} = req.body
    try {
        const objectId = new  mongoose.Types.ObjectId(id)
        const userUpdated = await userModel.updateOne({_id:objectId},{firstName,lastName,age,telephone})
        res.json(userUpdated)
    } catch (error) {
        console.log(error)
        res.json(error)
    }

})

router.delete("/:id",async (req,res)=>{
    const {id} = req.params
    try {
        const userDeleted = await userModel.deleteOne({_id:id})
        res.json(userDeleted)
    } catch (error) {
        res.json(error)
    }
})

export default router
