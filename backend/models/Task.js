//importacion de mongo

const mongoose = require("mongoose");

//definicion esquema

const taskSchema = mongoose.Schema({
    title: {type: String, required:true},
    description: {type: String},
    dueDate: {type: Date, required: true},
    priority: {type: String, enum: ["Baja", "Media", "Alta"], required: true},
    status: {type: String, enum: ["Pendiente", "Completada"], default: "Pendiente"},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, {timestamps: true});

//exportacion del modelo

module.exports = mongoose.model("Task", taskSchema);