import axios from "axios";
import { useState } from "react";

function Login() {
  const roles = [
    {
      rol: 'admin',
      descripcion: 'Administrador',
      activo: true,
    },
    {
      rol: 'usuario',
      descripcion: 'Usuario Regular',
      activo: true,
    },
    // Agrega más roles según sea necesario
  ];

  const [datos, setDatos] = useState({
    name: "",
    current_password: "",
    rol: "usuario", // Rol predeterminado
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newDatos = { ...datos, [name]: value };
    setDatos(newDatos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      console.log("No enviar");
    } else {
      // Incluye el rol en los datos de la solicitud
      const requestData = {
        ...datos,
        rol: datos.rol,
      };
      let res = await axios.post("http://localhost:3000/usuario/login", requestData);
      console.log(res.data);
    }
  };

  return (
    <section className="h-100">
      <div className="container h-100">
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold md-4">Login</h1>
                <form onSubmit={handleSubmit} className="needs-validation" noValidate={true} autoComplete="off">
                  <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="email">
                      Usuario
                    </label>
                    <input
                      id="email"
                      type="text"
                      onChange={handleInputChange}
                      value={datos.name}
                      className="form-control"
                      name="name"
                      required
                      autoFocus
                    />
                    <div className="invalid-feedback">Usuario inválido</div>
                  </div>
                  <div className="mb-3">
                    <div className="mb-2 w-100">
                      <label className="text-muted" htmlFor="password">
                        Contraseña
                      </label>
                      <a href="/" className="float-end">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    <input
                      id="password"
                      type="password"
                      onChange={handleInputChange}
                      value={datos.current_password}
                      className="form-control"
                      name="current_password"
                      required
                    />

                    <div className="invalid-feedback">Contraseña es requerida</div>
                  </div>
                  <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="rol">
                      Rol
                    </label>
                    <select
                      id="rol"
                      name="rol"
                      onChange={handleInputChange}
                      value={datos.rol}
                      className="form-select"
                    >
                      {roles.map((rol) => (
                        <option key={rol.rol} value={rol.rol}>
                          {rol.descripcion}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="form-check">
                      <input type="checkbox" name="remember" id="remember" className="form-check-input" />
                      <label htmlFor="remember" className="form-check-label">
                        Recordarme
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary ms-auto">
                      <i className="bi bi-box-arrow-in-right"></i>Ingresar
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text- center">Todos los derechos reservados &copy; 2023</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
