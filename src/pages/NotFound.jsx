import { Link } from 'react-router';

function NotFound() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Página no encontrada</h2>
      <p className="mb-4 text-slate-600">La ruta que buscas no existe en Supermercado Felipe.</p>
      <p>
        <Link to="/" className="text-green-700 font-medium hover:underline">
          Volver al inventario
        </Link>
      </p>
    </section>
  );
}

export default NotFound;
