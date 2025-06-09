// ATUALIZANDO FEED
function updateFeed(specification) {
    if (JSON.parse(sessionStorage.FICHASGATOS)[0]?.fkUsuario) {
        var idUsuario = JSON.parse(sessionStorage.FICHASGATOS)[0].fkUsuario;
    } else {
        var idUsuario = JSON.parse(sessionStorage.ID_USUARIO);
    }

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
                exibirPostagens(specification, idUsuario)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// EXIBINDO POSTAGEM
function exibirPostagens(specification, idUsuario) {
    document.getElementById("div_postagens").innerHTML = '';
    var postAll = '';

    JSON.parse(sessionStorage.FICHAS_GATO_GERAL).forEach(item => {
        var statusCurtiu = '';


        if (item.statusCurtida == 1) {
            statusCurtiu = 'liked';
        }

        var post = `
            <div class="post" id="${item.idFichaGato}">
                <div class="title-usuario">
                    <img src="https://i.pinimg.com/564x/bd/cc/de/bdccde33dea7c9e549b325635d2c432e.jpg">
                    <h2>${item.nome}</h2>
                </div>
                <div class="image-post">
                <div class="base-profile-start">
                        <div class="profile-cat">
                            <img src="${item.fotoFelino}"
                                alt="">
                            <img src="../assets/componentes-img/moldura-cat.svg" alt="" class="moldura-cat">
                        </div>
                        <div class="info-cat">
                            <div class="info-data">
                                <label>HP:</label>
                                <img src="https://images.vexels.com/media/users/3/354131/isolated/preview/4fe7858f34cdd0cdba3ff384b80d246d-pixel-art-coracao-vermelho.png"
                                    alt="">
                                <img src="https://images.vexels.com/media/users/3/354131/isolated/preview/4fe7858f34cdd0cdba3ff384b80d246d-pixel-art-coracao-vermelho.png"
                                    alt="">
                                <img src="https://images.vexels.com/media/users/3/354131/isolated/preview/4fe7858f34cdd0cdba3ff384b80d246d-pixel-art-coracao-vermelho.png"
                                    alt="">
                                <img src="https://images.vexels.com/media/users/3/354131/isolated/preview/4fe7858f34cdd0cdba3ff384b80d246d-pixel-art-coracao-vermelho.png"
                                    alt="">
                                <img src="https://images.vexels.com/media/users/3/354131/isolated/preview/4fe7858f34cdd0cdba3ff384b80d246d-pixel-art-coracao-vermelho.png"
                                    alt="">
                                <img src="https://images.vexels.com/media/users/3/354131/isolated/preview/4fe7858f34cdd0cdba3ff384b80d246d-pixel-art-coracao-vermelho.png"
                                    alt="">
                                <img src="https://images.vexels.com/media/users/3/354131/isolated/preview/4fe7858f34cdd0cdba3ff384b80d246d-pixel-art-coracao-vermelho.png"
                                    alt="">
                            </div>
                            <div class="info-data">
                                <label>Nome:</label>
                                <p>${item.nomeFelino}</p>
                            </div>
                            <div class="info-data">
                                <label>Apelido:</label>
                                <p>${item.apelido}</p>
                            </div>
                            <div class="info-data">
                                <label>Raça:</label>
                                <p>${item.raca}</p>
                            </div>
                            <div class="info-data">
                                <label>Classe:</label>
                                <p>${item.classe}</p>
                            </div>
                        </div>
                        </div>
                    <div class="description-cat">
                        <label>Minha história:</label>
                        <textarea disabled>${item.descricao}</textarea>
                    </div>
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
        `;

        if (specification == 'like') {
            if (item.statusCurtida == 1) {
                postAll += post;
            }
        } else if (specification == 'posted') {
            if (item.fkUsuario == idUsuario) {
                postAll += post;
            }
        } else {
            postAll += post
        }


    });

    if (postAll == '') {
        if (specification == 'like') {
            postAll = 'Você não curtiu ainda nenhuma postagem :('
        }

        if (specification == 'posted') {
            postAll = 'Você ainda não publicou nenhuma postagem :('
        }
    }

    document.getElementById("div_postagens").innerHTML = postAll;

    enviarCurtidaPost();
    exibirHeart()

    const btn_coment = document.querySelectorAll('.btn_coment');
    const background = document.querySelector('.background-transparent');
    const modal = document.querySelector('.modal');
    const fieldComment = document.querySelector('.field-comment');

    btn_coment.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation(); //APRENDENDO A USAR O STOPPROPAGATION
            //ELE IMPEDE QUE O CLICK SUBA PARA O ELEMENTO PAI - O MODAL ou POST
            modal.id = btn.id;
            exibirDadosModal(btn.id);
            background.classList.add('active');
            modal.classList.add('active');
            fieldComment.classList.add('active');
            updateComment();
        });
    });

    background.addEventListener('click', (event) => {
        if (event.target === background) {
            background.classList.remove('active');
            modal.classList.remove('active');
            fieldComment.classList.remove('active');
        }
    });

    const post = document.querySelectorAll('.post');
    post.forEach(post => {
        post.addEventListener('click', () => {
            const btn_coment_post = post.querySelector('.btn_coment');
            modal.id = btn_coment_post.id;
            exibirDadosModal(btn_coment_post.id);
            background.classList.add('active');
            modal.classList.add('active');
            updateComment();
        });
    });

    enviarComentario();
    fecharComentario();
}

// ENVIANDO UMA CURTIDA
function enviarCurtidaPost() {
    const btn_likes = document.querySelectorAll('.btn_like');

    btn_likes.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation();

            pulseElement(btn)

            if (btn.classList.contains('liked')) {
                rainHeartCat();
                return false;
            }

            btn.classList.add('liked');

            var icon = btn.closest('.icon');
            var numLike = icon.querySelector('#num_like');
            let num = Number(numLike.textContent);
            numLike.textContent = ++num;

            rainHeartCat();

            var idPostagem = btn.id;
            var idUser = sessionStorage.getItem('ID_USUARIO');
            var email = sessionStorage.getItem('EMAIL_USUARIO');
            let idFichaGato;

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
                .then(() => updateFeed())
                .catch((resposta) => {
                    console.log(`#ERRO: ${resposta}`);
                });

            return false;
        });
    });
}

// FAZENDO UM COMENTARIO
function enviarComentario() {
    var modal = document.querySelector('.modal')
    var btn_send_coment = document.querySelector('#btn_enviar');

    btn_send_coment.addEventListener('click', () => {
        var idPost = modal.id;
        var idUser = sessionStorage.getItem('ID_USUARIO');
        console.log(idUser)
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
                updateComment()

                var fieldComment = document.querySelector('.field-comment');
                fieldComment.classList.remove('active')
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    })


}

// EXIBINDO MODAL
function exibirDadosModal(idPost) {
    var modal = document.querySelector('.modal');
    var btn_heart = modal.querySelector('.btn_like');
    var commet = modal.querySelector('.description');
    var name = modal.querySelector('.profile h3');
    var num_like = modal.querySelector('#num_like');
    var btn_coment = modal.querySelector('.btn_coment');

    JSON.parse(sessionStorage.FICHAS_GATO_GERAL).forEach(ficha => {
        if (idPost == ficha.idPostagem) {
            if (ficha.statusCurtida == 1) {
                btn_heart.classList.add('liked');
            } else {
                btn_heart.classList.remove('liked');
            }

            btn_heart.id = idPost;
            btn_coment.id = idPost;
            name.textContent = ficha.nome;
            commet.textContent = ficha.descricaoPost;
            num_like.textContent = ficha.totalCurtidas;
        }
    });

    curtirModal();
    exibirHeart();
    exibirDadosModalFicha(idPost);
    graphicWeb(idPost);

}

// CURTINDO VIA MODAL
function curtirModal() {
    const modal = document.querySelector('.modal');
    const btn_heart = modal.querySelector('.btn_like');
    const num_like = modal.querySelector('#num_like');

    btn_heart.addEventListener('click', (event) => {
        event.stopPropagation();
        pulseElement(btn_heart)

        if (btn_heart.classList.contains('liked')) {
            rainHeartCat();
            return false;
        }

        btn_heart.classList.add('liked');
        let num = Number(num_like.textContent);
        num_like.textContent = ++num;

        rainHeartCat();

        var idPostagem = btn_heart.id;
        var idUser = sessionStorage.getItem('ID_USUARIO');
        var email = sessionStorage.getItem('EMAIL_USUARIO');
        let idFichaGato;

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
        }).then(() => updateFeed())
            .catch((erro) => console.error("Erro ao curtir no modal", erro));
    });
}

// FECHANDO COMENTARIO
function fecharComentario() {
    const close = document.querySelector('#close-comment')
    var fieldComment = document.querySelector('.field-comment');

    close.addEventListener('click', () => {
        fieldComment.classList.remove('active');
    })
}

function updateComment() {
    var modal = document.querySelector('.modal');

    var idPost = modal.id;

    fetch('/postagens/pegarComentarios', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idPostServer: idPost
        }),
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                if (resposta)
                    sessionStorage.setItem('COMENTARIOS', JSON.stringify(resposta))
                exibirComentario()
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na captura dos comentarios ${error.message}`);
        });
}

function exibirComentario() {
    document.getElementById("div_comments").innerHTML = ''

    JSON.parse(sessionStorage.COMENTARIOS).forEach(item => {
        document.getElementById("div_comments").innerHTML += `
                    <div class="comment">
                        <div class="user">
                            <img src="https://i.pinimg.com/564x/bd/cc/de/bdccde33dea7c9e549b325635d2c432e.jpg" alt="">
                            <h3>${item.nome}</h3>
                        </div>

                        <div class="text">${item.comentario}</div>
                    </div>
                    `
    });
}