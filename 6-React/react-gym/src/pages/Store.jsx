import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "@/api/products";
import { addToCart } from "@/api/cart";
import { formatPrice } from "@/utils/formatPrice";
import ProductoDetalle from "@/components/ProductoDetalle";

import "@/styles/Store.scss";

function Store({ estaLogueado }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] =
    useState(null);
  const [mensaje, setMensaje] = useState("");
  const [agregandoId, setAgregandoId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function cargarProductos() {
      try {
        const datos = await getProducts(controller.signal);

        if (!controller.signal.aborted) {
          setProductos(datos);
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

    cargarProductos();

    return () => controller.abort();
  }, []);

  async function agregarProducto(producto) {
    if (!estaLogueado) return;

    setAgregandoId(producto.id);
    setMensaje("");

    try {
      await addToCart(producto);
      setMensaje(`${producto.nombre} agregado al carrito`);
    } catch (err) {
      setMensaje(`Error: ${err.message}`);
    } finally {
      setAgregandoId(null);
    }
  }

  return (
    <section className="store-container">
      <h1>Tienda React Gym</h1>

      <p>Equipamiento y accesorios deportivos</p>

      {!estaLogueado && (
        <p>
          <Link to="/login">Iniciá sesión</Link>
          {" "}para agregar productos al carrito.
        </p>
      )}

      {mensaje && (
        <p role="status" className="store-mensaje">
          {mensaje}
        </p>
      )}

      {cargando && <p>Cargando productos...</p>}

      {error && <p role="alert">Error: {error}</p>}

      {!cargando && !error && (
        <div className="store-grid">
          {productos.map((producto) => (
            <article
              className="store-card"
              key={producto.id}
            >
              <div className="store-imagen">
                {producto.imagen ? (
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                  />
                ) : (
                  <span>Sin imagen</span>
                )}
              </div>

              <div className="store-info">
                <h2>{producto.nombre}</h2>

                <p>{producto.description}</p>

                <p>
                  <strong>Marca:</strong> {producto.marca}
                </p>

                <p>
                  <strong>Categoría:</strong> {producto.categoria}
                </p>

                <h3>{formatPrice(producto.precio)}</h3>

                <button
                  className="store-detalle-btn"
                  onClick={() =>
                    setProductoSeleccionado(producto)
                  }
                >
                  Ver detalle
                </button>

                {estaLogueado && (
                  <button
                    className="store-agregar-btn"
                    disabled={agregandoId !== null}
                    onClick={() => agregarProducto(producto)}
                  >
                    {agregandoId === producto.id
                      ? "Agregando..."
                      : "Agregar al carrito"}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {productoSeleccionado && (
        <ProductoDetalle
          producto={productoSeleccionado}
          onClose={() =>
            setProductoSeleccionado(null)
          }
        />
      )}
    </section>
  );
}

export default Store;