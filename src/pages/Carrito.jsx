import { Link } from 'react-router';
import { useInventory } from '../context/InventoryContext';
import { formatPrecio } from '../utils/format';
import CartRow from '../components/CartRow';

function Carrito() {
  const { cartItems, incrementCartItem, decrementCartItem, removeCartItem } = useInventory();

  const total = cartItems.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  return (
    <section>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Carrito de compras</h2>
      <p className="mb-4 text-slate-600">
        Ajusta las cantidades de tus artículos; el inventario se actualiza automáticamente.
      </p>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-4 text-slate-600">
          <p>Tu carrito está vacío.</p>
          <p>
            <Link to="/listado-articulos" className="text-green-700 font-medium hover:underline">
              Ir al listado de artículos
            </Link>
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr>
                  <th className="bg-green-700 text-white px-3 py-2.5 text-left">Producto</th>
                  <th className="bg-green-700 text-white px-3 py-2.5 text-left">Precio unitario</th>
                  <th className="bg-green-700 text-white px-3 py-2.5 text-left">Cantidad</th>
                  <th className="bg-green-700 text-white px-3 py-2.5 text-left">Subtotal</th>
                  <th className="bg-green-700 text-white px-3 py-2.5 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <CartRow
                    key={item.id}
                    item={item}
                    onIncrementar={incrementCartItem}
                    onDisminuir={decrementCartItem}
                    onQuitar={removeCartItem}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-right text-lg font-bold text-green-700">
            Total: {formatPrecio(total)}
          </p>
        </>
      )}
    </section>
  );
}

export default Carrito;
