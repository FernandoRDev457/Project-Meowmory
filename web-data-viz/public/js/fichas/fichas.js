function updateFichas() {
    var idUsuario = JSON.parse(sessionStorage.FICHASGATOS)[0].fkUsuario;
    var nome = JSON.parse(sessionStorage.FICHASGATOS)[0].nome;
    var email = sessionStorage.getItem('EMAIL_USUARIO')

    fetch('/fichasGato/fichasGatoUser', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario,
            nomeServer: nome,
            emailServer: email
        }),
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                sessionStorage.setItem('FICHASGATOS', `${JSON.stringify(resposta)}`)
                exibirFichas()
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function exibirFichas() {
    document.getElementById("div_fichas").innerHTML = '';

    JSON.parse(sessionStorage.FICHASGATOS).forEach(item => {
        document.getElementById("div_fichas").innerHTML += `
                <div class="ficha" id=${item.idFichaGato}>
                    <div class="img-ficha" style="background: url('https://media.tenor.com/DE72MznZMqgAAAAM/cat.gif') no-repeat center center/cover;"></div>
                    <p>${item.nomeFelino}</p>
                </div>
                `;
    });

    document.getElementById("div_fichas").innerHTML += `
                <a href="./cadastroFichaGato.html">
                    <div class="add-ficha">
                        <p>Adicione um Novo Felino</p>
                        <div class="img-ficha" style="background: url('https://static.vecteezy.com/system/resources/previews/027/939/852/non_2x/white-cat-head-flat-style-cartoon-doodle-element-illustration-free-png.png') no-repeat center center/cover;"></div>
                        <div class="plus-add">+</div>
                    </div>
                </a>
                `;
}