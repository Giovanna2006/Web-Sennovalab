const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Importar las funciones para obtener datos de Colombia
const { getDepartments, getMunicipalitiesByDepartment } = require("./colombiaData");



//importar conexion mongoDB
const archivoBD = require("./conexion");

//importacion del archivo de rutas y modelo
const rutausuario = require("./rutas/usuario");

//importar body-parser( esta es para poder obtener de los campos la informacion)
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));

app.use(cors());

const TOKEN_KEY = "x4TvnErxRETbVcqaLl5dqMI115dqMI115eNlp5y";
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorizacion"];
  const token = authHeader && authHeader.split("")[1];
  console.log(authHeader);
  if (token == null) return res.status(401).send("Token requerido");
  jwt.verify(token, TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).send("Token invalido");
    console.log(user);
    req.user = user;
    next();
  });
};


// Ruta para el proceso de login
app.post("/usuario/login", (req, res) => {
  const  name = req.body.name;
  const current_password = req.body.current_password;
  // Aquí puedes verificar las credenciales en tu base de datos MongoDB
  // Si las credenciales son válidas, puedes responder con los datos del usuario
  // Si no son válidas, responde con un mensaje de error
  if (name === "camila" && current_password === "2222") {
    const datos = {
      idusuario: "ca6006ae-a861-4043-98bb-2c211dde7062",
      name: "camila",
      email: "camilagmail.com",

    };
    const token = jwt.sign(
      {userId:datos.idusuario,email:datos.email},
      TOKEN_KEY, 
      {expiresIn:"2h"}
    );
    let nDatos = {...datos, token};
    res.status(200).json(nDatos);
  } else {
    res.status(400).send("Credenciales incorrectas");
  }
});
/*app.get("/usuario/:idusuario/cliente", verifyToken, (req,res)=>{
    const datos = [
    {idusuario:lmznj544,cliente: "Empresa A", total:2500,fecha:"2023-05-09"},
]
})*/

app.use("/api/usuario", rutausuario);

app.get("/", (req, res) => {
  res.end("Bienvenidos al servidor backend Node.js. Corriendo...");
});

//configurar server basico
app.listen(5000, function () {
  console.log("el servidor NODE  esta corriendo correctamente");
});
