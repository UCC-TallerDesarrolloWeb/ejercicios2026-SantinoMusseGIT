import Card from "@/components/Card";
import { actividades, dias } from "@/data/actividades";

import "@/styles/Actividades.scss";

function Actividades({ estaLogueado }) {

  const inscribirse = (nombre) => {
    alert(`Inscripción simulada a ${nombre}`);
  };

  return (
    <section className="actividades-container">

      <h1>Actividades del Gimnasio</h1>

      <p>
        Conocé nuestras actividades y horarios.
      </p>

      <div className="actividades-grid">

        {actividades.map((actividad) => (

          <Card
            key={actividad.nombre}
            title={actividad.nombre.toUpperCase()}
            subtitle={actividad.descripcion}
          >

            <h3>Horarios disponibles</h3>

            <ul>
              {actividad.horarios.map((horario) => (
                <li key={horario.dia}>
                  <strong>
                    {dias[horario.dia]}:
                  </strong>{" "}
                  {horario["hora-inicio"]} a{" "}
                  {horario["hora-fin"]}
                </li>
              ))}
            </ul>

            {estaLogueado && (
              <button
                className="inscribirme"
                onClick={() =>
                  inscribirse(actividad.nombre)
                }
              >
                Inscribirme
              </button>
            )}

          </Card>

        ))}

      </div>

    </section>
  );
}

export default Actividades;