import React, { useState } from "react";
import uniquid from 'uniqid'
import axios from 'axios'
import Swal from 'sweetalert2'

function AgregarUsuario() {
  // Hooks
 
 
  const [name, setName] = useState('') // Nueva propiedad
  const [lastname, setLastname] = useState('') // Nueva propiedad
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [current_password, setCurrentPassword] = useState('') // Nueva propiedad
  const [active, setActive] = useState(true) // Nueva propiedad
  const [avatar, setAvatar] = useState('') // Nueva propiedad
  const [address, setAddress] = useState('') // Nueva propiedad
  const [role, setRole] = useState('') // Nueva propiedad

  function agregarUsuario() {
    var usuario = {
     
      idusuario: uniquid(),
      name: name, // Asignar las nuevas propiedades al objeto de usuario
      lastname: lastname,
      email: email,
      telefono: telefono,
      current_password: current_password,
      active: active,
      avatar: avatar,
      address: address,
      role: role
    }
    console.log(usuario)

    axios.post('/api/usuario/agregarusuario', usuario)
      .then(res => {
        //alert(res.data) esto se implementa al inicio pero ya se hará uso de la librería "sweetalert2"
        Swal.fire('Confirmado', 'El usuario se creó con éxito')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="container">
      <div className="row">
        <h2 className="mt-4">Crear un nuevo usuario</h2>
      </div>

      <div className="row">
        <div className="col-sm-6 offset-3">
         
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre:</label>
            <input type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">Apellido:</label>
            <input type="text" className="form-control" value={lastname} onChange={(e) => { setLastname(e.target.value) }}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Telefono:</label>
            <input type="text" className="form-control" value={telefono} onChange={(e) => { setTelefono(e.target.value) }}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="current_password" className="form-label">Contraseña actual:</label>
            <input type="password" className="form-control" value={current_password} onChange={(e) => { setCurrentPassword(e.target.value) }}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="active" className="form-label">Activo:</label>
            <input type="checkbox" checked={active} onChange={(e) => { setActive(e.target.checked) }}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">Avatar:</label>
            <input type="text" className="form-control" value={avatar} onChange={(e) => { setAvatar(e.target.value) }}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Dirección:</label>
            <input type="text" className="form-control" value={address} onChange={(e) => { setAddress(e.target.value) }}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Rol:</label>
            <input type="text" className="form-control" value={role} onChange={(e) => { setRole(e.target.value) }}></input>
          </div>
          <button onClick={agregarUsuario} className="btn btn-success">Guardar usuario</button>
        </div>
      </div>
    </div>
  );
}

export default AgregarUsuario;
