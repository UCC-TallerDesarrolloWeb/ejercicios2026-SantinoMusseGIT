function Card({ title, subtitle, children }) {
  return (
    <article className="actividad-card">
      <h2>{title}</h2>

      <p>{subtitle}</p>

      <div className="actividad-card-contenido">
        {children}
      </div>
    </article>
  );
}

export default Card;