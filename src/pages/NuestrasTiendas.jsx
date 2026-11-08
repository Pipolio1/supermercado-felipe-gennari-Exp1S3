import tiendas from '../data/tiendas';

function NuestrasTiendas() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Nuestras tiendas</h2>
      <p className="mb-4 text-slate-600">Encuentra tu tienda Supermercado Felipe más cercana:</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 mt-4">
        {tiendas.map((tienda) => (
          <div className="bg-white rounded-lg shadow p-5" key={tienda.nombre}>
            <h3 className="text-green-700 font-bold mt-0">{tienda.nombre}</h3>
            <p>
              <strong>Dirección:</strong> {tienda.direccion}
              <br />
              <strong>Ciudad:</strong> {tienda.ciudad}
              <br />
              <strong>Horario:</strong> {tienda.horario}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NuestrasTiendas;
