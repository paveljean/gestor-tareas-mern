import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
    const { login } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await api.post("/users/register", { name, email, password });
            if (response.data) {
                alert("Registro exitoso. Redirigiendo al inicio de sesión.");
                navigate("/login");
            }
        } catch (error) {
            setError("Error en el registro. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">

            <header className="bg-blue-600 text-white py-4 shadow-md">
                <h1 className="text-3xl font-bold text-center">Gestor de Tareas</h1>
            </header>

            <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Crear una Cuenta
                    </h2>

                    {error && (
                        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Nombre
                            </label>
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                placeholder="ejemplo@correo.com"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="********"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Confirmar Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="********"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
                        >
                            Registrarse
                        </button>
                    </form>

                    <p className="text-center text-gray-600 text-sm mt-4">
                        ¿Ya tienes una cuenta?{" "}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Inicia sesión aquí
                        </a>
                    </p>
                </div>
            </main>

            <footer className="bg-gray-800 text-white py-4 text-center">
                <p className="text-sm">
                    © {new Date().getFullYear()} Gestor de Tareas realizado por Jean Noguera.
                </p>
            </footer>
        </div>
    );
};

export default Register;
