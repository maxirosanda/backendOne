import { Router } from "express";
import { basePath } from "../utils/basePath.js";
import fs from "fs";
import path from "path";


const router = Router()



router.get("/users",(req,res)=>{
    const file = path.resolve(basePath + "/src/json/users.json");
    const users = JSON.parse(fs.readFileSync(file, "utf-8"));
    res.render("users",{users})
})

router.get("/users-realtime",(req,res)=>{
    const file = path.resolve(basePath + "/src/json/users.json");
    const users = JSON.parse(fs.readFileSync(file, "utf-8"));
    res.render("users-realtime",{users})
})

export default router