const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const eschema = mongoose.Schema;

const eschemausuario = new eschema({
  nombre: String,
  email: String,
  telefono: String,
  idusuario: String,
});

const ModeloUsuario = mongoose.model("usuarios", eschemausuario);

// Ruta para agregar un usuario
router.post("/agregarusuario", async (req, res) => {
  try {
    const nuevousuario = new ModeloUsuario({
      nombre: req.body.nombre,
      email: req.body.email,
      telefono: req.body.telefono,
      idusuario: req.body.idusuario,
    });
    await nuevousuario.save();
    res.send("Usuario agregado correctamente");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Ruta para obtener todos los usuarios
router.get('/obtenerusuarios', async (req, res) => {
  try {
    const usuarios = await ModeloUsuario.find({});
    res.send(usuarios);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;