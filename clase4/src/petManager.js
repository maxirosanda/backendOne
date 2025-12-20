import crypto from 'crypto'
import {promises as fsPromises} from 'fs'

export class PetManager {
    constructor(filePath){
        this.filePath = filePath
    }

    async #writePetsFile(pets) {
        try {
            await fsPromises.writeFile(this.filePath,JSON.stringify(pets),"utf-8")
            console.log("save pets")
        } catch (error) {
            console.log(error)
        }
    }

    async getPets() {
        try {
            const data = await fsPromises.readFile(this.filePath,"utf-8")
            const parsed = JSON.parse(data,null,2)
            return parsed
        } catch (error) {
            if(error.code === "ENOENT"){
                await fsPromises.writeFile(this.filePath,[],"utf-8")
                return []
            }
            console.log(error)
        }
    }

    async getPetsByEmail(email){
        try {
            const data = await fsPromises.readFile(this.filePath,"utf-8")
            const parsed = JSON.parse(data,null,2)
            const petByEmail = parsed.filter(pet => pet.email === email)
            return petByEmail
        } catch (error) {
            console.log(error)
        }
    }

    async addPet (newPet) {
        try {
            const pets = await this.getPets()
    
            if(pets.length !== 0){
                const exists = pets.some(pet =>    pet.email.toLowerCase()  === newPet.email.toLowerCase() 
                                                && pet.name.toLowerCase()  === newPet.name.toLowerCase() )
                if(exists){
                    console.log("exists pet")
                    return null
                }
            }
      
            const id = crypto.randomUUID()
            pets.push({id,...newPet})
            await this.#writePetsFile(pets)
            return {id,...newPet}
        } catch (error) {
            console.log(error)
        }
    }

    async updatePet(id,updatePet) {  
        try {
            const pets = await this.getPets()
            const exists = pets.some(pet => pet.id === id )
    
            if(!exists){
                console.log("not exists pet")
                return "pet not exists"
            }
    
            const updatePets = pets.map(pet => {
    
                if(pet.id == id) return {...pet,...updatePet}
                return pet
            })
            
            await this.#writePetsFile(updatePets)
        } catch (error) {
            console.log(error)
        }
    }

    
    async deletePet(id){
        try {
            const pets = await this.getPets()
            const exists = pets.some(pet => pet.id === id )
    
            if(!exists){
                console.log("not exists pet")
                return null
            }
            const petsFilted = pets.filter(pet => pet.id !== id)
            await this.#writePetsFile(petsFilted)
    
        } catch (error) {
            console.log(error)
        }
    }
    
    async getPet(id) {
        try {
            const pets = await this.getPets()
            const pet = pets.find(item => item.id === id )
            if(!pet){
                return {}
            }
            return pet
    
        } catch (error) {
            console.log(error)
        }
    }


}
