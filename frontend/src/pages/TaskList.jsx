import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "Baja",
        status: "Pendiente",
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setTasks(response.data);
        } catch (error) {
            console.error("Error al obtener las tareas:", error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            if (currentTask) {
                await api.put(`/tasks/${currentTask._id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
            } else {
                await api.post("/tasks", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
            }
            setShowForm(false);
            setCurrentTask(null);
            setFormData({
                title: "",
                description: "",
                dueDate: "",
                priority: "Baja",
                status: "Pendiente",
            });
            fetchTasks();
        } catch (error) {
            console.error("Error al guardar la tarea:", error);
        }
    };

    const handleCreateNewTask = () => {
        setCurrentTask(null);
        setFormData({
            title: "",
            description: "",
            dueDate: "",
            priority: "Baja",
            status: "Pendiente",
        });
        setShowForm(true);
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
        setFormData({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate.split("T")[0],
            priority: task.priority,
            status: task.status,
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
            try {
                await api.delete(`/tasks/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                fetchTasks();
            } catch (error) {
                console.error("Error al eliminar la tarea:", error);
            }
        }
    };

    const handleStatusToggle = async (task) => {
        const newStatus = task.status === "Pendiente" ? "Realizado" : "Pendiente";

        try {
            await api.put(
                `/tasks/${task._id}`,
                { ...task, status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            fetchTasks();
        } catch (error) {
            console.error("Error al cambiar el estado de la tarea:", error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <h1 className="text-3xl font-bold text-center">Gestor de Tareas</h1>
            </header>

            
            <main className="flex-grow p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Tus tareas
                </h1>

                <div className="flex justify-center mb-4">
                    <button
                        onClick={handleCreateNewTask}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Crear Nueva Tarea
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <div
                            key={task._id}
                            className={`p-6 bg-white rounded-lg shadow-lg border-l-4 
                                ${task.status === "Realizado" ? "border-green-500" : "border-yellow-500"}`}
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {task.title}
                            </h2>
                            <p className="text-gray-600 mb-2">{task.description}</p>
                            <p className="text-sm text-gray-500 mb-2">
                                Fecha de Vencimiento: {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                            <p className={`text-sm font-semibold mb-4 
                                ${task.status === "Realizado" ? "text-green-500" : "text-yellow-500"}`}>
                                Estado: {task.status}
                            </p>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(task)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(task._id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    Eliminar
                                </button>
                                <button
                                    onClick={() => handleStatusToggle(task)}
                                    className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                                >
                                    {task.status === "Pendiente" ? "Marcar Realizado" : "Marcar Pendiente"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-bold text-center mb-4">
                            {currentTask ? "Editar Tarea" : "Nueva Tarea"}
                        </h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Título"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Descripción"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded"
                            />
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                                Guardar
                            </button>
                        </form>
                        <button onClick={() => setShowForm(false)} className="mt-4 w-full bg-gray-400 text-white py-2 rounded">
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            
            <footer className="bg-gray-800 text-white py-4 text-center">© 2025 Gestor de Tareas realizado por Jean Noguera.</footer>
        </div>
    );
};

export default TaskList;
