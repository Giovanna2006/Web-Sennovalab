import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Departamentos() {
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    // Realiza una solicitud HTTP para obtener los datos desde la API
    axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json')
      .then((response) => {
        // Los datos se encuentran en response.data
        // Filtra los departamentos (puedes ajustar el filtro según tus necesidades)
        const departamentosData = response.data.filter(item => item.level === 'Departamento');
        setDepartamentos(departamentosData);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Departamentos</h2>
      <ul>
        {departamentos.map((departamento) => (
          <li key={departamento.id}>{departamento.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Departamentos;

