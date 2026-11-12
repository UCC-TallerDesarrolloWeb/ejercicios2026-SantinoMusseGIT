function PokeCard({ pokemon }) {
  const imagen =
    pokemon.sprites.other["official-artwork"].front_default;

  return (
    <article className="actividad-card">
      <h2>{pokemon.name.toUpperCase()}</h2>

      <img
        src={imagen}
        alt={pokemon.name}
        width="200"
      />

      <p>ID: {pokemon.id}</p>
      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>

      <h3>Tipos</h3>
      <ul>
        {pokemon.types.map((tipo) => (
          <li key={tipo.type.name}>
            {tipo.type.name}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default PokeCard;