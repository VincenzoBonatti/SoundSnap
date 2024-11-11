async function acess() {
    let c_id = "c39f13e6b0b9496882f544f1a9456d7a"
    let c_sct = "b819c1e4cca44124bd66cbc9b5e74e79"
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {"content-type": "application/x-www-form-urlencoded", },
        body: new URLSearchParams({
            grant_type: 'client_credentials', 
            client_id: c_id, 
            client_secret: c_sct 
        }),
      });
    let data = response.json()


    return data
}



async function get_rand(token, obj) {

const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  

const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
let randomSearch = '';
  

switch (Math.round(Math.random() * 2)) {
    case 0:
        randomSearch = randomCharacter + '%25';
    break;
    case 1:
        randomSearch = '%25' + randomCharacter + '%25';
    break;
    case 2:
        randomSearch = '%25' + randomCharacter;
}


let getRandomOffset = Math.floor(Math.random() * 999)
let url = `https://api.spotify.com/v1/search?query=${randomSearch}&offset=${getRandomOffset}&limit=1&type=${obj}&market=NL`;


    const result = fetch(url, {
        headers: {'Authorization': "Bearer " + token.access_token}
    }).then(data => {
        return data.json()
    }).then(response =>{
        return response
    })
    let response = await result

  
    return response
}


async function main() {
    let token = await acess()

    
    await artistas(token)
    await feed(token, 0)

}

async function album_main() {
    let token = await acess()

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
        
    await album(token, id)
}



let resultado_pesquisa = []

async function searchSpotify(event) {

    document.getElementById("feed").innerHTML = "";
    document.getElementById("descubra_id").innerHTML = "";

    try {
        
           
            const {access_token} = await acess();  
            if(!access_token) {
                return
            }

            const query = await  document.getElementById('input_pesq').value;

            if(!query){
                return
            }

            
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist,album,track&limit=10`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                },
                });
                
                if (!response ) {
                    throw new Error
                }

                const data = await response.json();

                console.log('data =>', data)
                

                const result = await data?.artists?.items; 
                    resultado_pesquisa = await result;

                // console.log('resultado_pesquisa =>', resultado_pesquisa)
                
                
                await mostrarResultadoPesquisaEmTela(resultado_pesquisa)
    
    }catch(error) {
        console.log(error)
        
    }
  }


 async function mostrarResultadoPesquisaEmTela(data) {
  
        if(data.length > 0) {
      
            let a = document.getElementById("feed")

            if(!a){
                throw new Error
            }
            

            data.forEach(item => {
            
                
            a.innerHTML +=`
                <div class="post">
                            <img src=${item.images.length > 0 ? item.images[0].url : ''} alt="">
                            <div class="descricao">
                                <div class="info">
                                    <h1>${item.name}</h1>
                                    <div class="infos artista" ><p id="${item.name}">Artistas:</p></div>                       
                                    <div class="infos">Musicas: <p>${item.name}</p></div>
                                    <div class="infos">Tipo: <p>${item.name}</p></div>
                                    <div class="infos">Laçamento(A/M/D): <p>${item.name}</p></div>
                                </div>
             
                                    <div class="acoes">
                                    <div class="like">
                                        <button class="button dark">
                                            <div class="hand">
                                                <div class="thumb"></div>
                                            </div>
                                            <span>Like<span>d</span></span>
                                        </button>
        
                                        
                                    </div>
                                    <div class="fav">
                                        <button class="favorite-button">
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
            })



        }else {
            console.log('erro ao mostrar resultado da pesquisa')
        }

}


 

  

  

  