function exibirDadosModalFicha(idPost) {
    const fichaGato = document.getElementById('ficha_gato')
    fichaGato.innerHTML = '';

    let mensagem = '';
    JSON.parse(sessionStorage.FICHAS_GATO_GERAL).forEach(fichas => {
        if (idPost == fichas.idPostagem) {
            dataStatus = tratarDados(fichas)
            console.log(dataStatus.atk)
            mensagem = `
                    <div class="base-profile-start">
                        <div class="profile-cat">
                            <img src="${fichas.fotoFelino}"
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
                            <div class="double-info">
                                <div class="info-data">
                                    <label>Nome:</label>
                                    <p>${fichas.nomeFelino}</p>
                                </div>
                                <div class="info-data">
                                    <label>Apelido:</label>
                                    <p>${fichas.apelido}</p>
                                </div>
                            </div>
                            <div class="double-info">
                                <div class="info-data">
                                    <label>Raça:</label>
                                    <p>${fichas.raca}</p>
                                </div>
                                <div class="info-data">
                                    <label>Nasc:</label>
                                    <p>${dataStatus.dtNasc}</p>
                                </div>
                            </div>
                            <div class="info-data">
                                <label>Classe:</label>
                                <p>${fichas.classe}</p>
                            </div>
                            <div class="description-cat">
                                <label>Minha história:</label>
                                <textarea disabled>${fichas.descricao}</textarea>
                            </div>
                        </div>
                    </div>
                    <div class="base-status">   
                        <div class="container-canva">
                            <canvas id="myRadarChart" width="80"></canvas>
                        </div>
                        <div class="container-base-status">
                                <h3>Status:</h3>

                                <div class="info-data">
                                    <label>ATK:</label>
                                    <div class="container-status">
                                        <div class="back-status"></div>
                                        <div class="bar-status atk" style="width: ${fichas.atk * 10}%"></div>
                                    </div>
                                    <p>
                                        ${dataStatus.atk} Dmg
                                        <img src="https://png.pngtree.com/png-vector/20230410/ourmid/pngtree-black-claws-vector-png-image_6698691.png" alt="">
                                    </p>
                                </div>

                                <div class="info-data">
                                    <label>DEF:</label>
                                    <div class="container-status">
                                        <div class="back-status"></div>
                                        <div class="bar-status def" style="width: ${fichas.def * 10}%"></div>
                                    </div>
                                    <p>${dataStatus.def} Esc🛡️</p>
                                </div>

                                <div class="info-data">
                                    <label>AGI:</label>
                                    <div class="container-status">
                                        <div class="back-status"></div>
                                        <div class="bar-status agi" style="width: ${fichas.agi * 10}%"></div>
                                    </div>
                                    <p>${dataStatus.agi} Spd👟</p>
                                </div>

                                <div class="info-data">
                                    <label>SONO:</label>
                                    <div class="container-status">
                                        <div class="back-status"></div>
                                        <div class="bar-status sleep" style="width: ${fichas.sono * 10}%"></div>
                                    </div>
                                    <p>${fichas.sono} lvl😴</p>
                                </div>

                                <div class="info-data">
                                    <label>FOME:</label>
                                    ${dataStatus.fome}
                                    <p>${fichas.fome} lvl😋</p>
                                </div>
                            </div>
                    </div>
               `
        }
    });

    fichaGato.innerHTML = mensagem;
}

function tratarDados(fichas) {
    let dataNasc = '';

    let data = new Date(fichas.dtNascimento)
    let mes = data.getMonth() + 1;

    if (mes < 9) {
        mes = '0' + mes;
    }

    let ano = data.getFullYear();
    dataNasc = `${mes}/${ano}`;

    // PARA CALCULAR O VALOR ESPECIFICO DE CADA ATRIBUTO DO STATUS
    const formula = 159 / 100;

    //ADICIONANDO PEIXES COM BASE A FOME
    let peixes = '';
    let contadorPeixe = 0

    for (let i = 0; i < fichas.fome - 1; i++) {
        contadorPeixe++;
        peixes += '<img src="https://i.pinimg.com/originals/33/9a/44/339a44b53ea2b351a99b1baf44567d3e.png" alt="">'
    }

    if (contadorPeixe == 0 || contadorPeixe < 9) {
        for (let index = 0; index < 9 - contadorPeixe; index++) {
            peixes += '<div style="width: 25px; height:25x"></div>'
        }

    }

    let dadosStatus = {
        //VALOR DE JOGO DO STATUS
        atk: parseInt((fichas.atk * 10) * formula),
        def: parseInt((fichas.def * 10) * formula),
        agi: parseInt((fichas.agi * 10) * formula),
        //QTD DE PEIXES
        fome: peixes,
        //DATA DE NASCIMENTO TRATADA
        dtNasc: dataNasc
    }

    return dadosStatus
}

function graphicWeb(idPost) {
    let dataStatus = ''
    JSON.parse(sessionStorage.FICHAS_GATO_GERAL).forEach(fichas => {
        if (idPost == fichas.idPostagem) {
            dataStatus = {
                atk: fichas.atk * 10,
                def: fichas.def * 10,
                agi: fichas.agi * 10,
                sleep: fichas.sono * 10
            }
        }
    });

    if (dataStatus != '') {
        const labels = ['ATK', 'DEF', 'AGI', 'SONO'];

        const data = {
            labels: labels,
            datasets: [{
                label: 'Status do Gato (%)',
                data: [dataStatus.atk, dataStatus.def, dataStatus.agi, dataStatus.sleep],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
            }]
        };

        const config = {
            type: 'radar',
            data: data,
            options: {
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }

        };

        new Chart(document.getElementById('myRadarChart'), config);
    }
}
