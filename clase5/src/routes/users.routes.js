import { Router } from 'express'

const router = Router()

const users = []

router.get("/",(req,res)=>{
    res.json(users)
})

router.get("/:id",(req,res)=>{
    const { id } = req.params
    res.json({message:`el id es: ${id}`})
})

router.post("/",(req,res)=>{
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

    const id = crypto.randomUUID()

    users.push({
        id,
        firstName,
        lastName,
        telephone,
        age,
        pets:[]
    })

    res.json({message:"Usuario agregado con exito"})
})

router.patch("/:id",(req,res)=>{
    const { id } = req.params
    const body = req.body
    res.json({id,...body})
})

router.delete("/:id",(req,res)=>{
    const {id} = req.params
    res.json({message:`el usuario de id ${id} fue eliminada de la base datos`})
})

export default router
