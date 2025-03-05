//importamos navigate de react-router-dom para redirigir usuarios no autenticados
//importamos useContext para acceder al estado global del usuario
//importamos AuthContext donde se almacena el estado de autenticacion user, login, logout

import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext  } from "../context/AuthContext";

//definir componente

const PrivateRoute = ({ children }) => {
    //verificar si el usuario esta autenticado
    const { user } = useContext(AuthContext);
    //control de acceso
    return user ? children : <Navigate to="/login" />;
};

//exportar el componente

export default PrivateRoute;
