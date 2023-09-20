import React from 'react'
function UsuarioIndividual({usuario}){
    return(
      <div className="container">
      <div className="row">
       
       <div className='col-sm-6 offset-3'>
       <ul className="list-group">
          <li className='list-group-item'>{usuario.idusuario}</li>
          <li className='list-group-item'>{usuario.nombre}</li>
          <li className='list-group-item'>{usuario.email}</li>
          <li className='list-group-item'>{usuario.telefono}</li>
        </ul>

      <button className='btn btn-success'>Editar</button>
      &nbsp;
      <button className='btn btn-danger'>Editar</button>
      <hr className='mt-4'></hr>
       </div>

      
      </div>
      </div>

    )

}
export default UsuarioIndividual