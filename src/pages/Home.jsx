import { useInventory } from '../context/InventoryContext';
import { STOCK_BAJO } from '../constants';
import StatsCards from '../components/StatsCards';
import InventoryTable from '../components/InventoryTable';

function Home() {
  const { products, incrementStock, decrementStock } = useInventory();

  const cambiarStock = (id, delta) => {
    if (delta > 0) incrementStock(id);
    else decrementStock(id);
  };

  const totalProductos = products.length;
  const unidadesTotales = products.reduce((suma, p) => suma + p.stock, 0);
  const conStockBajo = products.filter((p) => p.stock < STOCK_BAJO).length;

  return (
    <section>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Gestión de inventario</h2>
      <p className="mb-4 text-slate-600">
        Administra el stock de los productos del supermercado.
      </p>

      <StatsCards
        totalProductos={totalProductos}
        unidadesTotales={unidadesTotales}
        conStockBajo={conStockBajo}
      />

      <InventoryTable products={products} onCambiarStock={cambiarStock} />
    </section>
  );
}

export default Home;
