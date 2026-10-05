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


// Formatear precio
function formatearPrecio(precio) {

    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS"
    }).format(precio);

}


// Recuperar carrito
let carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];


// Elementos HTML
const contenedorProductos =
    document.getElementById("productos");

const inputBusqueda =
    document.getElementById("busqueda");

const inputPrecioMin =
    document.getElementById("precioMin");

const inputPrecioMax =
    document.getElementById("precioMax");

const selectMarca =
    document.getElementById("marca");

const checkCategorias =
    document.querySelectorAll(".categoria");

const contadorCarrito =
    document.getElementById("contadorCarrito");


// Actualizar contador
function actualizarContadorCarrito() {

    const cantidadTotal = carrito.reduce(
        (total, producto) => {
            return total + (producto.cantidad || 1);
        },
        0
    );

    contadorCarrito.textContent =
        cantidadTotal;

}


// Mostrar productos
function mostrarProductos(listaProductos) {

    contenedorProductos.innerHTML = "";

    if (listaProductos.length === 0) {

        contenedorProductos.innerHTML =
            "<p>No se encontraron productos.</p>";

        return;
    }


    listaProductos.forEach((producto) => {

        const indiceOriginal =
            productos.indexOf(producto);

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

            <p>${producto.description}</p>

            <p>Marca: ${producto.marca}</p>

            <p>
                Categoría:
                ${producto.categoria}
            </p>

            <p>
                Precio:
                ${formatearPrecio(producto.precio)}
            </p>

            <button
                onclick="agregarAlCarrito(${indiceOriginal})"
            >
                Agregar al carrito
            </button>
        `;

        contenedorProductos.appendChild(
            tarjeta
        );

    });

}


// Filtrar productos
function filtrarProductos() {

    const texto =
        inputBusqueda.value.toLowerCase();

    const precioMin =
        Number(inputPrecioMin.value) || 0;

    const precioMax =
        Number(inputPrecioMax.value) || Infinity;

    const marcaSeleccionada =
        selectMarca.value;


    const categoriasSeleccionadas = [];

    checkCategorias.forEach(
        (checkbox) => {

            if (checkbox.checked) {

                categoriasSeleccionadas.push(
                    checkbox.value
                );

            }

        }
    );


    const productosFiltrados =
        productos.filter((producto) => {

            const coincideTexto =
                producto.nombre
                    .toLowerCase()
                    .includes(texto)

                ||

                producto.description
                    .toLowerCase()
                    .includes(texto);


            const coincidePrecio =
                producto.precio >= precioMin
                &&
                producto.precio <= precioMax;


            const coincideMarca =
                marcaSeleccionada === ""
                ||
                producto.marca ===
                    marcaSeleccionada;


            const coincideCategoria =
                categoriasSeleccionadas.length === 0
                ||
                categoriasSeleccionadas.includes(
                    producto.categoria
                );


            return (
                coincideTexto
                &&
                coincidePrecio
                &&
                coincideMarca
                &&
                coincideCategoria
            );

        });


    mostrarProductos(
        productosFiltrados
    );

}


// Eventos filtros
inputBusqueda.addEventListener(
    "input",
    filtrarProductos
);

inputPrecioMin.addEventListener(
    "input",
    filtrarProductos
);

inputPrecioMax.addEventListener(
    "input",
    filtrarProductos
);

selectMarca.addEventListener(
    "change",
    filtrarProductos
);

checkCategorias.forEach(
    (checkbox) => {

        checkbox.addEventListener(
            "change",
            filtrarProductos
        );

    }
);


// Agregar producto al carrito
function agregarAlCarrito(indice) {

    const productoSeleccionado =
        productos[indice];


    // Buscamos si el producto ya existe en el carrito
    const productoExistente =
        carrito.find(
            (producto) =>
                producto.nombre === productoSeleccionado.nombre
        );


    if (productoExistente) {

        // Si ya existe aumentamos la cantidad
        productoExistente.cantidad =
            (productoExistente.cantidad || 1) + 1;

    } else {

        // Si no existe lo agregamos con cantidad 1
        carrito.push({
            ...productoSeleccionado,
            cantidad: 1
        });

    }


    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );


    actualizarContadorCarrito();


    alert(
        "Producto agregado al carrito"
    );

}


// Mostrar productos
mostrarProductos(productos);


// Actualizar contador inicial
actualizarContadorCarrito();