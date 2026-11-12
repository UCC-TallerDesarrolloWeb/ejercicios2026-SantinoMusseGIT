import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    if (usuario === "admin" && password === "admin") {
      console.log("Login OK");
      setMensaje("");

      onLogin();
      navigate("/actividades");
    } else {
      console.log("Login Incorrecto");
      setMensaje("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </div>
  );
}

export default Login;