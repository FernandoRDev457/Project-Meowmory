var usuarioModel = require("../models/usuarioModel");
var postagensModel = require("../models/postagensModel");

function curtirPostagem(req, res) {
    var idUser = req.body.idUserServer;
    var idFicha = req.body.idFichaGatoServer;
    var idPost = req.body.idPostagemServer;
    var email = req.body.emailServer;

    usuarioModel.autenticarUsuario(email, idUser)
        .then(() => {
            postagensModel.enviarCurtida(idFicha, idPost, idUser)
                .then((resultadoAutenticacao) => {
                    console.log(resultadoAutenticacao)

                    if (resultadoAutenticacao.length > 0) {
                        res
                            .status(401)
                            .json({ mensagem: `Meow N` });
                    } else {
                        res.status(204).json({ mensagem: 'Check' });
                    }
                })
        }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a curtida! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function comentarPostagem(req, res) {
    var idUser = req.body.idUserServer;
    var idFicha = req.body.idFichaGatoServer;
    var idPost = req.body.idPostagemServer;
    var comentario = req.body.comentServer;
    var email = req.body.emailServer;

    usuarioModel.autenticarUsuario(email, idUser)
        .then(() => {
            postagensModel.enviarComentario(idUser, idPost, idFicha, comentario)
                .then((resultadoAutenticacao) => {
                    console.log(resultadoAutenticacao)

                    if (resultadoAutenticacao.length > 0) {
                        res
                            .status(401)
                            .json({ mensagem: `Meow N` });
                    } else {
                        res.status(204).json({ mensagem: 'Check' });
                    }
                })
        }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a curtida! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// function cadastrar(req, res) {
//     // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
//     var nome = req.body.nomeServer;
//     var email = req.body.emailServer;
//     var senha = req.body.senhaServer;
//     var dataNasc = req.body.dataNascServer;

//     // Faça as validações dos valores
//     if (nome == undefined) {
//         res.status(400).send("Seu nome está undefined!");
//     } else if (email == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está undefined!");
//     } else if (dataNasc == undefined) {
//         res.status(400).send("Sua empresa a vincular está undefined!");
//     } else {

//         // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
//         usuarioModel.cadastrar(nome, email, senha, dataNasc)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao realizar o cadastro! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }
// }

module.exports = {
    curtirPostagem,
    comentarPostagem
    // autenticar,
    // cadastrar
}