const productos = [
    {
        nombre: "Cabezal Sparring",
        description: "Cabezal de Sparring.",
        categoria: "Protectores",
        marca: "Gran Marc",
        talle: ["1", "2", "3"],
        precio: 35000,
        web: "https://www.granmarctiendaonline.com.ar/productos/cabezal-cerrado/",
        imagen: "cabezal-cerrado.webp",
    },
    {
        nombre: "Dobok Dan",
        description: "Bobok aprobado para torneos internacionales.",
        categoria: "Dobok",
        marca: "Daedo",
        talle: ["1", "2", "3", "4", "5", "6", "7", "8"],
        precio: 115000,
        web: "https://www.daedo.com/products/taitf-10813",
        imagen: "dobok.webp",
    },
    {
        nombre: "Escudo de Potencia",
        description: "Escudo de potencia para entrenamientos.",
        categoria: "Entrenamiento",
        marca: "Gran Marc",
        talle: ["s/talle"],
        precio: 51700,
        web: "https://www.granmarctiendaonline.com.ar/productos/escudo-de-potencia-grande/",
        imagen: "escudo-potencia.webp",
    },
    {
        nombre: "Par de focos redondos",
        description: "Par de focos de 25cm x 25cm para hacer entrenamiento.",
        categoria: "Entrenamiento",
        marca: "Gran Marc",
        talle: ["s/talle"],
        precio: 15000,
        web: "https://www.granmarctiendaonline.com.ar/productos/foco-con-dedos/",
        imagen: "foco-con-dedos.webp",
    },
    {
        nombre: "Guantes 10 onzas",
        description:
            "Guantes de Sparring de 10 onzas habilitados para torneos internacionales",
        categoria: "Protectores",
        marca: "Daedo",
        talle: ["s/talle"],
        precio: 35000,
        web: "https://www.daedo.com/products/pritf-2020",
        imagen: "protectores-manos.webp",
    },
    {
        nombre: "Protectores Pie",
        description:
            "Protectores de Pie habilitados para torneos internacionales",
        categoria: "Protectores",
        marca: "Daedo",
        talle: ["XXS", "XS", "S", "M", "L", "XL"],
        precio: 35000,
        web: "https://www.daedo.com/collections/collection-itf-gloves/products/pritf-2022",
        imagen: "protectores-manos.webp",
    },
];


// Recuperamos el carrito guardado.
// Si no existe todavía, usamos un array vacío.
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// Buscamos el div donde vamos a mostrar los productos
const contenedorProductos = document.getElementById("productos");


// Recorremos el array de productos
productos.forEach((producto, indice) => {

    // Creamos una tarjeta
    const tarjeta = document.createElement("div");

    tarjeta.classList.add("tarjeta-producto");

    // Agregamos el contenido de la tarjeta
    tarjeta.innerHTML = `
        <img src="images/${producto.imagen}" alt="${producto.nombre}">

        <h3>${producto.nombre}</h3>

        <p>${producto.description}</p>

        <p>Marca: ${producto.marca}</p>

        <p>Precio: $${producto.precio}</p>

        <button onclick="agregarAlCarrito(${indice})">
            Agregar al carrito
        </button>
    `;

    // Agregamos la tarjeta al HTML
    contenedorProductos.appendChild(tarjeta);
});


// Función para agregar un producto al carrito
function agregarAlCarrito(indice) {

    // Obtenemos el producto según su posición
    const productoSeleccionado = productos[indice];

    // Agregamos el producto al array carrito
    carrito.push(productoSeleccionado);

    // Guardamos el array en localStorage
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    alert("Producto agregado al carrito");
}