var express = require("express");
var router = express.Router();

var fichasGatoController = require("../controllers/fichasGatoController");

router.post("/fichasGato", function (req, res) {
  fichasGatoController.buscarFichasGato(req, res);
});

router.post("/fichasGatoUser", function (req, res) {
  fichasGatoController.buscarFichasGatoUser(req, res);
});

router.post("/fichasGatoAll", function (req, res) {
  fichasGatoController.buscarFichasGatoAll(req, res);
});

router.post("/cadastrarFichaGato", function (req, res) {
  fichasGatoController.cadastrarFichaGato(req, res);
})

module.exports = router;