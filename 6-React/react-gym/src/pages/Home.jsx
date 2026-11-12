import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home-page">
      <h1>Bienvenido a React Gym</h1>

      <p>
        Conocé nuestras actividades deportivas
        y los horarios disponibles.
      </p>

      <Link to="/actividades" className="home-button">
        Ver actividades
      </Link>
    </section>
  );
}

export default Home;