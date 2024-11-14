const cadastro = document.getElementById("cadastro")

cadastro.addEventListener('submit', evento =>{
    evento.preventDefault()

    const formData = new FormData(cadastro)
    const data = Object.fromEntries(formData)

    fetch("https://chilling-spooky-superstition-9p4qq97g9wg395p5-8000.app.github.dev/users/", {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(data)
    }).then(alert("USUÁRIO CRIADO COM SUCESSO")).then(window.location.replace('/'))
})


const login = document.getElementById("login")

login.addEventListener('submit', evento =>{
    evento.preventDefault()

    const formData = new FormData(login)
    const data = Object.fromEntries(formData)

    fetch(`https://chilling-spooky-superstition-9p4qq97g9wg395p5-8000.app.github.dev/users/${data.usuario}`, {
        headers: {
            "Content-Type": "Application/json",
            
        }}).then(data => data.json()).then(response => {
            if (data.senha == response.senha) {

                //
                alert("logado com sucesso").then(window.location.replace('/'))
            } else if(data.senha != response.senha){
                alert("Senha incorreta")
            }
        })
})