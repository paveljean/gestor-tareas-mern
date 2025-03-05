import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/tasks");
        } catch (error) {
            alert("Error en el inicio de sesión");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
   
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <h1 className="text-3xl font-bold text-center">
                    Gestor de Tareas
                </h1>
            </header>

            <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Iniciar Sesión
                    </h2>

                    {error && (
                        <p className="text-red-500 text-sm text-center mb-4">
                            {error}
                        </p>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
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

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    <p className="text-center text-gray-600 text-sm mt-4">
                        ¿No tienes cuenta?{" "}
                        <a
                            href="/register"
                            className="text-blue-500 hover:underline"
                        >
                            Regístrate aquí
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

export default Login;
