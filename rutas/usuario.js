const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const eschema = mongoose.Schema;

const eschemausuario = new eschema({
  idusuario: String,
  name: String,
  lastname: String,
  email: String,
  telefono: String,
  current_password: String,
  active: Boolean,
  avatar: String,
  address: String,
  role: String,
});

const ModeloUsuario = mongoose.model("usuarios", eschemausuario);

// Middleware para manejar errores
function handleErrors(res, err) {
  console.error(err);
  res.status(500).send("Error interno del servidor");
}

// Ruta para agregar un usuario
router.post("/agregarusuario", async (req, res) => {
  try {
    const {
      
      idusuario,
      name,
      lastname,
      email,
      telefono,
      current_password,
      active,
      avatar,
      address,
      role,
    } = req.body;
    const nuevousuario = new ModeloUsuario({
      idusuario,
      name,
      lastname,
      email,
      telefono,
      current_password,
      active,
      avatar,
      address,
      role,
    });
    await nuevousuario.save();
    res.send("Usuario agregado correctamente");
  } catch (err) {
    handleErrors(res, err);
  }
});

// Ruta para obtener todos los usuarios
router.get("/obtenerusuarios", async (req, res) => {
  try {
    const usuarios = await ModeloUsuario.find({});
    res.send(usuarios);
  } catch (err) {
    handleErrors(res, err);
  }
});

// Ruta para obtener data de un usuario por su ID
router.post("/obtenerdatausuario", async (req, res) => {
  try {
    const { idusuario } = req.body;
    const usuarios = await ModeloUsuario.find({ idusuario });
    res.send(usuarios);
  } catch (err) {
    handleErrors(res, err);
  }
});

// Ruta para actualizar un usuario por su ID
router.post("/actualizausuario", async (req, res) => {
  try {
    const {
      idusuario,
      name,
      lastname,
      email,
      telefono,
      current_password,
      active,
      avatar,
      address,
      role,
    } = req.body;
    const usuario = await ModeloUsuario.findOneAndUpdate(
      { idusuario },
      {
        name,
        lastname,
        email,
        telefono,
        current_password,
        active,
        avatar,
        address,
        role,
      },
      { new: true } // Devuelve el usuario actualizado
    );

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.send("Usuario actualizado correctamente");
  } catch (err) {
    handleErrors(res, err);
  }
});

// Borrar usuario
router.post("/borrarusuario", async (req, res) => {
  try {
    const result = await ModeloUsuario.findOneAndDelete({ idusuario: req.body.idusuario });

    if (!result) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.send("Usuario borrado correctamente");
  } catch (err) {
    handleErrors(res, err);
  }
});

module.exports = router;
