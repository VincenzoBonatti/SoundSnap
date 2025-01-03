const cadastro = document.getElementById("cadastro")

cadastro.addEventListener('submit', evento =>{
    evento.preventDefault()

    const formData = new FormData(cadastro)
    const form = Object.fromEntries(formData)

    fetch(`https://spotifyapi-hct0.onrender.com/users/${form.usuario}`, {
        headers: {
            "Content-Type": "Application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control" : "no-cache",
            "Accept" : "*/*",
            "Connection" : "Keep-Alive",
            "Accept-Encoding" : "gzip"
        }}).then(data => {
            if (data.status == 404) {            
                    fetch("https://spotifyapi-hct0.onrender.com/users/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "Application/json",
                            "Access-Control-Allow-Origin": "*",
                            "Cache-Control" : "no-cache",
                            "Accept" : "*/*",
                            "Connection" : "Keep-Alive",
                            "Accept-Encoding" : "gzip"
                        },
                        body: JSON.stringify(form)
                    })
                    .then(alert("USUÁRIO CRIADO COM SUCESSO"))
                    .then(localStorage.setItem("usuario", form.usuario))
                    .then(window.location.replace('/SoundSnap/'))
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

    fetch(`https://spotifyapi-hct0.onrender.com/users/${data.usuario}`, {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Cache-Control" : "no-cache",
            "Accept" : "*/*",
            "Connection" : "Keep-Alive",
            "Accept-Encoding" : "gzip"
        }}).then(data => data.json()).then(response => {
            if (response.detail == "User not found"){
                alert("Este usuário não existe")
            }else if (data.senha == response.senha) {


                localStorage.setItem("usuario", data.usuario);
                
                alert("logado com sucesso")
                window.location.replace('/SoundSnap/')
            } else if(data.senha != response.senha){
                alert("Senha incorreta")
            }
            
        })
})