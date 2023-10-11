import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'aos/dist/aos.css';


function UsuarioIndividual({ usuario }) {
  // Función para borrar usuario
  function borrarusuario(idusuario) {
    axios
      .post('/api/usuario/borrarusuario', { idusuario: idusuario })
      .then((res) => {
        console.log(res.data);
        alert(res.data);
        // Puedes redirigir o hacer alguna otra acción después de borrar
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <tr>
      <td>{usuario.idusuario}</td>
      <td>{usuario.name}</td>
      <td>{usuario.lastname}</td>
      <td>{usuario.email}</td>
      <td>{usuario.telefono}</td>
      <td>{usuario.current_password}</td>
      <td>{usuario.active ? 'Sí' : 'No'}</td>
      <td><img src={usuario.avatar} alt="Avatar" /></td>
      <td>{usuario.role === "admin" ? "Admin" : "User"}</td>
      <td>
        <Link to={`/editarusuario/${usuario.idusuario}`} className="btn btn-success">
          Editar
        </Link>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => {
            borrarusuario(usuario.idusuario);
          }}
        >
          Borrar
        </button>
      </td>
      <td>
      <Link to={`/consultarusuario/${usuario.idusuario}`} className="btn btn-success">
        Id
        </Link>
      </td>
    </tr>
  );
}

export default UsuarioIndividual;
