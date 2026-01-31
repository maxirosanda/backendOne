import { Router } from 'express'
import { uploader } from '../utils/configMulter.js'
import { petModel } from '../models/pet.model.js'
import { Types } from 'mongoose'
import path from 'path'

const router = Router()


router.get("/", async (req,res)=>{
    try {
        const pets = await petModel.find()
        res.json(pets)
    } catch (error) {
        res.json(error)
    }
})

router.get("/:id",async (req,res)=>{
    const { id } = req.params
    try {
        const pet = await petModel.findOne({_id:id})
        res.json([pet])
    } catch (error) {
        res.json(error)
    }
})

router.post("/",uploader.single("file"),async (req,res)=>{

    const {name, specie, age, idUser} = req.body

    if (!req.file) { //Si no existe req.file, significa que hubo un error al subir el archivo
        //queda en tus manos decidir si puede continuar con el proceso o no.
        return res.json({ status: "error", error: "No se pudo guardar la imagen" })
    }

    if(!name && typeof name !== "string"){
        return res.json({message:"el nombre de la mascota es invalido"})
    }

    if(!specie && typeof specie !== "string"){
        return res.json({message:"especie invalida"})
    }

    if(age <= 0 && age > 50){
        return res.json({message:"edad invalida"})
    }

    const relativePath = path
                            .relative(process.cwd(), req.file.path)
                            .replace(/\\/g, "/")
                            .replace(/^public\//, "");
    const newPet ={
        name,
        specie,
        age,
        profile:relativePath,
        idUser
    }

    try {
        const petCreated = await petModel.create(newPet)
        res.json(petCreated)

    } catch (error) {
        res.json(error)
    }
})

router.patch("/:id",async(req,res)=>{
    const { id } = req.params
    const {name,specie,age} = req.body
    try {
        const objectId = new Types.ObjectId(id)
        const petUpdated = await petModel.updateOne({_id:objectId},{name,specie,age})
        res.json(petUpdated)
    } catch (error) {
        res.json(error)
    }
    
})

router.delete("/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const objectId = new Types.ObjectId(id)
        const petUpdated = await petModel.deleteOne({_id:objectId})
        res.json(petUpdated)
    } catch (error) {
        res.json(error)
    }
})

export default router