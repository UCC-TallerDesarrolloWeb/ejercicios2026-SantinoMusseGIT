import { useEffect, useState } from "react";
import PokeCard from "@/components/PokeCard";

function Poke() {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function obtenerPokemon() {
      try {
        const respuesta = await fetch(
          "https://pokeapi.co/api/v2/pokemon/1",
          { signal: controller.signal }
        );

        if (!respuesta.ok) {
          throw new Error("Error al consultar PokéAPI");
        }

        const datos = await respuesta.json();
        setPokemon(datos);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      }
    }

    obtenerPokemon();

    return () => controller.abort();
  }, []);

  return (
    <section className="actividades-container">
      <h1>PokéAPI en React</h1>

      {error && <p role="alert">{error}</p>}

      {!pokemon && !error && <p>Cargando Pokémon...</p>}

      {pokemon && (
        <div
          className="actividades-grid"
          style={{ gridTemplateColumns: "1fr", maxWidth: 450 }}
        >
          <PokeCard pokemon={pokemon} />
        </div>
      )}
    </section>
  );
}

export default Poke;