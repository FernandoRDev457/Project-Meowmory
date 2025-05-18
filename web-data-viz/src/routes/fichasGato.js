var express = require("express");
var router = express.Router();

var fichasGatoController = require("../controllers/fichasGatoController");

router.get("/fichasGato", function (req, res) {
  fichasGatoController.buscarFichasGato(req, res);
});

router.get("/fichasGatoAll", function (req, res) {
  fichasGatoController.buscarFichasGatoAll(req, res);
});

router.post("/cadastrar", function (req, res) {
  fichasGatoController.cadastrar(req, res);
})

module.exports = router;