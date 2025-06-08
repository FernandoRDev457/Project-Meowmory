function updateFichas() {
    var idUsuario = ''
    var nome = ''

    console.log(sessionStorage.ID_USUARIO);


    if (JSON.parse(sessionStorage.FICHASGATOS)[0]?.fkUsuario) {
        idUsuario = JSON.parse(sessionStorage.FICHASGATOS)[0].fkUsuario;
    } else {
        idUsuario = sessionStorage.ID_USUARIO;
    }

    if (JSON.parse(sessionStorage.FICHASGATOS)[0]?.nome) {
        nome = JSON.parse(sessionStorage.FICHASGATOS)[0].nome;
    } else {
        nome = sessionStorage.NOME_USUARIO;
    }

    console.log(nome)

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
                console.log(resposta)
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
                    <div class="img-ficha" style="background: url(${item.fotoFelino}) no-repeat center center/cover;"></div>
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

function publicarFicha() {
    if (JSON.parse(sessionStorage.FICHASGATOS)[0]?.fkUsuario) {
        var idUsuario = JSON.parse(sessionStorage.FICHASGATOS)[0].fkUsuario;
    } else {
        var idUsuario = JSON.parse(sessionStorage.ID_USUARIO);
    }

    var email = sessionStorage.getItem('EMAIL_USUARIO')
    var idFicha = select_fichas.value
    var textPublicacao = text_comentario.value;

    if (idFicha == '' || textPublicacao == '') {
        alert('Preencha todos os campos para publicar');
    } else if (idFicha == 'semRegistro') {
        alert('Você já publicou todas suas fichas')
    } else {
        fetch('/fichasGato/publicarFicha', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idUsuarioServer: idUsuario,
                idFichaServer: idFicha,
                textPublicacaoServer: textPublicacao,
                emailServer: email
            }),
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    updateFichas()
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
    }
}