const cadastro = document.getElementById("cadastro")

cadastro.addEventListener('submit', evento =>{
    evento.preventDefault()

    const formData = new FormData(cadastro)
    const data = Object.fromEntries(formData)

    fetch("http://127.0.0.1:8000/users/", {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(data)
    }).then(alert("USUÁRIO CRIADO COM SUCESSO")).then(window.location.replace('/'))
})