const express = require("express");
const router = express.Router();
const dashController = require("../controllers/dashboardController");

router.get(`/dadosGraphicUser/:email/:idUser/:nome`, function (req, res) {
    dashController.pegarDadosGraphicUserDash(req, res);
});

module.exports = router;
