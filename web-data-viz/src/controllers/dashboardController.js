var usuarioModel = require("../models/usuarioModel");
var dashboardModel = require("../models/dashboardModel");

function pegarDadosGraphicUserDash(req, res) {
    var email = req.params.email;
    var idUser = req.params.idUser;
    var nome = req.params.nome;

    if (email == undefined || email != 'fer457@gmail.com') {
        res.status(400).send("Seu email está invalido!");
    } else if (nome == undefined || nome != 'Fernando Ramirez') {
        res.status(400).send("Seu nome está invalido!");
    } else {
        usuarioModel.autenticarUsuario(email, idUser)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);

                    if (resultadoAutenticar.length == 1) {
                        dashboardModel.pegarDadosGraphicUser()
                            .then((resultadoDadosGraphic) => {
                                res.json({
                                    dataGraphic: resultadoDadosGraphic
                                });
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email inválido(s)");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar a busca dos dados do grafico! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

module.exports = {
    pegarDadosGraphicUserDash,
}