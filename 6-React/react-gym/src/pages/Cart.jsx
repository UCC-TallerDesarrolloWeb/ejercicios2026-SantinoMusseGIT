import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCart,
  updateQty,
  removeItem,
  deleteCart,
} from "@/api/cart";

import { formatPrice } from "@/utils/formatPrice";
import "@/styles/Cart.scss";

function Cart() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");

  // Obtener los productos cuando se abre el carrito
  useEffect(() => {
    let activo = true;

    getCart()
      .then((datos) => {
        if (activo) setProductos(datos);
      })
      .catch((err) => {
        if (activo) setError(err.message);
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  // Ejecutar una operación y actualizar la pantalla
  async function ejecutarAccion(accion) {
    setProcesando(true);
    setError("");

    try {
      await accion();
      const datos = await getCart();
      setProductos(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setProcesando(false);
    }
  }

  // Aumentar o disminuir la cantidad
  function cambiarCantidad(producto, cambio) {
    const nuevaCantidad = producto.cantidad + cambio;

    if (nuevaCantidad < 1) return;

    ejecutarAccion(() =>
      updateQty(producto.id, nuevaCantidad)
    );
  }

  // Eliminar un producto
  function eliminarProducto(id) {
    ejecutarAccion(() => removeItem(id));
  }

  // Vaciar todo el carrito
  function vaciarCarrito() {
    const confirmar = window.confirm(
      "¿Querés eliminar todos los productos del carrito?"
    );

    if (confirmar) {
      ejecutarAccion(() => deleteCart());
    }
  }

  // Calcular el total
  const total = productos.reduce(
    (acumulado, producto) =>
      acumulado + producto.precio * producto.cantidad,
    0
  );

  return (
    <section className="cart-container">
      <h1>Mi Carrito de Compras</h1>

      {cargando && <p>Cargando carrito...</p>}

      {error && <p role="alert">Error: {error}</p>}

      {!cargando && productos.length === 0 && (
        <div className="cart-vacio">
          <h2>Tu carrito está vacío</h2>
          <p>Todavía no agregaste ningún producto.</p>

          <Link to="/tienda" className="cart-volver">
            Ir a la tienda
          </Link>
        </div>
      )}

      {!cargando && productos.length > 0 && (
        <>
          <div className="cart-lista">
            {productos.map((producto) => (
              <article
                className="cart-producto"
                key={producto.id}
              >
                <div className="cart-info">
                  <h2>{producto.nombre}</h2>

                  <p>
                    Precio unitario:{" "}
                    {formatPrice(producto.precio)}
                  </p>
                </div>

                <div className="cart-cantidad">
                  <button
                    disabled={
                      procesando || producto.cantidad <= 1
                    }
                    onClick={() =>
                      cambiarCantidad(producto, -1)
                    }
                    aria-label="Disminuir cantidad"
                  >
                    −
                  </button>

                  <span>{producto.cantidad}</span>

                  <button
                    disabled={procesando}
                    onClick={() =>
                      cambiarCantidad(producto, 1)
                    }
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                <div className="cart-subtotal">
                  {formatPrice(
                    producto.precio * producto.cantidad
                  )}
                </div>

                <button
                  className="cart-eliminar"
                  disabled={procesando}
                  onClick={() =>
                    eliminarProducto(producto.id)
                  }
                >
                  Eliminar
                </button>
              </article>
            ))}
          </div>

          <div className="cart-resumen">
            <h2>Total: {formatPrice(total)}</h2>

            <button
              className="cart-vaciar"
              disabled={procesando}
              onClick={vaciarCarrito}
            >
              Vaciar carrito
            </button>

            <Link to="/tienda" className="cart-volver">
              Seguir comprando
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;