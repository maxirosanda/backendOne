
const value = 9 ** 4
//console.log(value)

const text = "Hola Mundo , soy maxi"

const textLowerCase = text.toLowerCase()

const exits = textLowerCase.includes("hola")
//console.log(exits)

const userName = "maxi"

/*
if(userName === "pedro" || userName === "pepe" || userName === "hector"){
    console.log("es usuario")
}else{
    console.log("no es usuario")
}*/


const userNames = ["pedro","pepe","hector","marcelo"]

if(userNames.includes(userName)){
    //console.log("es usuario")
}else{
    //console.log("no es usuario")
}

const pet = {
    name: "pitu",
    age:13,
}

const petKeys = Object.keys(pet)
//console.log(petKeys)
const petValues = Object.values(pet)
//console.log(petValues)

const petEntries = Object.entries(pet)
//console.log(petEntries)

const productsDatabase = {
    "92bc3c7d-b93f-44f3-b38a-11ff4fc4f280":{
        title:"jdfhsufhsd",
        price:13000
    },
    "92bcas3d-b93f-44f3-b38a-11ff4fc4f280":{
        title:"fsdfsdfsf",
        price:23000
    }
}

const products = Object.entries(productsDatabase).map(product => {
    return {
        id: product[0],
        ...product[1]
    }
})


//console.log(products)



const  openModule = async  () => {

    if(true){
        try {
            const calculadora = await import("./calculadora.js")
            //console.log(calculadora("+",12,34,56))

        } catch (error) {
            //console.log(error)
        }
    }
}

openModule()

const arr = [1, 2, [3, 4, [5, 6]]]

const arrFlat = arr.flat(Infinity)
//console.log(arrFlat)

const emailExample = "      maxi_rosanda@hotmail.com             "
const emailTrim = emailExample.trim()
//console.log(emailTrim)

const number = 0

const result = number || "error en calculo" // es falso : undefined null NaN 0 ""
const resultTwo = number ?? "error en calculo" // es falso : undefined null

//console.log(resultTwo)


class Car {
    #id = crypto.randomUUID()
    name
    model

    constructor(name,model){
        this.name = name
        this.model = model
    }

    getId () {
        return this.#id
    }

    updateId (){
        this.#id = crypto.randomUUID()
    }

}


const carOne = new Car("Corsa",2015)
//console.log(carOne.getId())
carOne.updateId()
//console.log(carOne.getId())


const getProducts = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto")
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}



//getProducts()

const send = document.getElementById("send")
const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const email = document.getElementById("email")
const password = document.getElementById("password")

send.addEventListener("click",()=>{


    const user = {
        firstName:firstName.value,
        lastName:lastName.value,
        password:password.value,
        email:email.value
    }
    console.log(user)
})


firstName.addEventListener("input",()=>{
    if(firstName.value.length >= 12){
        firstName.value = firstName.value.slice(0,-1)
        console.log("superaste el maximo")
    }

    const regex = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+$/;

    if(!regex.test(firstName.value)){
        firstName.value = firstName.value.slice(0,-1)
        console.log("caracter invalido")
    }
})
