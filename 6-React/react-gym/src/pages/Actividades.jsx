import { useEffect, useState } from "react";

import Card from "@/components/Card";
import { dias } from "@/data/actividades";

import "@/styles/Actividades.scss";

function Actividades({ estaLogueado }) {
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function obtenerActividades() {
      try {
        const respuesta = await fetch(
          "http://localhost:4000/activities",
          { signal: controller.signal }
        );

        if (!respuesta.ok) {
          throw new Error("No se pudieron obtener las actividades");
        }

        const datos = await respuesta.json();
        setActividades(datos);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    obtenerActividades();

    return () => controller.abort();
  }, []);

  const inscribirse = (nombre) => {
    alert(`Inscripción simulada a ${nombre}`);
  };

  return (
    <section className="actividades-container">
      <h1>Actividades del Gimnasio</h1>
      <p>Conocé nuestras actividades y horarios.</p>

      {cargando && <p>Cargando actividades...</p>}
      {error && <p role="alert">Error: {error}</p>}

      {!cargando && !error && (
        <div className="actividades-grid">
          {actividades.map((actividad) => (
            <Card
              key={actividad.id}
              title={actividad.nombre.toUpperCase()}
              subtitle={actividad.descripcion}
            >
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

              {estaLogueado && (
                <button
                  className="inscribirme"
                  onClick={() => inscribirse(actividad.nombre)}
                >
                  Inscribirme
                </button>
              )}
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

export default Actividades;