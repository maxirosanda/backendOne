import { Router } from 'express'
import fs from "fs";
import path from "path";
import { basePath } from "../utils/basePath.js";
import { socketServer } from "../index.js";

const router = Router()

const users = []

router.get("/",(req,res)=>{
    res.json(users)
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

    const file = path.resolve(basePath + "/src/json/users.json");
    const users = JSON.parse(fs.readFileSync(file, "utf-8"));

    const user = {
        id,
        firstName,
        lastName,
        telephone,
        age
    }
    users.push(user)

    fs.writeFileSync(file, JSON.stringify(users));

    socketServer.emit("users", {type:"create",user})
    res.json({message:"Usuario agregado con exito"})
})

router.patch("/:id",(req,res)=>{
    const { id } = req.params
    const body = req.body
    res.json({id,...body})
})

router.delete("/:id",(req,res)=>{
    const {id} = req.params
    const file = path.resolve(basePath + "/src/json/users.json");
    const users = JSON.parse(fs.readFileSync(file, "utf-8"));
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.json({ message: "Usuario no encontrado" });
    }
    users.splice(users.indexOf(user), 1);
    fs.writeFileSync(file, JSON.stringify(users));
    socketServer.emit("users", {type:"delete",user})
    res.json({message:`el usuario de id ${id} fue eliminada de la base datos`})
})

export default router
