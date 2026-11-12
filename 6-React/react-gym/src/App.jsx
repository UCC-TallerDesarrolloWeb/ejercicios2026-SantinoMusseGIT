import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Login from "./Login";
import Actividades from "./Actividades";

import "./styles/Layout.scss";

function App() {
  const [estaLogueado, setEstaLogueado] = useState(() => {
    return sessionStorage.getItem("gymLoggedIn") === "true";
  });

  const iniciarSesion = () => {
    sessionStorage.setItem("gymLoggedIn", "true");
    setEstaLogueado(true);
  };

  const cerrarSesion = () => {
    sessionStorage.removeItem("gymLoggedIn");
    setEstaLogueado(false);
  };

  return (
    <Routes>
      <Route
        element={
          <Layout
            estaLogueado={estaLogueado}
            onLogout={cerrarSesion}
          />
        }
      >
        <Route index element={<Home />} />

        <Route
          path="login"
          element={<Login onLogin={iniciarSesion} />}
        />

        <Route
          path="actividades"
          element={
            <Actividades estaLogueado={estaLogueado} />
          }
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;