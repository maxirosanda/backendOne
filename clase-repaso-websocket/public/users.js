const formUser = document.getElementById("form-user")

formUser.addEventListener("submit", async (e) => {
  e.preventDefault()

  const formData = new FormData(formUser)

  const user = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    age: Number(formData.get("age")),
    telephone: formData.get("telephone")
  }

  try {
    await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
  } catch (error) {
    console.log(error)
  }

  formUser.reset()
})

const containerCardsUser = document.getElementById("container-cards-user")

containerCardsUser.addEventListener("click",async (e)=>{
    const target = e.target
    if(target.classList.contains("btn-delete")){
        const id = target.dataset.id
        try {
            await fetch(`http://localhost:8080/api/users/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })
        } catch (error) {
            console.log(error)
        }
    }
      if (target.classList.contains("btn-update")) {
    const id = target.dataset.id
    const formUpdate = document.getElementById(`form-user-${id}`)
    console.log(formUpdate)
    const formData = new FormData(formUpdate)
    console.log(formData)
    const user = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      age: Number(formData.get("age")),
      telephone: formData.get("telephone")
    }

    try {
      await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      })
    } catch (error) {
      console.log(error)
    }
  }
   
})


