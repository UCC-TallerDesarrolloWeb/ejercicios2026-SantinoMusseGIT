  import { NavLink, useNavigate } from "react-router-dom";

  function Header({ estaLogueado, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
      onLogout();
      navigate("/login");
    };

    return (
      <header className="site-header">
        <h2>React Gym</h2>

        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/actividades">Actividades</NavLink>
          <NavLink to="/tienda">Tienda</NavLink>

  {estaLogueado && (
    <NavLink to="/carrito">Carrito</NavLink>
  )}
        </nav>

        {estaLogueado && (
          <button onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>
    );
  }

  export default Header;