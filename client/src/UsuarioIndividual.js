import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import 'aos/dist/aos.css'

function UsuarioIndividual({ usuario }) {
  const navegar = useNavigate();

  // Para animaciones de scroll al bajar
  useEffect(() => {
    AOS.init();
  }, []);

  // Función para borrar usuario
  function borrarusuario(idusuario) {
    axios
      .post('/api/usuario/borrarusuario', { idusuario: idusuario })
      .then((res) => {
        console.log(res.data);
        alert(res.data);
        navegar(0);
      })
      .catch((err) => {
        console.log();
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-3" data-aos="flip-right">
          <ul className="list-group">
            <li className="list-group-item">ID de Usuario: {usuario.idusuario}</li>
            <li className="list-group-item">Nombre: {usuario.name}</li>
            <li className="list-group-item">Apellido: {usuario.lastname}</li>
            <li className="list-group-item">Email: {usuario.email}</li>
            <li className="list-group-item">Teléfono: {usuario.telefono}</li>
            <li className="list-group-item">Contraseña Actual: {usuario.current_password}</li>
            <li className="list-group-item">Activo: {usuario.active ? 'Sí' : 'No'}</li>
            <li className="list-group-item">Avatar: <img src={usuario.avatar} alt="Avatar" /></li>
            <li className="list-group-item">Rol: {usuario.role === "admin" ? "Admin" : "User"}</li>
          </ul>
          <Link to={`/editarusuario/${usuario.idusuario}`}>
            <button className="btn btn-success">Editar</button>
          </Link>
          &nbsp;
          <button
            className="btn btn-danger"
            onClick={() => {
              borrarusuario(usuario.idusuario);
            }}
          >
            Borrar
          </button>
          <hr className="mt-4"></hr>
        </div>
      </div>
    </div>
  );
}

export default UsuarioIndividual;
