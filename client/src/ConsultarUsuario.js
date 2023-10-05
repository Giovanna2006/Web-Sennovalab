import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ConsultaUsuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    axios
      .get(`/api/usuario/${id}`)
      .then((res) => {
        setUsuario(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div className="container">
      <h2>Detalle del usuario</h2>
      <ul>
        <li>ID: {usuario.idusuario}</li>
        <li>Nombre: {usuario.name}</li>
        <li>Apellido: {usuario.lastname}</li>
        {/* Agrega aquí más campos del usuario según tus necesidades */}
      </ul>
    </div>
  );
}

export default ConsultaUsuario;
