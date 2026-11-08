import pasosCompra from '../data/pasosCompra';

function ComoComprar() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Cómo comprar</h2>
      <p className="mb-4 text-slate-600">
        Comprar en Supermercado Felipe es muy fácil. Sigue estos pasos:
      </p>
      <ol className="list-none p-0 flex flex-col gap-4">
        {pasosCompra.map((paso) => (
          <li key={paso.titulo} className="bg-white rounded-lg shadow p-5">
            <h3 className="text-green-700 font-bold mt-0">{paso.titulo}</h3>
            <p className="mb-0">{paso.descripcion}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default ComoComprar;
