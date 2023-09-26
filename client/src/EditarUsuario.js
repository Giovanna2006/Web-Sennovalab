import axios from "axios";
import Swal from 'sweetalert2'
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditarUsuario() {
  // Hooks
  const params = useParams();
  
  const [name, setName] = useState(""); // Nueva propiedad
  const [lastname, setLastname] = useState(""); // Nueva propiedad
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [current_password, setCurrentPassword] = useState(""); // Nueva propiedad
  const [active, setActive] = useState(true); // Nueva propiedad
  const [avatar, setAvatar] = useState(""); // Nueva propiedad
  const [address, setAddress] = useState(""); // Nueva propiedad
  const [role, setRole] = useState(""); // Nueva propiedad

  // para volver hacia atrás al index o página de inicio
  const navegar = useNavigate();

  useEffect(() => {
    axios
      .post("/api/usuario/obtenerdatausuario", { idusuario: params.idusuario })
      .then((res) => {
        console.log(res.data[0]);
        const datausuario = res.data[0];
        if (datausuario && typeof datausuario === 'object' && 'nombre' in datausuario) {
         
          setName(datausuario.name);
          setLastname(datausuario.lastname);
          setEmail(datausuario.email);
          setTelefono(datausuario.telefono);
          setCurrentPassword(datausuario.current_password);
          setActive(datausuario.active);
          setAvatar(datausuario.avatar);
          setAddress(datausuario.address);
          setRole(datausuario.role);
        } else {
          // Manejar el caso en que datausuario no es válido
          console.log("Los datos de usuario no son válidos.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [params.idusuario]);

  // Función para actualizar el usuario
  function editarUsuario() {
    // Crear un nuevo objeto para actualizar el usuario
    const actualizarUsuario = {
      idusuario: params.idusuario,
      // Agregar las nuevas propiedades
      name: name,
      lastname: lastname,
      email: email,
      telefono: telefono,
      current_password: current_password,
      active: active,
      avatar: avatar,
      address: address,
      role: role,
    };

    // Hacer la petición usando axios
    axios
      .post("/api/usuario/actualizausuario", actualizarUsuario)
      .then((res) => {
        console.log(res.data);
        //alert(res.data); se hace para obtener la alerta normal
        Swal.fire('Confirmado', 'Se han guardado los cambios con éxito');
        navegar('/');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="container">
      <div className="row">
        <h2 className="mt-4">Editar usuario</h2>
      </div>

      <div className="row">
        <div className="col-sm-6 offset-3">
          {/* Agregar campos para las nuevas propiedades */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Apellido:
            </label>
            <input
              type="text"
              className="form-control"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Teléfono:
            </label>
            <input
              type="text"
              className="form-control"
              value={telefono}
              onChange={(e) => {
                setTelefono(e.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="current_password" className="form-label">
              Contraseña actual:
            </label>
            <input
              type="password"
              className="form-control"
              value={current_password}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="active" className="form-label">
              Activo:
            </label>
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => {
                setActive(e.target.checked);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">
              Avatar:
            </label>
            <input
              type="text"
              className="form-control"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Dirección:
            </label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Rol:
            </label>
            <input
              type="text"
              className="form-control"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            ></input>
          </div>
          <button onClick={editarUsuario} className="btn btn-success">
            Editar usuario
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarUsuario;
