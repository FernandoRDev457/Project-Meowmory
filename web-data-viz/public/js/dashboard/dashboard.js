const nome = sessionStorage.NOME_USUARIO;
const idUser = sessionStorage.ID_USUARIO;
const email = sessionStorage.EMAIL_USUARIO;

const kpis = document.querySelectorAll('#kpi_value');

function dadosGraphicUser() {
    fetch(`/dashboard/dadosGraphicUser/${email}/${idUser}/${nome}/`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                let dados = resposta.dataGraphic;
                const vetorMeses = [];

                for (let i = 1; i <= 12; i++) {
                    //APRENDENDO A USAR O FIND
                    //O FIND ESTÁ BUSCANDO O NÚMERO DOS MÊS QUE VEM DO FOR (PARECIDO COM O INCLUDES)
                    //CASO O FIND ACHE, ELE PEGA O VALOR DO DADO ({qtd_usuario: X, mes: x})
                    //CASO NÃO ACHE, ELE DEVOLVE UM VALOR UNDEFINED
                    let mesExistente = dados.find(d => d.mes === i);

                    var qtd_usuario = 0

                    //AQ ELE VALIDA SE A VARIAVEL EXISTE E TEM VALOR, PARA REGISTRAR O VALOR TRAZIDO DO BANCO
                    if (mesExistente) {
                        qtd_usuario = mesExistente.qtd_usuario;
                    }

                    vetorMeses.push({
                        mes: i,
                        qtd_usuario: qtd_usuario
                    });
                }

                graphicUser(vetorMeses);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
}

function dadosGraphicPost() {
    fetch(`/dashboard/dadosGraphicPost/${email}/${idUser}/${nome}/`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                let dados = resposta.dataGraphic;
                const vetorMeses = [];

                for (let i = 1; i <= 12; i++) {
                    //APRENDENDO A USAR O FIND
                    //O FIND ESTÁ BUSCANDO O NÚMERO DOS MÊS QUE VEM DO FOR (PARECIDO COM O INCLUDES)
                    //CASO O FIND ACHE, ELE PEGA O VALOR DO DADO ({qtd_postagem: X, mes: x})
                    //CASO NÃO ACHE, ELE DEVOLVE UM VALOR UNDEFINED
                    let mesExistente = dados.find(d => d.mes === i);

                    var qtd_postagem = 0

                    //AQ ELE VALIDA SE A VARIAVEL EXISTE E TEM VALOR, PARA REGISTRAR O VALOR TRAZIDO DO BANCO
                    if (mesExistente) {
                        qtd_postagem = mesExistente.qtd_postagem;
                    }

                    vetorMeses.push({
                        mes: i,
                        qtd_postagem: qtd_postagem
                    });
                }

                graphicPost(vetorMeses);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
}

function dadosKpi() {
    fetch(`/dashboard/dadosGraphicKpis/${email}/${idUser}/${nome}/`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                let data = resposta.dataGraphic;

                kpis[0].innerHTML = data[0].qtd_usuario
                kpis[1].innerHTML = data[0].qtd_curtidas
                kpis[2].innerHTML = data[0].qtd_postagem
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
}

function updateDadosDash() {
    dadosGraphicPost()
    dadosGraphicUser()
    dadosKpi()
}