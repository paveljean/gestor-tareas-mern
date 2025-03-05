//importacion de modulos

const express = require("express");
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

//creacion del enrutador

const router = express.Router();

//definicion de rutas

router.route("/").get(protect, getTasks).post(protect, createTask);
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

//exportacion del router

module.exports = router;

