import { Link } from "react-router-dom";
import "./styles/Actividades.scss";

const activities = [
  {
    nombre: "taekwondo",
    descripcion: "Arte marcial coreana",
    horarios: [
      { dia: 2, "hora-inicio": "18:30", "hora-fin": "20:00" },
      { dia: 4, "hora-inicio": "18:30", "hora-fin": "20:00" }
    ]
  },
  {
    nombre: "zumba",
    descripcion: "ritmos latinos",
    horarios: [
      { dia: 1, "hora-inicio": "19:30", "hora-fin": "20:30" },
      { dia: 3, "hora-inicio": "19:30", "hora-fin": "20:30" }
    ]
  }
];

const dias = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo"
};

function Actividades() {
  return (
    <main className="actividades-container">

      <h1>Actividades del Gimnasio</h1>

      <p>Conocé nuestras actividades y horarios disponibles.</p>

      <div className="actividades-grid">
        {activities.map((actividad) => (
          <div
            className="actividad-card"
            key={actividad.nombre}
          >
            <h2>{actividad.nombre.toUpperCase()}</h2>

            <p>{actividad.descripcion}</p>

            <h3>Horarios disponibles</h3>

            <ul>
              {actividad.horarios.map((horario) => (
                <li key={horario.dia}>
                  <strong>{dias[horario.dia]}:</strong>{" "}
                  {horario["hora-inicio"]} a{" "}
                  {horario["hora-fin"]}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Link to="/" className="volver-login">
        Volver al Login
      </Link>

    </main>
  );
}

export default Actividades;