import { useEffect, useState } from "react";
import PokeCard from "@/components/PokeCard";

function Poke() {
  const [pokemons, setPokemons] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAllPokemons() {
      try {
        // Crear las 20 solicitudes a la API
        const promesas = [];

        for (let i = 1; i <= 20; i++) {
          promesas.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`, {
              signal: controller.signal,
            }).then((respuesta) => {
              if (!respuesta.ok) {
                throw new Error(`Error al obtener Pokémon ${i}`);
              }

              return respuesta.json();
            })
          );
        }

        // Esperar a que terminen todas las solicitudes
        const datos = await Promise.all(promesas);

        if (!controller.signal.aborted) {
          setPokemons(datos);
        }
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

    fetchAllPokemons();

    return () => controller.abort();
  }, []);

  return (
    <section className="actividades-container">
      <h1>Los primeros 20 Pokémon</h1>

      <p>Datos obtenidos desde PokéAPI</p>

      {cargando && <p>Cargando Pokémon...</p>}

      {error && <p role="alert">Error: {error}</p>}

      {!cargando && !error && (
        <div className="actividades-grid">
          {pokemons.map((pokemon) => (
            <PokeCard
              key={pokemon.id}
              pokemon={pokemon}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Poke;