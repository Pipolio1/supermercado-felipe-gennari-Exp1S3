import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { TIPOS_PRODUCTO } from '../data/products';
import InventoryTable from '../components/InventoryTable';
import FormField from '../components/FormField';

function ListadoArticulos() {
  const { products } = useInventory();
  // El filtro es un estado local de esta página: la lista visible se deriva
  // del inventario sin modificarlo, por lo que los datos originales
  // permanecen intactos.
  const [tipoSeleccionado, setTipoSeleccionado] = useState('todos');

  const productosVisibles =
    tipoSeleccionado === 'todos'
      ? products
      : products.filter((p) => p.tipo === tipoSeleccionado);

  return (
    <section>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Listado de artículos</h2>
      <p className="mb-4 text-slate-600">
        Todos los artículos disponibles actualmente en el inventario. Haz clic en un
        artículo para ver su detalle y agregarlo al carrito.
      </p>

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <FormField
          id="filtro-tipo"
          label="Filtrar por tipo de producto"
          as="select"
          value={tipoSeleccionado}
          onChange={(e) => setTipoSeleccionado(e.target.value)}
        >
          <option value="todos">Todos los tipos</option>
          {TIPOS_PRODUCTO.map((tipo) => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </FormField>
      </div>

      <InventoryTable products={productosVisibles} conEnlaceDetalle />
    </section>
  );
}

export default ListadoArticulos;
