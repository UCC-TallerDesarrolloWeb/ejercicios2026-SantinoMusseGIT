import { Link } from "react-router-dom";

import taekwondoImg from "../assets/home/taekwondo.jpg";
import zumbaImg from "../assets/home/zumba.jpg";

import "../styles/Home.scss";

const actividadesHome = [
  {
    id: 1,
    titulo: "Taekwondo",
    imagen: taekwondoImg,
  },
  {
    id: 2,
    titulo: "Zumba",
    imagen: zumbaImg,
  },
  {
    id: 3,
    titulo: "Yoga",
    imagen: "/home/yoga.jpg",
  },
  {
    id: 4,
    titulo: "Entrenamiento funcional",
    imagen: "/home/funcional.jpg",
  },
];

function Home() {
  return (
    <section className="home-page gimnasio-home">
      <h1>Bienvenido a React Gym</h1>

      <p className="home-descripcion">
        Descubrí nuestras actividades deportivas
      </p>

      <div className="home-cards">
        {actividadesHome.map((actividad) => (
          <article
            className="home-card"
            key={actividad.id}
          >
            <img
              src={actividad.imagen}
              alt={actividad.titulo}
              loading="lazy"
            />

            <div className="home-card-contenido">
              <h2>{actividad.titulo}</h2>
            </div>
          </article>
        ))}
      </div>

      <Link to="/actividades" className="home-button">
        Ver actividades y horarios
      </Link>
    </section>
  );
}

export default Home;