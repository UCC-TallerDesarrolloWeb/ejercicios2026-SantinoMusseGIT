// Recuperamos el carrito guardado en localStorage.
// Si no hay nada guardado, usamos un array vacío.
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// Buscamos el div donde vamos a mostrar los productos
const contenedorCarrito = document.getElementById("carrito");


// Si el carrito está vacío
if (carrito.length === 0) {

    contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>";

} else {

    // Recorremos todos los productos guardados
    carrito.forEach((producto) => {

        // Creamos una tarjeta
        const tarjeta = document.createElement("div");

        tarjeta.classList.add("tarjeta-producto");

        // Agregamos el contenido
        tarjeta.innerHTML = `
            <img src="images/${producto.imagen}" alt="${producto.nombre}">

            <h3>${producto.nombre}</h3>

            <p>${producto.description}</p>

            <p>Marca: ${producto.marca}</p>

            <p>Precio: $${producto.precio}</p>
        `;

        // Agregamos la tarjeta al HTML
        contenedorCarrito.appendChild(tarjeta);
    });

}