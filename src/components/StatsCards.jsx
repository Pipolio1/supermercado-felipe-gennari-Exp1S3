function StatsCards({ totalProductos, unidadesTotales, conStockBajo }) {
  const stats = [
    { numero: totalProductos, etiqueta: 'Productos' },
    { numero: unidadesTotales, etiqueta: 'Unidades totales' },
    { numero: conStockBajo, etiqueta: 'Con stock bajo' },
  ];

  return (
    <div className="flex gap-4 flex-wrap mt-4 mb-6">
      {stats.map(({ numero, etiqueta }) => (
        <div
          className="bg-white rounded-lg shadow px-6 py-4 flex flex-col items-center min-w-32"
          key={etiqueta}
        >
          <span className="text-2xl font-bold text-green-700">{numero}</span>
          <span className="text-sm text-slate-500">{etiqueta}</span>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
