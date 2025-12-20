import crypto from 'crypto'
import {promises as fsPromises} from 'fs'



const writePetsFile = async (pets) => {
    try {
        await fsPromises.writeFile("pets.json",JSON.stringify(pets),"utf-8")
        console.log("save pets")
    } catch (error) {
        console.log(error)
    }
}

const getPets = async () => {
    try {
        const data = await fsPromises.readFile("pets.json","utf-8")
        const parsed = JSON.parse(data,null,2)
        return parsed
    } catch (error) {
        if(error.code === "ENOENT"){
            await fsPromises.writeFile("pets.json",[],"utf-8")
            return []
        }
        console.log(error)
    }
}

/* CRUD */

const addPet = async (newPet) => {
    try {
        const pets = await getPets()

        if(pets.length !== 0){
            const exists = pets.some(pet =>    pet.email === newPet.email 
                                            && pet.name === newPet.name)
            if(exists){
                console.log("exists pet")
                return null
            }
        }
  
        const id = crypto.randomUUID()
        pets.push({id,...newPet})
        await writePetsFile(pets)
    } catch (error) {
        console.log(error)
    }
}

const updatePet = async (id,updatePet) => {  
    try {
        const pets = await getPets()
        const exists = pets.some(pet => pet.id === id )

        if(!exists){
            console.log("not exists pet")
            return null
        }

        const updatePets = pets.map(pet => {

            if(pet.id == id) return {...pet,...updatePet}
            return pet
        })
        
        await writePetsFile(updatePets)
    } catch (error) {
        console.log(error)
    }
}

const deletePet = async (id) =>{
    try {
        const pets = await getPets()
        const exists = pets.some(pet => pet.id === id )

        if(!exists){
            console.log("not exists pet")
            return null
        }
        const petsFilted = pets.filter(pet => pet.id !== id)
        await writePetsFile(petsFilted)

    } catch (error) {
        console.log(error)
    }
}

const getPet = async (id) => {
    try {
        const pets = await getPets()
        const pet = pets.find(item => item.id === id )
        if(!pet){
            return {}
        }
        return pet

    } catch (error) {
        console.log(error)
    }
}

const init = async () => {
   //await addPet({ name: "Pitu", email:"jose@hotmail.com", age: 3, specie: "dog" })
   //await addPet({ name: "Simba", email:"maria@hotmail.com", age: 2, specie: "cat" })
   //await updatePet("29497098-d975-4568-8912-a1cfc9e4e711",{name:"filulay"})
   await deletePet("29497098-d975-4568-8912-a1cfc9e4e7e4")
   const pet = await getPet("29497098-d975-4568-8912-a1cfc9e4e7e4")
   console.log(pet)
}

init()
