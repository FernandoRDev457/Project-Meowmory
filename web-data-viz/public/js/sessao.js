// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email != null && nome != null) {
        document.getElementById("user_profile").textContent = nome;
        document.getElementById("email_profile").textContent = email;
    } else {
        window.location = "../login.html";
    }
}

function abreviarText(texto) {

    if (texto.length)
        for (let i = 0; i < texto.length; i++) {
            const element = array[i];

        }
}

function limparSessao() {
    sessionStorage.clear();
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
    div_blocked_back.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        div_blocked_back.style.display = "none";
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

