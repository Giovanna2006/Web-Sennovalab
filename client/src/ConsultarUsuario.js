import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function ConsultarUsuario() {
  const [usuario, setUsuario] = useState({});
  const [idUsuario, setIdUsuario] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const consultarUsuario = useCallback(() => { // Agregar useCallback aquí
    if (idUsuario.trim() !== "") {
      setLoading(true);
      axios
        .post("/api/usuario/consultarusuario", { idusuario: idUsuario })
        .then((res) => {
          const datausuario = res.data;
          if (datausuario && typeof datausuario === "object") {
            setUsuario(datausuario);
          } else {
            setError("No se encontró el usuario");
          }
        })
        .catch((err) => {
          setError("Error al obtener el usuario");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [idUsuario]); // Eliminar consultarUsuario de las dependencias de useEffect

  useEffect(() => {
    consultarUsuario();
  }, [consultarUsuario]);

  return (
    <div className="container">
      <h2>Detalle del usuario</h2>
      <div className="mb-3">
        <label htmlFor="idUsuario" className="form-label">
          Ingrese el ID del usuario:
        </label>
        <input
          type="text"
          className="form-control"
          id="idUsuario"
          value={idUsuario}
          onChange={(e) => setIdUsuario(e.target.value)}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={consultarUsuario}
        >
          Consultar
        </button>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          <li>ID: {usuario.idusuario}</li>
          <li>Nombre: {usuario.name}</li>
          <li>Apellido: {usuario.lastname}</li>
          <li>Email: {usuario.email}</li>
          <li>Teléfono: {usuario.telefono}</li>
          <li>Activo: {usuario.active ? "Sí" : "No"}</li>
          <li>Dirección: {usuario.address}</li>
          <li>Rol: {usuario.role}</li>
          <li>Avatar:</li>
          {usuario.avatar && (
            <img
              src={usuario.avatar}
              alt="Avatar"
              style={{ maxWidth: "200px" }}
            />
          )}
        </ul>
      )}
    </div>
  );
}

export default ConsultarUsuario;
