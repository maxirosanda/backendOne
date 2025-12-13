// ============================================================================
// Objeto person con una propiedad name y un método getName que usa this
// ============================================================================

const person = {
    name:"Maxi",
    getName: function () {
      return this.name
    }
}

// ============================================================================
// Función productName: crea un "estado" privado con getter y setter
// ============================================================================

const productName = (initial) => {
     
    let value = initial

    const getValue = () => {
        return value
    }

    const setValue = (newValue) => {
        if(typeof newValue === "string"){
            if(newValue.length <= 100){
                value = newValue
            }
        }
    }

    return [getValue, setValue]

}

const [getProduct,setProduct] = productName("Heladera")


// ============================================================================
// Variable global (entorno superior)
// ============================================================================
const valueThree = 12

// Muestra el valor en el entorno global
console.log("entorno propio " + valueThree)


// ============================================================================
// Función funcionGenerica: demuestra cierre (closure) y scope de bloque
// ============================================================================
const funcionGenerica = () => {
    // Accede a valueThree desde dentro de la función (scope exterior)
    console.log("entorno funcion hija " + valueThree)

    // Variable local de la función
    const valueIfFunction = 77
    console.log(valueIfFunction)

    // ------------------------------------------------------------------------
    // Bloque if dentro de la función (scope de bloque)
    // ------------------------------------------------------------------------
    if (true) {
        // Nueva variable con el mismo nombre, pero SOLO dentro de este bloque
        const valueIfFunction = 55
        console.log(valueIfFunction)

        // Sigue pudiendo acceder a valueThree porque está en el scope exterior
        console.log("if dentro de la funcion " + valueThree)
    }
}


// ============================================================================
// Bloque if en el entorno global
// ============================================================================
if (true) {
    // También puede acceder a valueThree porque es una variable global
    console.log("entorno if " + valueThree)
}


// ============================================================================
// Llamada a la función para ejecutar su código
// ============================================================================
funcionGenerica()


// ============================================================================
// Objeto pet y formas de interpolar valores en strings
// ============================================================================
const pet = {
    name: "Pitu",
    age: 12
}

// Concatenación clásica con +
console.log("Mi perro se llama " + pet.name + "tiene una edad de " + pet.age + "años")

// Template string (más legible y moderna)
console.log(`Mi perro se llama ${pet.name} tiene una edad de ${pet.age} años`)


class User {
    name = ""
    age = 0
    #password = ""
    constructor(name, age, password){
        this.name = name
        this.age = age
        this.#password = password
    }

    checkPassword(pwd) {
        return this.#password === pwd
    }

}

const userOne = new User("Maxi",38, "121212")
const userTwo = new User("Jose",48, "111122")
console.log(userOne.name)
console.log(userOne.age)
console.log(userOne.password)
console.log(userOne.checkPassword("121212"))


// products-cleaning.js

const cleaningProducts = [
    {
      id: 1,
      title: "Detergente Líquido para Vajilla 750 ml",
      descripcion: "Detergente concentrado para lavar platos, remueve grasa difícil y cuida tus manos.",
      price: 1800,
      stock: 120,
      category: "Cocina"
    },
    {
      id: 2,
      title: "Lavandina Concentrada 1 L",
      descripcion: "Lavandina desinfectante para pisos, baños y superficies en general.",
      price: 950,
      stock: 200,
      category: "Desinfección"
    },
    {
      id: 3,
      title: "Limpiador Multiuso Gatillo 500 ml",
      descripcion: "Limpiador multiuso en pulverizador, ideal para mesadas, mesas y muebles.",
      price: 1500,
      stock: 80,
      category: "Multiuso"
    },
    {
      id: 4,
      title: "Limpiavidrios con Amoníaco 500 ml",
      descripcion: "Limpiador para vidrios y espejos, deja brillo sin vetas.",
      price: 1600,
      stock: 60,
      category: "Vidrios"
    },
    {
      id: 5,
      title: "Desinfectante en Aerosol 360 ml",
      descripcion: "Desinfectante en aerosol para ambientes y superficies, elimina el 99.9% de bacterias.",
      price: 2300,
      stock: 50,
      category: "Desinfección"
    },
    {
      id: 6,
      title: "Jabón en Polvo para Ropa 800 g",
      descripcion: "Jabón en polvo para lavarropas y lavado a mano, para ropa blanca y de color.",
      price: 2200,
      stock: 90,
      category: "Ropa"
    },
    {
      id: 7,
      title: "Suavizante para Ropa 900 ml",
      descripcion: "Suavizante líquido que deja la ropa perfumada y suave al tacto.",
      price: 1900,
      stock: 100,
      category: "Ropa"
    },
    {
      id: 8,
      title: "Desengrasante Concentrado 500 ml",
      descripcion: "Desengrasante potente para hornos, campanas y azulejos de cocina.",
      price: 2100,
      stock: 70,
      category: "Cocina"
    },
    {
      id: 9,
      title: "Limpiador de Pisos Aromatizante 1 L",
      descripcion: "Limpiador líquido para pisos, deja perfume duradero y brillo.",
      price: 1700,
      stock: 140,
      category: "Pisos"
    },
    {
      id: 10,
      title: "Limpiador para Baño Antisarro 500 ml",
      descripcion: "Remueve sarro, jabón y suciedad de inodoros, bachas y duchas.",
      price: 2000,
      stock: 65,
      category: "Baño"
    },
    {
      id: 11,
      title: "Desodorante para Inodoro en Pastilla",
      descripcion: "Pastilla para tanque de inodoro, limpia y perfuma en cada descarga.",
      price: 850,
      stock: 180,
      category: "Baño"
    },
    {
      id: 12,
      title: "Limpiador de Madera 500 ml",
      descripcion: "Limpiador especial para muebles y pisos de madera, realza el brillo natural.",
      price: 1950,
      stock: 55,
      category: "Muebles"
    },
    {
      id: 13,
      title: "Limpiador de Acero Inoxidable 300 ml",
      descripcion: "Ideal para heladeras, hornos y piletas de acero, elimina manchas y huellas.",
      price: 2100,
      stock: 40,
      category: "Cocina"
    },
    {
      id: 14,
      title: "Desinfectante para Pisos con Amonio Cuaternario 1 L",
      descripcion: "Solución desinfectante para uso domiciliario, mascotas y alto tránsito.",
      price: 2500,
      stock: 75,
      category: "Desinfección"
    },
    {
      id: 15,
      title: "Limpia Alfombras y Tapizados 500 ml",
      descripcion: "Elimina manchas y suciedad en alfombras, sillones y tapizados.",
      price: 2400,
      stock: 45,
      category: "Tapizados"
    },
    {
      id: 16,
      title: "Limpiador Crema para Cocina y Baño 500 ml",
      descripcion: "Crema abrasiva suave para remover suciedad difícil sin rayar.",
      price: 1850,
      stock: 85,
      category: "Multiuso"
    },
    {
      id: 17,
      title: "Desodorante Ambiental en Aerosol 360 ml",
      descripcion: "Aerosol perfumado para ambientes, neutraliza malos olores.",
      price: 1600,
      stock: 110,
      category: "Ambientes"
    },
    {
      id: 18,
      title: "Paño de Microfibra Multiuso",
      descripcion: "Paño reutilizable para limpieza de vidrios, muebles y pantallas.",
      price: 600,
      stock: 200,
      category: "Accesorios"
    },
    {
      id: 19,
      title: "Esponjas Abrasivas Pack x 3",
      descripcion: "Esponjas dobles para cocina, una cara suave y otra abrasiva.",
      price: 900,
      stock: 160,
      category: "Accesorios"
    },
    {
      id: 20,
      title: "Guantes de Látex para Limpieza Talle M",
      descripcion: "Guantes resistentes para proteger las manos en tareas de limpieza.",
      price: 1300,
      stock: 130,
      category: "Accesorios"
    }
  ];
  
// ============================================================================
// BUSCAR UN PRODUCTO POR ID (find)
// ============================================================================
const findProduct = cleaningProducts.find(item => item.id === 19)
console.log(findProduct)
// Devuelve el PRIMER producto cuyo id sea 19
// Si no lo encuentra, devuelve undefined


// ============================================================================
// VERIFICAR SI EXISTE ALGÚN PRODUCTO CON ESE TÍTULO (some)
// ============================================================================
const someProduct = cleaningProducts.some(
  product => product.title === "Guantes de Látex para Limpieza Talle M"
)
console.log(someProduct)
// Devuelve true si AL MENOS UN producto tiene exactamente ese título
// Si ninguno cumple la condición, devuelve false


// ============================================================================
// FILTRAR PRODUCTOS POR PRECIO MAYOR O IGUAL A 1600 (filter)
// ============================================================================
const filterProduct = cleaningProducts.filter(product => product.price >= 1600)
console.log(filterProduct)
// Devuelve un NUEVO array con todos los productos cuyo price >= 1600
// Si ninguno cumple, devuelve un array vacío


// ============================================================================
// FILTRAR PRODUCTOS EXCLUYENDO UNA CATEGORÍA (Accesorios) (filter)
// ============================================================================
const productTwo = cleaningProducts.filter(product => product.category !== "Accesorios")
console.log(productTwo)
// Devuelve todos los productos cuya categoría NO sea "Accesorios"


// ============================================================================
// CREAR UN NUEVO ARRAY SOLO CON title Y price (map)
// ============================================================================
const productTitlePrice = cleaningProducts.map(product => {
  return {
    title: product.title,
    price: product.price
  }
})

console.log(productTitlePrice)
// Devuelve un array nuevo donde cada elemento es un objeto reducido:
// { title: ..., price: ... }


// ============================================================================
// AUMENTAR EL PRECIO UN 10% A LOS PRODUCTOS CON price >= 1500 (map)
// ============================================================================
const product10 = cleaningProducts.map(product => {
  // Si el precio es mayor o igual a 1500, devolvemos una COPIA del objeto
  // pero con el precio incrementado en un 10%
  if (product.price >= 1500) {
    return { ...product, price: product.price * 1.1 }
  }
  // Si no cumple la condición, devolvemos el producto original sin cambios
  return product
})

console.log(product10)
// IMPORTANTE: map SIEMPRE devuelve un NUEVO array.
// Pero OJO: cuando devolvés `product` directamente, es la MISMA referencia
// que en el array original. Cuando usás `{ ...product, ... }` sí creás un objeto nuevo.


