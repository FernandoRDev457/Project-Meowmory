function updateFeed() {
    var idUsuario = JSON.parse(sessionStorage.FICHASGATOS)[0].fkUsuario;

    fetch('/fichasGato/fichasGatoAll', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUserServer: idUsuario
        }),
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                sessionStorage.setItem('FICHAS_GATO_GERAL', `${JSON.stringify(resposta)}`)
                exibirPostagens()
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


function exibirPostagens() {
    document.getElementById("div_postagens").innerHTML = ''

    JSON.parse(sessionStorage.FICHAS_GATO_GERAL).forEach(item => {
        var statusCurtiu = ''
        if (item.statusCurtida == 1) {
            statusCurtiu = 'liked'
        }

        document.getElementById("div_postagens").innerHTML += `
                    <div class="post" id="${item.idFichaGato}">
                        <div class="title-usuario">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ48ylWlDv1YRFFEcqQ0DtPyPzCdvOE81q-BOyu2y87gzRKBDUZlZn0yMdemoHAk43tyoI&usqp=CAU">
                            <h2>${item.nome}</h2>
                        </div>
                        <div class="image-post">
                        </div>    
                        <div class="icons-actions-post">
                            <div class="icon heart">
                                <img class="btn_like ${statusCurtiu}" id="${item.idPostagem}" src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" alt="">
                                <p id="num_like">${item.totalCurtidas}</p>
                            </div>

                            <div class="icon coment">
                                <img class="btn_coment" id="${item.idPostagem}" src="https://cdn-icons-png.flaticon.com/512/1230/1230203.png" alt="">
                                <p>${item.totalComentarios}</p>
                            </div>
                        </div>
                    </div>
                    `
    });

    enviarCurtidaPost();


    var btn_coment = document.querySelectorAll('.btn_coment');
    var modal = document.querySelector('.modal');

    btn_coment.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.id = btn.id;
            modal.classList.add('active');
        })
    });


    var post = document.querySelectorAll('.post');

    post.forEach(post => {
        post.addEventListener('click', () => {

        })
    })

    enviarComentario()
}


//ENVIANDO CURTIDA
function enviarCurtidaPost() {
    var btn_likes = document.querySelectorAll('.btn_like');
    console.log(btn_likes)

    btn_likes.forEach(btn => {
        btn.addEventListener('click', () => {

            if (btn.classList[1] === 'liked') {
                console.log('Olar ja deu coração')
                rainHeartCat();
                return false;
            } else {
                btn.classList.add('liked')

                var icon = btn.closest('.btn_like').parentElement;

                var numLike = icon.querySelector('#num_like');
                var num = Number(numLike.textContent);

                num += 1;
                numLike.textContent = num;


                rainHeartCat();
                var idFichaGato;
                var idPostagem = btn.id;
                var idUser = sessionStorage.getItem('ID_USUARIO')
                var email = sessionStorage.getItem('EMAIL_USUARIO')

                JSON.parse(sessionStorage.FICHAS_GATO_GERAL).forEach(item => {
                    if (item.idPostagem == idPostagem) {
                        idFichaGato = item.idFichaGato;
                    }
                });

                fetch("/postagens/enviarCurtida", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idUserServer: idUser,
                        idFichaGatoServer: idFichaGato,
                        idPostagemServer: idPostagem,
                        emailServer: email,
                    }),
                })
                    .then(function (resposta) {
                        console.log("resposta: ", resposta);
                    })
                    .catch(function (resposta) {
                        console.log(`#ERRO: ${resposta}`);
                    });
            }

            return false;
        })
    })
}

//FAZENDO UM COMENTARIO
function enviarComentario(modal) {
    var modal = document.querySelector('.modal')
    var btn_send_coment = document.querySelector('#btn_enviar');

    btn_send_coment.addEventListener('click', () => {
        var idPost = modal.id;
        var idUser = sessionStorage.getItem('ID_USUARIO');
        var email = sessionStorage.getItem('EMAIL_USUARIO');
        var coment = input_comentario.value
        var idFichaGato;

        JSON.parse(sessionStorage.FICHAS_GATO_GERAL).forEach(item => {
            if (item.idPostagem == idPost) {
                idFichaGato = item.idFichaGato;
            }
        });

        fetch("/postagens/enviarComentario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idUserServer: idUser,
                idFichaGatoServer: idFichaGato,
                idPostagemServer: idPost,
                emailServer: email,
                comentServer: coment,
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);
                input_comentario.value = ''
                modal.classList.remove('active');
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    })


}