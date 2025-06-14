// sessão
function validarSessao() {
    validarFuncao()
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email != null && nome != null) {
        document.getElementById("user_profile").textContent = abreviarText(nome);
        document.getElementById("email_profile").textContent = abreviarText(email);
    } else {
        window.location = "../login.html";
    }
}

function abreviarText(texto) {
    var new_text = texto;

    if (texto.length > 18) {
        new_text = ''
        for (let i = 0; i < 18; i++) {
            new_text += texto[i];
        }

        new_text += '...'
    }

    return new_text;
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
    div_blocked_back.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        div_blocked_back.style.display = "none";
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

function validarFuncao() {
    const funcao = sessionStorage.FUNCAO;
    console.log(funcao)
    const linkSide = document.getElementById('link_sc');

    if (funcao == "adminMeowSupremo") {
        linkSide.innerHTML = `
            <a href="./dashboard.html">
                <div class="side-links">
                    <i class="fa-solid fa-chart-line"></i>
                    <p>Desempenho da Plataforma</p>
                </div>
            </a>`

        linkSide.style.visibility = 'visible';
    }
}

