const express = require("express");
const router = express.Router();
const upload = require('../config/configUploadCat');  // seu multer configurado
const fichasGatoController = require("../controllers/fichasGatoController");

router.post("/fichasGato", function (req, res) {
  fichasGatoController.buscarFichasGato(req, res);
});

router.post("/fichasGatoUser", function (req, res) {
  fichasGatoController.buscarFichasGatoUser(req, res);
});

router.post("/fichasGatoAll", function (req, res) {
  fichasGatoController.buscarFichasGatoAll(req, res);
});

router.post("/cadastrarFichaGato", upload.single('foto'), function (req, res) {
  fichasGatoController.cadastrarFichaGato(req, res);
});

router.post("/publicarFicha", function (req, res) {
  fichasGatoController.publicarFicha(req, res);
});

module.exports = router;
