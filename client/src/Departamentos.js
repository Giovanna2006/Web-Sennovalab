import React, { useState, useEffect } from 'react';

const Departamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState('departamento');

  const URL = 'https://www.datos.gov.co/resource/xdk5-pm3f.json';

  const showData = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setDepartamentos(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    showData();
  }, []);

  const filterData = () => {
    return departamentos.filter((dato) =>
      dato[filterBy].toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredData = filterData();

  return (
    <div className='container-fluid'>
      <h2 className='text-center'>Departamentos y municipios de Colombia</h2>
      <form className='mb-4'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='filterBy'>Filtrar por:</label>
              <select
                id='filterBy'
                className='form-control'
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value='departamento'>Departamento</option>
                <option value='c_digo_dane_del_departamento'>Codigo Departamento</option>
                <option value='municipio'>Municipio</option>
                <option value='c_digo_dane_del_municipio'>Código Municipio</option>
                <option value='region'>Región</option>
                {/* Agrega más opciones de filtro según tus necesidades */}
              </select>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='search'>Buscar:</label>
              <input
                type='text'
                id='search'
                className='form-control'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
      <table className='table table-striped table-hover mt-4 shadow-lg'>
        <thead>
          <tr className='bg-curso text-white'>
            <th>Departamento</th>
            <th>Código Departamento</th>
            <th>Municipio</th>
            <th>Código Municipio</th>
            <th>Región</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((dato, index) => (
            <tr key={index}>
              <td>{dato.departamento}</td>
              <td>{dato.c_digo_dane_del_departamento}</td>
              <td>{dato.municipio}</td>
              <td>{dato.c_digo_dane_del_municipio}</td>
              <td>{dato.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Departamentos;
