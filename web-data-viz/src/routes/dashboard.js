const express = require("express");
const router = express.Router();
const dashController = require("../controllers/dashboardController");

router.get(`/dadosGraphicUser/:email/:idUser/:nome`, function (req, res) {
    dashController.pegarDadosGraphicUserDash(req, res);
});

router.get(`/dadosGraphicPost/:email/:idUser/:nome`, function (req, res) {
    dashController.pegarDadosGraphicPostDash(req, res);
});

router.get(`/dadosGraphicKpis/:email/:idUser/:nome`, function (req, res) {
    dashController.pegarDadosGraphicKpisDash(req, res);
});

module.exports = router;
