var usuarioModel = require("../models/usuarioModel");
var dashboardModel = require("../models/dashboardModel");

function pegarDadosDashboard(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined || email == 'fer457@gmail.com') {
        res.status(400).send("Seu email está invalido!");
    } else if (senha == undefined || senha == 'fer457@#PinguinessAdmin') {
        res.status(400).send("Sua senha está invalido!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        fichasGatoModel.buscarFichasGato(resultadoAutenticar[0].idUsuario, resultadoAutenticar[0].email, resultadoAutenticar[0].nome)
                            .then((resultadoFichasGato) => {
                                res.json({
                                    idUsuario: resultadoAutenticar[0].idUsuario,
                                    email: resultadoAutenticar[0].email,
                                    nome: resultadoAutenticar[0].nome,
                                    senha: resultadoAutenticar[0].senha,
                                    dataNasc: resultadoAutenticar[0].dataNasc,
                                    fichasGato: resultadoFichasGato || [],
                                });
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

module.exports = {
    pegarDadosDashboard,
}