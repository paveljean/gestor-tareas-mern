//importacion de modulos

const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

//creacion del enrutador

const router = express.Router();

//definicion de rutas

router.post("/register", registerUser);
router.post("/login", loginUser);

//exportacion del router

module.exports = router;