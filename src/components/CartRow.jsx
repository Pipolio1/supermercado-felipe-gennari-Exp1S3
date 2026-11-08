import { Link } from 'react-router';
import { formatPrecio } from '../utils/format';

function CartRow({ item, onIncrementar, onDisminuir, onQuitar }) {
  const tdClass = 'px-3 py-2.5 border-b border-slate-200';
  const sinStockDisponible = item.stock === 0;

  return (
    <tr>
      <td className={tdClass}>
        <Link
          to={`/listado-articulos/${item.id}`}
          className="text-green-700 font-medium hover:underline"
        >
          {item.nombre}
        </Link>
      </td>
      <td className={tdClass}>{formatPrecio(item.precio)}</td>
      <td className={tdClass}>
        <button
          onClick={() => onDisminuir(item.id, item.cantidad)}
          aria-label={`Disminuir cantidad de ${item.nombre}`}
          className="mr-2 px-2.5 py-1 rounded bg-green-700 text-white"
        >
          −
        </button>
        {item.cantidad}
        <button
          onClick={() => onIncrementar(item.id, item.cantidad, item.stock)}
          disabled={sinStockDisponible}
          aria-label={`Aumentar cantidad de ${item.nombre}`}
          className="ml-2 px-2.5 py-1 rounded bg-green-700 text-white disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          +
        </button>
      </td>
      <td className={tdClass}>{formatPrecio(item.precio * item.cantidad)}</td>
      <td className={tdClass}>
        <button
          onClick={() => onQuitar(item.id, item.cantidad)}
          aria-label={`Quitar ${item.nombre} del carrito`}
          className="px-2.5 py-1 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Quitar
        </button>
      </td>
    </tr>
  );
}

export default CartRow;
