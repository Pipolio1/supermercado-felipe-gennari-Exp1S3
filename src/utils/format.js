// Formatea un precio en pesos chilenos (CLP), ej: 1490 -> "$1.490"
export function formatPrecio(precio) {
  return '$' + precio.toLocaleString('es-CL');
}
