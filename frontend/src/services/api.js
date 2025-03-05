//importar libreria axios para hacer solicitudes http

import axios from "axios";

//define la URL base de la api, esta es la direccion donde corre el backend

const API_URL = "http://localhost:5000/api";

//crear instancia axios

const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json"},
});

//exporta la instancia de axios

export default api;