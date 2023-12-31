import "./App.css";
import ListaUsuarios from "./ListaUsuarios";
import AgregarUsuario from "./AgregarUsuario";
import EditarUsuario from "./EditarUsuario";
import Login from "./login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Departamentos from "./Departamentos";
import ConsultarUsuario from "./ConsultarUsuario";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            Web sennovalab
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="agregarusuario">
                  Agregar Usuario
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="login">
                  Ingresar
                </a>
              </li>
              <li className="nav-item">
              <a className="nav-link" href="departamentos"> 
                  Datos Abiertos 
                  </a>
              </li>
              <li className="nav-item">
              <a className="nav-link" href="/consultarusuario/ln3vunzx"> 
                  consutar ID
                  </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListaUsuarios />} exact></Route>
          <Route
            path="/agregarusuario"
            element={<AgregarUsuario />}
            exact
          ></Route>
          <Route path="/editarusuario/:idusuario" element={<EditarUsuario />} exact></Route>
          <Route
            path="/login"
            element={<Login />}
            exact
          ></Route>
           <Route path="/departamentos" element={<Departamentos />} exact />
           <Route path="consultarusuario/:idUsuario" element={<ConsultarUsuario/>} exact></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
