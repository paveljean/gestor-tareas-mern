//importacion modelo tarea

const Task = require("../models/Task");

//obtener tareas del usuario autenticado

exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
};

//crear nueva tarea

exports.createTask = async (req, res) => {
    const { title, description, dueDate, priority } = req.body;

    const task = await Task.create({
        title,
        description,
        dueDate,
        priority,
        user: req.user.id,
    });

    res.status(201).json(task);
};

//actualizar tarea

exports.updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found"});

    if (task.user.toString() !== req.user.id)
        return res.status(401).json({message: "Unauthorized"});

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,  
    });

    res.json(updatedTask);
};

//eliminar una tarea
 exports.deleteTask = async (req,res) => {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({message: "Task not found"});

    if (task.user.toString() !== req.user.id)
        return res.status(401).json({message: "Unauthorized"});

    await task.deleteOne();
    res.json({ message: "Task removed"});
 };