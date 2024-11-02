
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
let getRandomSongsArray = [
    '%25a%25', 'a%25', '%25a',
    '%25e%25', 'e%25', '%25e',
    '%25i%25', 'i%25', '%25i',
    '%25o%25', 'o%25', '%25o',
    '%25u%25', 'u%25', '%25u']
let getRandomSongs = getRandomSongsArray[Math.floor(Math.random()*getRandomSongsArray.length)];
let getRandomOffset = Math.floor(Math.random() * 999)
let url = `https://api.spotify.com/v1/search?query=${getRandomSongs}&offset=${getRandomOffset}&limit=1&type=${obj}&market=NL`;


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

    
    await feed(token)
    await artistas(token)

}

