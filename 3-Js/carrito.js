// Recuperamos el carrito guardado en localStorage.
// Si no hay nada guardado, usamos un array vacío.
let carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];


// Buscamos el div donde mostramos los productos
const contenedorCarrito =
    document.getElementById("carrito");


// Función para formatear el precio
function formatearPrecio(precio) {

    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS"
    }).format(precio);

}


// Función para mostrar los productos del carrito
function mostrarCarrito() {

    // Limpiamos el contenido
    contenedorCarrito.innerHTML = "";

    // Si está vacío
    if (carrito.length === 0) {

        contenedorCarrito.innerHTML =
            "<p>El carrito está vacío.</p>";

    } else {

        // Recorremos todos los productos
        carrito.forEach(
            (producto, indice) => {

                const tarjeta =
                    document.createElement("div");

                tarjeta.classList.add(
                    "tarjeta-producto"
                );

                tarjeta.innerHTML = `
                    <img
                        src="images/${producto.imagen}"
                        alt="${producto.nombre}"
                    >

                    <h3>${producto.nombre}</h3>

                    <p>
                        ${producto.description}
                    </p>

                    <p>
                        Marca:
                        ${producto.marca}
                    </p>

                    <p>
                        Precio:
                        ${formatearPrecio(producto.precio)}
                    </p>

                    <button
                        onclick="eliminarProducto(${indice})"
                    >
                        Eliminar producto
                    </button>
                `;

                contenedorCarrito.appendChild(
                    tarjeta
                );

            }
        );

    }

}


// Función para eliminar un producto
function eliminarProducto(indice) {

    carrito.splice(
        indice,
        1
    );

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    mostrarCarrito();

}


// Función para vaciar todo el carrito
function vaciarCarrito() {

    localStorage.removeItem(
        "carrito"
    );

    carrito = [];

    mostrarCarrito();

}


// Mostramos el carrito al cargar
mostrarCarrito();