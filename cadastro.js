const cadastro = document.getElementById("cadastro")

cadastro.addEventListener('submit', evento =>{
    evento.preventDefault()

    const formData = new FormData(cadastro)
    const form = Object.fromEntries(formData)

     fetch(`https://chilling-spooky-superstition-9p4qq97g9wg395p5-8000.app.github.dev/users/${form.usuario}`, {
        headers: {
            "Content-Type": "Application/json",
            "Access-Control-Allow-Origin": "*"
        }}).then(data => {
            if (data.status == 404) {            
                    fetch("https://chilling-spooky-superstition-9p4qq97g9wg395p5-8000.app.github.dev/users/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "Application/json"
                        },
                        body: JSON.stringify(form)
                    }).then(data => data.json()).then(response => console.log(response)).then(alert("USUÁRIO CRIADO COM SUCESSO"))/*.then(window.location.replace('/'))*/
            } else if (data.status == 200){
                alert("Este nome de usuário já está em uso")
            }
        })

    
})


const login = document.getElementById("login")

login.addEventListener('submit', evento =>{
    evento.preventDefault()

    const formData = new FormData(login)
    const data = Object.fromEntries(formData)

    fetch(`https://chilling-spooky-superstition-9p4qq97g9wg395p5-8000.app.github.dev/users/${data.usuario}`, {
        headers: {
            "Content-Type": "Application/json",
            "Access-Control-Allow-Origin": "*"
        }}).then(data => data.json()).then(response => {
            console.log(response)
            if (response.detail == "User not found"){
                alert("Este usuário não existe")
            }else if (data.senha == response.senha) {

                //
                alert("logado com sucesso")
                /*.then(window.location.replace('/'))*/
            } else if(data.senha != response.senha){
                alert("Senha incorreta")
            }
            
        })
})