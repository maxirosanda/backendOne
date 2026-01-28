const socket = io();

socket.on("users", (data) => {

    if (data.type === "create") {

    const formUser = document.createElement("form")
    formUser.id = `form-user-${data.user.id}`
    formUser.className = "container-card-user"

    formUser.innerHTML = `
      <label>Nombre</label>
      <input type="text" value="${data.user.firstName}" name="firstName">

      <label>Apellido</label>
      <input type="text" value="${data.user.lastName}" name="lastName">

      <label>Edad</label>
      <input type="number" value="${data.user.age}" name="age">

      <label>Telefono</label>
      <input type="text" value="${data.user.telephone}" name="telephone">

      <button class="btn-delete" type="button" data-id="${data.user.id}">
        Eliminar
      </button>
      <button class="btn-update" type="button" data-id="${data.user.id}">
        Actualizar
      </button>
    `

    containerCardsUser.appendChild(formUser)
  }

  if(data.type === "delete"){
    const formUser = document.getElementById(`form-user-${data.user.id}`)
    formUser.remove()
  }
});
