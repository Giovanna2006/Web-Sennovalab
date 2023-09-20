import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UsuarioIndividual from './UsuarioIndividual'

function ListaUsuarios() {
  // Hooks
  const [datausuarios, setDataUsuarios] = useState([])

  useEffect(() => {
    // Realizar una solicitud GET para obtener la lista de usuarios
    axios.get('/api/usuario/obtenerusuarios')
      .then((res) => {
        // Actualizar el estado con los datos de los usuarios
        setDataUsuarios(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, [])

  // Mapear lista de usuarios en objetos UsuarioIndividual
  const listausuarios = datausuarios.map((usuario, index) => (
    <div key={index}>
      <UsuarioIndividual usuario={usuario} />
    </div>
  ))

  return (
    <div>
      <h2>Lista de usuarios</h2>
      {listausuarios}
    </div>
  )
}

export default ListaUsuarios
