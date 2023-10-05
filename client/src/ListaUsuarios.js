import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsuarioIndividual from './UsuarioIndividual';

function ListaUsuarios() {
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/usuario/obtenerusuarios')
      .then((res) => {
        setDataUsuarios(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al obtener la lista de usuarios');
      });
  }, []);

  return (
    <div className="container">
      <h2 className="text-center my-4">Lista de Usuarios</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Contraseña Actual</th>
              <th>Activo</th>
              <th>Avatar</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataUsuarios.map((usuario, index) => (
              <UsuarioIndividual key={index} usuario={usuario} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaUsuarios;

