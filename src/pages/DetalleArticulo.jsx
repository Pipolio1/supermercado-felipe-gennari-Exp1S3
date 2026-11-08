import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useInventory } from '../context/InventoryContext';
import { STOCK_BAJO } from '../constants';
import { formatPrecio } from '../utils/format';
import FormField from '../components/FormField';
import Button from '../components/Button';
import NotFound from './NotFound';

function DetalleArticulo() {
  const { id } = useParams();
  const { products, addToCart } = useInventory();
  const [cantidad, setCantidad] = useState('1');
  const [agregado, setAgregado] = useState(false);

  // Los ids iniciales son numéricos y los nuevos son UUID; se compara como texto.
  const producto = products.find((p) => String(p.id) === id);

  if (!producto) {
    return <NotFound />;
  }

  const sinStock = producto.stock === 0;
  const stockBajo = producto.stock > 0 && producto.stock < STOCK_BAJO;

  const handleSubmit = (e) => {
    e.preventDefault();
    const unidades = Math.max(1, Math.min(Number(cantidad) || 1, producto.stock));
    addToCart(producto.id, unidades, producto.stock);
    setCantidad('1');
    setAgregado(true);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-green-700 mb-2">{producto.nombre}</h2>
      <p className="mb-4 text-slate-600">Detalle del artículo seleccionado.</p>

      <div className="bg-white rounded-lg shadow p-5 mb-4">
        <p><strong>Marca:</strong> {producto.marca}</p>
        <p><strong>Tipo:</strong> {producto.tipo}</p>
        <p><strong>Precio:</strong> {formatPrecio(producto.precio)}</p>
        <p>
          <strong>Stock disponible:</strong> {producto.stock}
          {stockBajo && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-red-600 text-white text-xs">
              Stock bajo
            </span>
          )}
        </p>
      </div>

      {agregado && (
        <p className="bg-green-100 border border-green-700 rounded-lg p-4 text-green-900 mb-4">
          El artículo fue agregado al carrito y el stock del inventario se actualizó.
        </p>
      )}

      {sinStock ? (
        <p className="bg-red-100 border border-red-600 rounded-lg p-4 text-red-800 mb-4">
          Sin stock disponible por el momento.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 bg-white rounded-lg shadow p-5 mb-4"
        >
          <FormField
            id="cantidad"
            label="Cantidad"
            type="number"
            min="1"
            max={producto.stock}
            value={cantidad}
            onChange={(e) => {
              setCantidad(e.target.value);
              setAgregado(false);
            }}
          />
          <Button type="submit">Agregar al carrito</Button>
        </form>
      )}

      <p className="flex gap-4">
        <Link to="/listado-articulos" className="text-green-700 font-medium hover:underline">
          Volver al listado
        </Link>
        <Link to="/carrito" className="text-green-700 font-medium hover:underline">
          Ir al carrito
        </Link>
      </p>
    </section>
  );
}

export default DetalleArticulo;
