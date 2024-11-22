

let carregar_mais = true
let gerar_token = false
let boris = 5

document.getElementById("pesquisa").addEventListener("submit", function name(e) {
    e.preventDefault()
})


async function artistas(token) {
    let a = document.getElementsByClassName("sugestao_art")
    for (let i = -1; i >= -1 * a.length; i--) {
        let artista = await get_rand(token, "artist")
        document.getElementById(i).innerHTML = `<p>${artista.artists.items[0].name}</p><a href=${artista.artists.items[0].external_urls.spotify} target="_blank"><img id="img" src= ${artista.artists.items[0].images[1].url}>`
    }
}



async function feed(token, index) {
    let a = document.getElementById("feed")
    for (let i = index; i < index + 5; i++) {
        var album = await get_rand(token, "album")
        let likes = Math.floor(Math.random() * 15000)
        
        a.innerHTML += `
        <div class="post">
            <a href="${`album.html?id=${album.albums.items[0].id}`}">
                    <img src=${album.albums.items[0].images[0].url} alt="">
                    <div class="descricao">
                        <div class="info">
                            <h1>${album.albums.items[0].name}</h1>
                            <div class="infos artista" ><p id="${i}">Artistas:</p></div>                       
                            <div class="infos">Musicas: <p>${album.albums.items[0].total_tracks}</p></div>
                            <div class="infos">Tipo: <p>${album.albums.items[0].album_type}</p></div>
                            <div class="infos">Laçamento(A/M/D): <p>${album.albums.items[0].release_date.replace(/-/g, "/")}</p></div>
                        </div>
            </a>
                            <div class="acoes">
                            <div class="like">
                                <button class="button dark">
                                    <div class="hand">
                                        <div class="thumb"></div>
                                    </div>
                                    <span>Like<span>d</span></span>
                                </button>

                                <p class="likes" aria-index="${i}">${likes}</p>
                            </div>
                            <div class="fav">
                                <button class="favorite-button" id="${album.albums.items[0].id}" onclick="fav_caller('${album.albums.items[0].id}')">
                                    <div class="icon">
                                        <div class="star"></div>
                                    </div>
                                    <span>Favorite</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        `


        for (let x = 0; x < album.albums.items[0].artists.length; x++) {
            if (x >= album.albums.items[0].artists.length - 1) {
                document.getElementById(i).innerHTML += "&nbsp" + album.albums.items[0].artists[x].name
            } else {
                document.getElementById(i).innerHTML += "&nbsp" + album.albums.items[0].artists[x].name + ","
            }
        }
        fav_animation()
    }
    
    like()
    gerar_token = false

}



function userReachedBottom() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    return scrollPosition >= documentHeight;
}

window.addEventListener('scroll', async () => {
    if (userReachedBottom() && gerar_token == false && carregar_mais == true) {
        gerar_token = true
        let token = await acess()
        await feed(token, boris)
        boris += 5
    }
});



async function mostrarResultadoPesquisaEmTela(data) {

    let a = document.getElementById("feed")
    let likes = Math.floor(Math.random() * 15000)
    if (!a) {
        throw new Error
    }


    for (let i = 0; i < data.length; i++) {


        a.innerHTML += `
    <div class="post">
                <a href="${`album.html?id=${data[i].id}`}">
                    <img src=${data[i].images[0].url} alt="">
                    <div class="descricao">
                        <div class="info">
                            <h1>${data[i].name}</h1>
                            <div class="infos artista" ><p id="${i}">Artistas:</p></div>                       
                            <div class="infos">Musicas: <p>${data[i].total_tracks}</p></div>
                            <div class="infos">Tipo: <p>${data[i].album_type}</p></div>
                            <div class="infos">Laçamento(A/M/D): <p>${data[i].release_date.replace(/-/g, "/")}</p></div>
                        </div>
            </a>
                        <div class="acoes">
                            <div class="like">
                                <button class="button dark">
                                    <div class="hand">
                                        <div class="thumb"></div>
                                    </div>
                                    <span>Like<span>d</span></span>
                                </button>
                                <p class="likes" aria-index="${i}">${likes}</p>
                                
                            </div>
                            <div class="fav">
                                <button class="favorite-button" id="${data[i].id}" onclick="fav_caller('${data[i].id}')">
                                    <div class="icon">
                                        <div class="star"></div>
                                    </div>
                                    <span>Favorite</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
`
        for (let x = 0; x < data[i].artists.length; x++) {
            if (x >= data[i].artists.length - 1) {
                document.getElementById(i).innerHTML += "&nbsp" + data[i].artists[x].name
            } else {
                document.getElementById(i).innerHTML += "&nbsp" + data[i].artists[x].name + ","
            }
        }
        like()
        fav_animation(data[i].id)
    }
    carregar_mais = false
}

function header() {
    user = document.getElementById("user")
    if (!localStorage.getItem("usuario")) {
        user.innerHTML = 
        `
        <a href="cadastro.html">
            <img src="user.png" alt="">
        </a>
        `
    } else if (localStorage.getItem("usuario")){
        user.innerHTML = 
        `
            <a href="${`perfil.html?usuario=${localStorage.getItem("usuario")}`}" class="logado">
                ${localStorage.getItem("usuario")}
            </a>
            <button onclick="deslogar()">Sair</button>
        `
    }
}  




function fav(id) {
    console.log(id)
    fetch(`https://spotifyapi-hct0.onrender.com/users/${localStorage.getItem("usuario")}/likes`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        },
        body:JSON.stringify({ album_id: id })                
    })
}

function unfav(id) {
    console.log(id)
    fetch(`https://spotifyapi-hct0.onrender.com/removelike/${localStorage.getItem("usuario")}/${id}`, {
        method: "DELETE",             
    })
}

function fav_caller(id) {

    let button = document.getElementById(id)

    if (!button.classList.contains("liked")) {
        button.classList.add("liked")
        fav(id)
    } else if(button.classList.contains("liked")){
        button.classList.remove("liked")
        unfav(id)
    }
}
