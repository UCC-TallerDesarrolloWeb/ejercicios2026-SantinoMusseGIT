// Recuperar carrito
let carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];


// Elementos HTML
const contenedorCarrito =
    document.getElementById("carrito");

const totalCarrito =
    document.getElementById("totalCarrito");


// Formatear precio
function formatearPrecio(precio) {

    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS"
    }).format(precio);

}


// Mostrar carrito
function mostrarCarrito() {

    contenedorCarrito.innerHTML = "";


    if (carrito.length === 0) {

        contenedorCarrito.innerHTML =
            "<p>El carrito está vacío.</p>";

    } else {

        carrito.forEach(
            (producto, indice) => {

                // Si el producto viejo no tenía cantidad,
                // tomamos cantidad 1
                const cantidad =
                    producto.cantidad || 1;


                const subtotal =
                    producto.precio * cantidad;


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

                    <h3>
                        ${producto.nombre}
                    </h3>

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

                    <p>
                        Cantidad:
                        ${cantidad}
                    </p>

                    <p>
                        Subtotal:
                        ${formatearPrecio(subtotal)}
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


    calcularTotal();

}


// Calcular total del carrito
function calcularTotal() {

    const total =
        carrito.reduce(
            (acumulador, producto) => {

                const cantidad =
                    producto.cantidad || 1;

                return acumulador +
                    producto.precio * cantidad;

            },
            0
        );


    totalCarrito.textContent =
        formatearPrecio(total);

}


// Eliminar producto
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


// Vaciar carrito
function vaciarCarrito() {

    localStorage.removeItem(
        "carrito"
    );


    carrito = [];


    mostrarCarrito();

}


// Mostrar al cargar
mostrarCarrito();