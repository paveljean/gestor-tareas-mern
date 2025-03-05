//importaciones

import { createContext, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

//crear contexto de autenticacion

export const AuthContext = createContext();

//crear el proveedor de autenticacion

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();  //manejo del estado del sistema 

    //funcion del login

    const login = async (email, password) => {
        try {
            const response = await api.post("/users/login", { email, password });
            const { token } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                setUser({ email });
                navigate("/tasks");
            }
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            alert("Email o contraseña incorrectos");
        }
    };

    //funcion del logout

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    //proveer el contexto a la aplicacion

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
