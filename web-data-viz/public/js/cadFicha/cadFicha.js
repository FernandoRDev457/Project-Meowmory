const cadFichaPart1 = document.querySelector('.container-part1');
const cadFichaPart2 = document.querySelector('.container-part2');


function passarProximoCad() {
    cadFichaPart2.classList.add('active');
    cadFichaPart1.classList.remove('active');
    btn_cad_gato.style.display = 'block'
}

function voltarCad() {
    cadFichaPart2.classList.remove('active');
    cadFichaPart1.classList.add('active');
}

function cadastrarFicha() {
    var filePhotoCat = input_file.files[0];
    var nome = input_nome.value;
    var apelido = input_apelido.value;
    var raca = input_raca.value;
    var dataNasc = input_dataNasc.value;
    var classe = select_classe.value;
    var descricao = input_descricao.value;

    var atk = atkVal.value;
    var def = defVal.value;
    var agi = agiVal.value;
    var fome = fomeVal.value;
    var sono = sonoVal.value;

    if (
        !filePhotoCat ||
        nome == '' || apelido == '' || raca == '' || dataNasc == '' ||
        classe == '' || descricao == '' ||
        atk == '' || def == '' || agi == '' || fome == '' || sono == ''
    ) {
        mensagem_erro.innerText = "Por favor, preencha todos os campos.";
        alerta_erro.style.display = 'flex';

        setTimeout(() => {
            alerta_erro.style.display = 'none';
        }, 2000);
    } else {
        var idUser = sessionStorage.getItem('ID_USUARIO');
        var email = sessionStorage.getItem('EMAIL_USUARIO');

        var formData = new FormData();
        formData.append('foto', filePhotoCat); 
        formData.append('idUserServer', idUser);
        formData.append('emailServer', email);
        formData.append('nomeServer', nome);
        formData.append('apelidoServer', apelido);
        formData.append('racaServer', raca);
        formData.append('dataNascServer', dataNasc);
        formData.append('classeServer', classe);
        formData.append('descricaoServer', descricao);
        formData.append('atkServer', atk);
        formData.append('defServer', def);
        formData.append('agiServer', agi);
        formData.append('fomeServer', fome);
        formData.append('sonoServer', sono);
        formData.append('tipo', 'gato'); 

        fetch("/fichasGato/cadastrarFichaGato", {
            method: "POST",
            body: formData
        })
            .then(function (resposta) {
                console.log(resposta)
                alerta_sucesso.style.display = 'flex';
                cardSucesso.style.display = "flex";
                mensagem_sucesso.innerHTML = "Ficha cadastrada com sucesso!";

                setTimeout(() => {
                    alerta_sucesso.style.display = 'none';
                    window.location.href = '/dashboard/minhas-fichas.html';
                }, 3500);
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    }
}
