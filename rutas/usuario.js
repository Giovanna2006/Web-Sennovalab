const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const eschema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Importar las funciones para obtener datos de Colombia
const { getDepartments, getMunicipalitiesByDepartment } = require("../colombiaData"); // Ajusta la ruta según la ubicación de tu archivo colombiaData.js

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
  role: String, // Agrega la propiedad 'role' para almacenar el rol del usuario
});

const ModeloUsuario = mongoose.model("usuarios", eschemausuario);

// Número de rondas de hashing (ajusta según tus necesidades de seguridad)
const saltRounds = 10;

// Middleware para manejar errores
function handleErrors(res, err) {
  console.error(err);
  res.status(500).send("Error interno del servidor");
}

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
      role, // Agregar el campo 'role' al objeto req.body
    } = req.body;

    // Hashear la contraseña antes de guardarla
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error interno del servidor");
      }
      bcrypt.hash(current_password, salt, async (err, hash) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error interno del servidor");
        }
        const nuevousuario = new ModeloUsuario({
          idusuario,
          name,
          lastname,
          email,
          telefono,
          current_password: hash, // Guardar el hash en lugar de la contraseña
          active,
          avatar,
          address,
          role, // Agregar 'role' al modelo de usuario
        });
        await nuevousuario.save();
        res.send("Usuario agregado correctamente");
      });
    });
  } catch (err) {
    handleErrors(res, err);
  }
});

router.get("/obtenerdepartamentos", async (req, res) => {
  try {
    const departments = await getDepartments();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).send("Error al obtener departamentos");
  }
});

router.get("/obtenermunicipios/:department", async (req, res) => {
  const department = req.params.department;
  try {
    const municipalities = await getMunicipalitiesByDepartment(department);
    res.status(200).json(municipalities);
  } catch (error) {
    res.status(500).send("Error al obtener municipios");
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

// Ruta para obtener un usuario por su ID
router.post("/consultarusuario", async (req, res) => {
  try {
    const { idusuario } = req.body;
    const usuario = await ModeloUsuario.findOne({ idusuario });

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.send(usuario);
  } catch (err) {
    handleErrors(res, err);
  }
});



module.exports = router;
