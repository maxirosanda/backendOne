import { Router } from 'express'
import { uploader } from '../utils/configMulter.js'

const router = Router()

const pets = []

router.get("/",(req,res)=>{
    res.json(pets)
})

router.get("/:id",(req,res)=>{
    const { id } = req.params
    res.json({message:`el id es: ${id}`})
})

router.post("/",uploader.single("file"),(req,res)=>{
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

    const id = crypto.randomUUID()

    pets.push({
        id,
        name,
        specie,
        age,
        profile:req.file.path,
        idUser
    })

    res.json({message:"mascota agregada con exito"})
})

router.patch("/:id",(req,res)=>{
    const { id } = req.params
    const body = req.body
    res.json({id,...body})
})

router.delete("/:id",(req,res)=>{
    const {id} = req.params
    res.json({message:`la mascota de id ${id} fue eliminada de la base datos`})
})

export default router