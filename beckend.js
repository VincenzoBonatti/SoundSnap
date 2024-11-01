async function acess() {
    let c_id = "d716d3ad629f4ec6adc4d2cb764aba1d"
    let c_sct = "aeaf719a8dc742af9182269374bbb7a9"
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

async function teste(token) {
    const result = fetch("https://api.spotify.com/v1/albums/4wExFfncaUIqSgoxnqa3Eh", {
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

    let result = await teste(token)

    displayer(result)

    return result
}

