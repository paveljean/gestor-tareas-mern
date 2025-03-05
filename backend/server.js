// importacion de dependencias

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//importar rutas

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

//configuracion del entorno, carga las variables de entorno desde un archivo .env

dotenv.config();

//inicializacion Express

const app = express();

//middlewares globales

app.use(express.json());
app.use(cors());


//conexion a mongodb

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=> console.log("Conectado a MongoDB"))
    .catch((error)=> {
        console.error("Error conectando a MongoDB: ", error);
        process.exit(1);
    });

//definicion de rutas

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

//ruta raiz

app.get("/", (req, res) => {
    res.send("API de Gestión de Tareas en Funcionamiento");
})

//configuracion del puerto y levantamiento del servidor

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));