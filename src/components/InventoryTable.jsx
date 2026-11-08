import ProductRow from './ProductRow';

// Tabla de inventario compartida por Home y ListadoArticulos.
// Si se entrega onCambiarStock, muestra la columna de acciones (+/-);
// sin ella funciona como tabla de solo lectura.
// Con conEnlaceDetalle, el nombre del producto enlaza a su página de detalle.
function InventoryTable({ products, onCambiarStock, conEnlaceDetalle }) {
  const thClass = 'bg-green-700 text-white px-3 py-2.5 text-left';
  const conAcciones = typeof onCambiarStock === 'function';

  if (products.length === 0) {
    return (
      <p className="bg-white rounded-lg shadow p-4 text-slate-600">
        No hay artículos en el inventario.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr>
            <th className={thClass}>Producto</th>
            <th className={thClass}>Marca</th>
            <th className={thClass}>Tipo</th>
            <th className={thClass}>Precio</th>
            <th className={thClass}>Stock</th>
            {conAcciones && <th className={thClass}>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((producto) => (
            <ProductRow
              key={producto.id}
              producto={producto}
              onCambiarStock={conAcciones ? onCambiarStock : undefined}
              conEnlaceDetalle={conEnlaceDetalle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
