var usuarioModel = require("../models/usuarioModel");
var postagensModel = require("../models/postagensModel");

function curtirPostagem(req, res) {
    let idUser = req.body.idUserServer;
    let idFicha = req.body.idFichaGatoServer;
    let idPost = req.body.idPostagemServer;
    let email = req.body.emailServer;

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
    let idUser = req.body.idUserServer;
    let idFicha = req.body.idFichaGatoServer;
    let idPost = req.body.idPostagemServer;
    let comentario = req.body.comentServer;
    let email = req.body.emailServer;

    usuarioModel.autenticarUsuario(email, idUser)
        .then((resultadoUsuario) => {
            postagensModel.enviarComentario(resultadoUsuario[0].idUsuario, idPost, idFicha, comentario)
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

function pegarComentarios(req, res) {
    let idPost = req.body.idPostServer;

    postagensModel.pegarComentarios(idPost).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(200).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as fichas de gato: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    curtirPostagem,
    comentarPostagem,
    pegarComentarios
}