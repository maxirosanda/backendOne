const crearMascota = document.getElementById('crearMascota')

crearMascota.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(crearMascota)
    try {
        fetch("http://localhost:8080/api/pets",{
            method:"POST",
            body: formData
        })
        
        console.log("mascota creada")
        crearMascota.reset()
    } catch (error) {
        console.log(error)
    }   
})