//importacion de dependencias

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//definicion esquema de usuario

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {timestamps: true});

//middleware para encriptar la contraseña

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next ();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//exportacion del modelo

module.exports = mongoose.model("User", userSchema);
