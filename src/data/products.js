const products = [
  { id: 1, nombre: 'Arroz grano largo 1 kg', marca: 'Tucapel', tipo: 'Despensa', precio: 1490, stock: 25 },
  { id: 2, nombre: 'Aceite vegetal 1 L', marca: 'Chef', tipo: 'Despensa', precio: 2990, stock: 18 },
  { id: 3, nombre: 'Leche entera 1 L', marca: 'Colun', tipo: 'Lácteos', precio: 1190, stock: 30 },
  { id: 4, nombre: 'Queso gauda laminado 250 g', marca: 'Quillayes', tipo: 'Lácteos', precio: 3490, stock: 8 },
  { id: 5, nombre: 'Pan de molde integral', marca: 'Ideal', tipo: 'Panadería', precio: 1890, stock: 12 },
  { id: 6, nombre: 'Manzana fuji (kg)', marca: 'Sin marca', tipo: 'Frutas y verduras', precio: 1690, stock: 40 },
  { id: 7, nombre: 'Tomate (kg)', marca: 'Sin marca', tipo: 'Frutas y verduras', precio: 1390, stock: 4 },
  { id: 8, nombre: 'Pollo entero (kg)', marca: 'Agrosuper', tipo: 'Carnes', precio: 3990, stock: 10 },
  { id: 9, nombre: 'Bebida cola 1,5 L', marca: 'Coca-Cola', tipo: 'Bebidas', precio: 1790, stock: 22 },
  { id: 10, nombre: 'Agua mineral 1,6 L', marca: 'Cachantun', tipo: 'Bebidas', precio: 990, stock: 3 },
  { id: 11, nombre: 'Detergente líquido 750 ml', marca: 'Omo', tipo: 'Limpieza', precio: 4290, stock: 15 },
  { id: 12, nombre: 'Papel higiénico 4 rollos', marca: 'Elite', tipo: 'Limpieza', precio: 2590, stock: 20 },
];

// Tipos de producto disponibles, usados en el formulario de nuevo artículo
export const TIPOS_PRODUCTO = [...new Set(products.map((p) => p.tipo))];

export default products;
