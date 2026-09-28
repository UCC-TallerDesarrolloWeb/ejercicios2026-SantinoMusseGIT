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
    description: "Protectores de Pie habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["XXS", "XS", "S", "M", "L", "XL"],
    precio: 35000,
    web: "https://www.daedo.com/collections/collection-itf-gloves/products/pritf-2022",
    imagen: "protectores-manos.webp",
  },
];

let cargarProductos = () => {
  let contenido = " ";

  productos.forEach((elemento, id) => {
    contenido += `<div>
                <img src="${elemento.imagen}" alt="elemento.nombre">
                <h3>${elemento.nombre}</h3>
                <p>${elemento.precio}</p>
                <button type="button" onclick="mostrarModal(${id})">Ver Detalles
                </button>
                <button type="button" onclick="agregarAlCarrito(${id})">Agregar al Carrito
                </button>
            </div>`;
  });

  };  

  let agregarAlcarrito = (id) => {
    let carritoList = localStorage.getItem("carrito");
    console.log(carritoList);

    if(carritoList == null){
      carritoList = [];
    }else{
      carritoList = JSON.parse(carritoList);
    }
    carritoList.push(id);
    localStorage.setItem("carrito", JSON.stringify(carritoList));
  };

  let mostrarModal = (id) => {
    document.getElmenteById("titulo-producto").innerText = productos[id].nombre;
    document.getElementById("descripcion-producto").innerText =
      productos[id].description;
    document.getElementById("precio-producto").innerText = productos[id].precio;
    document.getElementById("imagen-producto").src = productos[id].imagen;
    document.getElementById("enlace-producto").href = productos[id].web;
  }

let cargarCarrito = () => {
  let carritoList = localStorage.getItem("carrito");
  let contenido = " ";

  if(carritoList == null){
    contenido = "<p>El carrito está vacío</p>";
  }else{
    carritoList = JSON.parse(carritoList);
    carritoList.forEach((num) => {
      contenido += `<div>
                <img src="${productos[num].imagen}" alt="productos[num].nombre">
                <h3>${productos[num].nombre}</h3>
                <p>${productos[num].precio}</p>
            </div>`;
    });
  }
  document.getElementById("contenido-carrito").innerHTML = contenido;
}