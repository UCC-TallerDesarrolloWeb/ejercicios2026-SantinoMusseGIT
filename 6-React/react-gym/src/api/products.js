const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getProducts(signal) {
  const response = await fetch(`${BASE_URL}products`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  return response.json();
}