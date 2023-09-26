import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsuarioIndividual from './UsuarioIndividual';

function ListaUsuarios() {
  // Hooks
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [error, setError] = useState(null); // Nuevo estado para manejar errores

  useEffect(() => {
    // Realizar una solicitud GET para obtener la lista de usuarios
    axios
      .get('/api/usuario/obtenerusuarios')
      .then((res) => {
        // Actualizar el estado con los datos de los usuarios
        setDataUsuarios(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al obtener la lista de usuarios'); // Configura el estado de error en caso de un problema
      });
  }, []);

  return (
    <div>
      <h2>Lista de usuarios</h2>
      {error ? (
        // Mostrar un mensaje de error si se produce un error
        <div className="alert alert-danger">{error}</div>
      ) : (
        // Mapear la lista de usuarios solo si no hay errores
        dataUsuarios.map((usuario, index) => (
          <div key={index}>
            {/* Pasa todas las propiedades del usuario a UsuarioIndividual */}
            <UsuarioIndividual usuario={usuario} />
          </div>
        ))
      )}
    </div>
  );
}

export default ListaUsuarios;
