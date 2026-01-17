const socket = io()
const formMessage = document.getElementById('formMessage')

formMessage.addEventListener('submit', async (e) => {
    e.preventDefault()
    const message = formMessage.message.value
    socket.emit("palabra-clave",{message})
    formMessage.reset()
})


socket.on("palabra-clave",data =>{
    alert(data.message);
})