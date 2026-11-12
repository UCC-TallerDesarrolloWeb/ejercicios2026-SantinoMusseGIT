const BASE_URL = import.meta.env.VITE_BASE_URL;

// Obtener los productos del carrito
export async function getCart() {
  const response = await fetch(`${BASE_URL}cart`);

  if (!response.ok) {
    throw new Error("Error al obtener el carrito");
  }

  return response.json();
}

// Agregar un producto al carrito
export async function addToCart(producto) {
  const carrito = await getCart();

  // Comprobar si el producto ya está en el carrito
  const existente = carrito.find(
    (item) => String(item.productId) === String(producto.id)
  );

  if (existente) {
    // Si existe, aumentar su cantidad
    const response = await fetch(
      `${BASE_URL}cart/${existente.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cantidad: existente.cantidad + 1,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el carrito");
    }

    return response.json();
  }

  // Si no existe, agregarlo
  const response = await fetch(`${BASE_URL}cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1,
    }),
  });

  if (!response.ok) {
    throw new Error("Error al agregar al carrito");
  }

  return response.json();
}
export async function updateQty(id, cantidad) {
  const response = await fetch(`${BASE_URL}cart/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cantidad }),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la cantidad");
  }

  return response.json();
}

export async function removeItem(id) {
  const response = await fetch(`${BASE_URL}cart/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el producto");
  }
}

export async function deleteCart() {
  const productos = await getCart();

  await Promise.all(
    productos.map((producto) => removeItem(producto.id))
  );
}