import { useEffect } from "react";
import { formatPrice } from "@/utils/formatPrice";

function ProductoDetalle({ producto, onClose }) {
  useEffect(() => {
    const cerrarConEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", cerrarConEscape);

    return () => {
      document.removeEventListener("keydown", cerrarConEscape);
    };
  }, [onClose]);

  if (!producto) return null;

  return (
    <div
      className="store-modal-fondo"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="store-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-producto"
      >
        <button
          className="store-cerrar"
          onClick={onClose}
          aria-label="Cerrar detalles"
        >
          ×
        </button>

        <h2 id="titulo-producto">{producto.nombre}</h2>

        <p>{producto.description}</p>

        <p><strong>Marca:</strong> {producto.marca}</p>
        <p><strong>Categoría:</strong> {producto.categoria}</p>

        <p>
          <strong>Talles disponibles:</strong>{" "}
          {producto.talle.join(", ")}
        </p>

        <h3>{formatPrice(producto.precio)}</h3>

        <button
          className="store-detalle-btn"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ProductoDetalle;