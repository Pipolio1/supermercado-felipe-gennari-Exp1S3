// Validadores compartidos por los formularios del sitio.
// Cada función recibe el valor del campo y devuelve un mensaje de error
// descriptivo, o '' si el valor es válido.

// Letras (con tildes y ñ), números, espacios y signos habituales de productos.
const REGEX_TEXTO_PRODUCTO = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ0-9 .,%()/-]+$/;
// Solo letras (con tildes y ñ) y espacios, para nombres de personas.
const REGEX_NOMBRE_PERSONA = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]+$/;
// Solo dígitos, para precios y stock (enteros sin signo ni decimales).
const REGEX_ENTERO = /^\d+$/;
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validarTextoProducto(valor, etiqueta, { min, max }) {
  const texto = valor.trim();
  if (texto === '') return `${etiqueta} es obligatorio.`;
  if (texto.length < min) return `${etiqueta} debe tener al menos ${min} caracteres.`;
  if (texto.length > max) return `${etiqueta} no puede superar ${max} caracteres.`;
  if (!REGEX_TEXTO_PRODUCTO.test(texto))
    return `${etiqueta} solo puede contener letras, números, espacios y los signos . , % ( ) - /`;
  return '';
}

export function validarNombreArticulo(valor) {
  return validarTextoProducto(valor, 'El nombre del artículo', { min: 3, max: 60 });
}

export function validarMarca(valor) {
  return validarTextoProducto(valor, 'La marca', { min: 2, max: 40 });
}

export function validarPrecio(valor) {
  const texto = String(valor).trim();
  if (texto === '') return 'El precio es obligatorio.';
  if (!REGEX_ENTERO.test(texto)) return 'El precio debe ser un número entero, sin decimales ni signos.';
  if (Number(texto) <= 0) return 'El precio debe ser mayor que 0.';
  if (Number(texto) > 99999999) return 'El precio no puede superar $99.999.999.';
  return '';
}

export function validarStock(valor) {
  const texto = String(valor).trim();
  if (texto === '') return 'El stock inicial es obligatorio.';
  if (!REGEX_ENTERO.test(texto)) return 'El stock debe ser un número entero igual o mayor que 0.';
  if (Number(texto) > 99999) return 'El stock no puede superar 99.999 unidades.';
  return '';
}

export function validarNombrePersona(valor) {
  const texto = valor.trim();
  if (texto === '') return 'El nombre es obligatorio.';
  if (texto.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
  if (texto.length > 60) return 'El nombre no puede superar 60 caracteres.';
  if (!REGEX_NOMBRE_PERSONA.test(texto)) return 'El nombre solo puede contener letras y espacios.';
  return '';
}

export function validarCorreo(valor) {
  const texto = valor.trim();
  if (texto === '') return 'El correo electrónico es obligatorio.';
  if (!REGEX_CORREO.test(texto)) return 'Ingresa un correo electrónico válido (ej: nombre@correo.cl).';
  return '';
}

export function validarMensaje(valor) {
  const texto = valor.trim();
  if (texto === '') return 'El mensaje es obligatorio.';
  if (texto.length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
  if (texto.length > 500) return 'El mensaje no puede superar 500 caracteres.';
  return '';
}
