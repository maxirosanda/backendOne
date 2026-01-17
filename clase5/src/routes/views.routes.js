import { Router } from "express";

const router = Router()


router.get("/",(req,res)=>{
    const test = {
        name:"Hola"
    }
    res.render("index",test)
})

router.get("/users",(req,res)=>{
    const users = [
        { firstName: 'Juan', lastName: 'Pérez', age: 15, telephone: '11-3456-7890' },
        { firstName: 'María', lastName: 'Gómez', age: 34, telephone: '11-4567-1234' },
        { firstName: 'Carlos', lastName: 'Rodríguez', age: 41, telephone: '11-5678-2345' },
        { firstName: 'Lucía', lastName: 'Fernández', age: 25, telephone: '11-6789-3456' },
        { firstName: 'Diego', lastName: 'Martínez', age: 37, telephone: '11-7890-4567' },
        { firstName: 'Sofía', lastName: 'López', age: 29, telephone: '11-8901-5678' },
        { firstName: 'Matías', lastName: 'Díaz', age: 33, telephone: '11-9012-6789' },
        { firstName: 'Valentina', lastName: 'Suárez', age: 22, telephone: '11-1122-3344' },
        { firstName: 'Nicolás', lastName: 'Romero', age: 45, telephone: '11-2233-4455' },
        { firstName: 'Camila', lastName: 'Torres', age: 31, telephone: '11-3344-5566' },
        { firstName: 'Federico', lastName: 'Álvarez', age: 39, telephone: '11-4455-6677' },
        { firstName: 'Agustina', lastName: 'Ramos', age: 27, telephone: '11-5566-7788' },
        { firstName: 'Pablo', lastName: 'Molina', age: 48, telephone: '11-6677-8899' },
        { firstName: 'Florencia', lastName: 'Herrera', age: 24, telephone: '11-7788-9900' },
        { firstName: 'Sebastián', lastName: 'Castro', age: 36, telephone: '11-8899-0011' },
        { firstName: 'Natalia', lastName: 'Ortiz', age: 42, telephone: '11-9900-1122' },
        { firstName: 'Lucas', lastName: 'Vega', age: 26, telephone: '11-1010-2020' },
        { firstName: 'Carolina', lastName: 'Navarro', age: 35, telephone: '11-2020-3030' },
        { firstName: 'Gonzalo', lastName: 'Silva', age: 44, telephone: '11-3030-4040' },
        { firstName: 'Julieta', lastName: 'Ibarra', age: 30, telephone: '11-4040-5050' }
      ]
    const userUpdated = users.map(user =>{
        if(user.age >= 18){
            return {...user, isAdult:true}
        }
        return {...user, isAdult:false}
    })
    res.render("users",{users:userUpdated})
})
router.get("/pets",(req,res)=>{
    res.render("pets")
})

router.get("/messages",(req,res)=>{
    res.render("messages")
})
export default router