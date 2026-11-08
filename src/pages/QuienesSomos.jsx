function QuienesSomos() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Quiénes somos</h2>
      <p className="mb-4 text-slate-600">
        Somos <strong>Supermercado Felipe</strong>, un supermercado familiar chileno con más de 20 años
        de trayectoria, comprometido con entregar productos frescos y de calidad a precios justos.
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 mt-4">
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-green-700 font-bold mt-0">Misión</h3>
          <p>
            Acercar a cada familia productos de primera necesidad con la mejor relación
            precio-calidad, brindando una atención cercana y un servicio de excelencia.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-green-700 font-bold mt-0">Visión</h3>
          <p>
            Ser el supermercado de referencia en cada comunidad donde operamos, reconocidos por
            nuestra frescura, variedad y compromiso con el cliente.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-green-700 font-bold mt-0">Valores</h3>
          <p>
            Honestidad, cercanía, respeto por nuestros clientes y colaboradores, y compromiso con
            el desarrollo de las comunidades locales.
          </p>
        </div>
      </div>
    </section>
  );
}

export default QuienesSomos;
