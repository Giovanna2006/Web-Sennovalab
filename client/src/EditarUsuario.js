import axios from "axios";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditarUsuario() {
  // Hooks
  const params = useParams();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [current_password, setCurrentPassword] = useState("");
  const [active, setActive] = useState(true);
  const [avatar, setAvatar] = useState(""); // Estado para la URL de la imagen del avatar
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  // para volver hacia atrás al index o página de inicio
  const navegar = useNavigate();

  useEffect(() => {
    axios
      .post("/api/usuario/obtenerdatausuario", { idusuario: params.idusuario })
      .then((res) => {
        console.log(res.data[0]);
        const datausuario = res.data[0];
        if (datausuario && typeof datausuario === "object" && "name" in datausuario) {
          setName(datausuario.name);
          setLastname(datausuario.lastname);
          setEmail(datausuario.email);
          setTelefono(datausuario.telefono);
          setCurrentPassword(datausuario.current_password);
          setActive(datausuario.active);
          setAddress(datausuario.address);
          setRole(datausuario.role);
          // Establecer la URL de la imagen del avatar
          setAvatar(datausuario.avatar);
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
      name: name,
      lastname: lastname,
      email: email,
      telefono: telefono,
      current_password: current_password,
      active: active,
      avatar: avatar, // URL de la imagen del avatar
      address: address,
      role: role,
    };

    // Hacer la petición usando axios
    axios
      .post("/api/usuario/actualizausuario", actualizarUsuario)
      .then((res) => {
        console.log(res.data);
        Swal.fire("Confirmado", "Se han guardado los cambios con éxito");
        navegar("/");
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
            />
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
            />
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
            />
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
            />
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="active" className="form-label">
              Activo :
            </label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="si"
                name="active"
                value="true"
                checked={active === true}
                onChange={() => setActive(true)}
                className="form-check-input"
              />
              <label htmlFor="si" className="form-check-label">
                Sí
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="no"
                name="active"
                value="false"
                checked={active === false}
                onChange={() => setActive(false)}
                className="form-check-input"
              />
              <label htmlFor="no" className="form-check-label">
                No
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">
              Avatar:
            </label>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              className="form-control"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  // Crear un objeto URL para mostrar la imagen previamente en la vista.
                  const imageUrl = URL.createObjectURL(file);
                  setAvatar(imageUrl); // Guardar la URL de la imagen en el estado.
                  // También puedes guardar el archivo en el estado si lo necesitas para la subida al servidor.
                }
              }}
            />
            {/* Mostrar la imagen previamente seleccionada por el usuario */}
            {avatar && (
              <img
                src={avatar}
                alt="Avatar"
                style={{ marginTop: "10px", maxWidth: "200px" }}
              />
            )}
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Rol:
            </label>
            <select
              className="form-control"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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
