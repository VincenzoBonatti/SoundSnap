

function cadastro(event) {
    event.preventDefault();


    var usuario = document.getElementById('input_usuario').value;
    var nome = document.getElementById('input_nome').value;
    var email = document.getElementById('input_email').value;
    var senha = document.getElementById('input_senha').value;

    const data = {
        id: 1,
        usuario,
        nome,
        email,
        senha
    }

    console.log('data=>', data)
   
}

function login(event) {
    event.preventDefault();

    var email = document.getElementById('input_login_email').value;
    var senha = document.getElementById('input_login_senha').value;

    data = {
        email,
        senha
    }

    console.log('data =>', data)
    
}