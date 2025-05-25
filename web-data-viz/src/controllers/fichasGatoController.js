var fichasGatoModel = require("../models/fichasGatoModel");
var usuarioModel = require("../models/usuarioModel")

function buscarFichasGato(req, res) {
  var idUsuario = req.params.idUsuario;
  var email = req.params.email;
  var nome = req.params.nome;

  fichasGatoModel.buscarFichasGato(idUsuario, email, nome).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as fichas de gato: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarFichasGatoAll(req, res) {
  var id = req.body.idUserServer;
  console.log(id)

  fichasGatoModel.buscarFichasGatoAll(id).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as fichas de gato: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function cadastrarFichaGato(req, res) {
  var idUser = req.body.idUserServer;
  var email = req.body.emailServer;
  var nome = req.body.nomeServer;
  var apelido = req.body.apelidoServer;
  var raca = req.body.racaServer;
  var dataNasc = req.body.dataNascServer;
  var classe = req.body.classeServer;
  var descricao = req.body.descricaoServer;
  var atk = req.body.atkServer;
  var def = req.body.defServer;
  var agi = req.body.agiServer;
  var fome = req.body.fomeServer;
  var sono = req.body.sonoServer;


  usuarioModel.autenticarUsuario(email, idUser)
    .then(() => {
      fichasGatoModel.cadastrarFicha(nome, apelido, raca, dataNasc, classe, descricao, atk, def, agi, fome, sono, idUser)
        .then((resultadoCadastro) => {
          console.log(resultadoCadastro)

          if (resultadoCadastro.length > 0) {
            res
              .status(401)
              .json({ mensagem: `Error` });
          } else {
            res.status(204).json({ mensagem: 'Check' });
          }
        })
    }
    ).catch(
      function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar a o cadastro da ficha! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}

module.exports = {
  buscarFichasGato,
  buscarFichasGatoAll,
  cadastrarFichaGato
}