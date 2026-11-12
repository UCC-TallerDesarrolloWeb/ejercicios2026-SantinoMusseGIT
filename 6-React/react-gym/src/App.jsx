  import { useState } from "react";
  import { Routes, Route, Navigate } from "react-router-dom";
  import Poke from "@/pages/Poke";
  import Layout from "@/components/Layout";
  import Home from "@/pages/Home";
  import Login from "@/pages/Login";
  import Actividades from "@/pages/Actividades";
  import Store from "@/pages/Store";
  import "@/styles/Layout.scss";
import Cart from "@/pages/Cart";

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
        <Route path="pokemon" element={<Poke />} />
        <Route
    path="tienda"
    element={<Store estaLogueado={estaLogueado} />}
  />
        <Route path="carrito" element={<Cart />} />
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