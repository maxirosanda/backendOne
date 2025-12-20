import express from 'express'
import { PetManager } from './petManager.js'

const app = express()

app.use(express.json())

//GET responde con informacion pets [] 

app.get("/pets",async (__,res)=>{
    try {

        const petManager = new PetManager("pets.json")
        const pets = await petManager.getPets()
        res.json(pets)

    } catch (error) {
        res.json({message:error.message})
    }
})

app.get("/pets/:id",async(req,res)=>{
    
    try {

        const {id} = req.params
        const petManager = new PetManager("pets.json")
        const petFound = await petManager.getPet(id)
        res.json(petFound)
        
    } catch (error) {
        res.json({message:error.message})
    }

})

//POST desde el cliente queremos crear un recurso ej: agregar una pet

app.post("/pets",async (req,res)=>{

    try {
        const body = req.body

        if(!body.name || typeof body.name !== 'string') {
            res.json({message:"name required"})
            return
        }
        if(!body.specie || typeof body.specie !== 'string' ) {
            res.json({message:"specie required"})
            return
        }
        if(!body.age || typeof Number(body.age) !== 'number') {
            res.json({message:"age required"})
            return
        }    
        if(!body.email) {
            res.json({message:"email required"})
            return
        }

        const petManager = new PetManager("pets.json")
        const newPet = {
            name:body.name.toLowerCase(),
            specie:body.specie.toLowerCase(),
            age: Number(body.age),
            email:body.email.toLowerCase()
        }
        const pet = await petManager.addPet(newPet)
        if(!pet){
            res.json({message:"pet exists"})
            return
        }
        res.json({message:"add pet"})
    } catch (error) {
        res.json({message:error.message})
    }
})

//PATCH o PUT desde el cliente quiero actualizar un recurso ej: actualizar una pet

app.patch("/pets/:id",async (req,res)=>{

    try {
        const { id } = req.params
        const body = req.body

        if(body.name && typeof body.name !== 'string') {
            res.json({message:"string"})
            return
        }
        if(body.specie && typeof body.specie !== 'string' ) {
            res.json({message:"string"})
            return
        }
        if(body.age && typeof Number(body.age) !== 'number') {
            res.json({message:"number"})
            return
        }    


        const petManager = new PetManager("pets.json")
        const petUpdated = {}

        if(body.name) {
            petUpdated.name = body.name.toLowerCase()
            const petFound = await petManager.getPet(id)
            const petByEmail = await petManager.getPetsByEmail(petFound.email)

            const exist = petByEmail.some(pet => pet.name === body.name)
            if(exist){
                res.json({message:"ese nombre de mascota ya existe para ese email"})
                return
            }
        }

        if(body.specie){
            petManager.specie = body.specie.toLowerCase()
        }

        if(body.age){
            petManager.age = Number(body.age)
        }

        

        const pet = await petManager.updatePet(id,petUpdated)
        if(pet === "pet not exists"){
            res.json({message:"pet not exists"})
            return
        }
        res.json({message:"pet updated"})
    } catch (error) {
        res.json({message:error.message})
    }
})

//DELETE desde el cliente quiero borrar un recurso ej: borrar mascota
app.delete("/pets/:id",async (req,res)=>{

   try {
    const { id } = req.params

    const petManager = new PetManager("pets.json")

    const response = await petManager.deletePet(id)
    if(!response){
        res.json({message:"pet not exist"})
        return
    }
    res.json({message:"pet updated"})
   } catch (error) {
     res.json({message:error.message})
   }
})




app.listen(8080,()=> console.log("server in port 8080"))