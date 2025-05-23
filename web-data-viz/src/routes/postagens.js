var express = require("express");
var router = express.Router();

var postagensController = require("../controllers/postagensController");

router.post("/enviarCurtida", function (req, res) {
    postagensController.curtirPostagem(req, res);
})


router.post("/enviarComentario", function (req, res) {
    postagensController.comentarPostagem(req, res);
})

router.post("/pegarComentarios", function (req, res) {
    postagensController.pegarComentarios(req, res);
})

// router.post("/autenticar", function (req, res) {
//     usuarioController.autenticar(req, res);
// });

module.exports = router;