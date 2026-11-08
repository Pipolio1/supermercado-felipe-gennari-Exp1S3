import { Link } from 'react-router';
import { STOCK_BAJO } from '../constants';
import { formatPrecio } from '../utils/format';

function ProductRow({ producto, onCambiarStock, conEnlaceDetalle }) {
  const stockBajo = producto.stock < STOCK_BAJO;
  const tdClass = 'px-3 py-2.5 border-b border-slate-200';

  return (
    <tr className={stockBajo ? 'bg-red-100' : ''}>
      <td className={tdClass}>
        {conEnlaceDetalle ? (
          <Link
            to={`/listado-articulos/${producto.id}`}
            className="text-green-700 font-medium hover:underline"
          >
            {producto.nombre}
          </Link>
        ) : (
          producto.nombre
        )}
      </td>
      <td className={tdClass}>{producto.marca}</td>
      <td className={tdClass}>{producto.tipo}</td>
      <td className={tdClass}>{formatPrecio(producto.precio)}</td>
      <td className={tdClass}>
        {producto.stock}
        {stockBajo && (
          <span className="ml-2 px-2 py-0.5 rounded-full bg-red-600 text-white text-xs">
            Stock bajo
          </span>
        )}
      </td>
      {onCambiarStock && (
        <td className={tdClass}>
          <button
            onClick={() => onCambiarStock(producto.id, -1)}
            disabled={producto.stock === 0}
            aria-label={`Disminuir stock de ${producto.nombre}`}
            className="mr-2 px-2.5 py-1 rounded bg-green-700 text-white disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            −
          </button>
          <button
            onClick={() => onCambiarStock(producto.id, 1)}
            aria-label={`Aumentar stock de ${producto.nombre}`}
            className="px-2.5 py-1 rounded bg-green-700 text-white"
          >
            +
          </button>
        </td>
      )}
    </tr>
  );
}

export default ProductRow;
