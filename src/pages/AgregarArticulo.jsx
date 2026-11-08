import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { TIPOS_PRODUCTO } from '../data/products';
import FormField from '../components/FormField';
import Button from '../components/Button';
import {
  validarNombreArticulo,
  validarMarca,
  validarPrecio,
  validarStock,
} from '../utils/validators';

const formularioInicial = {
  nombre: '',
  marca: '',
  tipo: TIPOS_PRODUCTO[0],
  precio: '',
  stock: '',
};

function AgregarArticulo() {
  const { addProduct } = useInventory();
  const [form, setForm] = useState(formularioInicial);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Al corregir el campo se limpia su mensaje de error
    if (errores[name]) setErrores({ ...errores, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {
      nombre: validarNombreArticulo(form.nombre),
      marca: validarMarca(form.marca),
      precio: validarPrecio(form.precio),
      stock: validarStock(form.stock),
    };
    setErrores(nuevosErrores);
    if (Object.values(nuevosErrores).some(Boolean)) return;

    addProduct({
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      tipo: form.tipo,
      precio: Number(form.precio),
      stock: Number(form.stock),
    });

    setForm(formularioInicial);
    setErrores({});
    setEnviado(true);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Agregar artículo</h2>
      <p className="mb-4 text-slate-600">
        Ingresa un nuevo artículo al inventario del supermercado.
      </p>

      {enviado ? (
        <div className="bg-green-100 border border-green-700 rounded-lg p-4 text-green-900">
          <p>El artículo fue agregado correctamente al inventario.</p>
          <Button onClick={() => setEnviado(false)}>
            Agregar otro artículo
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-3 bg-white rounded-lg shadow p-5"
        >
          <FormField
            id="nombre"
            label="Nombre del artículo"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Yogur batido frutilla 1 kg"
            error={errores.nombre}
          />

          <FormField
            id="marca"
            label="Marca"
            type="text"
            value={form.marca}
            onChange={handleChange}
            placeholder="Ej: Soprole"
            error={errores.marca}
          />

          <FormField
            id="tipo"
            label="Tipo de producto"
            as="select"
            value={form.tipo}
            onChange={handleChange}
          >
            {TIPOS_PRODUCTO.map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </FormField>

          <FormField
            id="precio"
            label="Precio (CLP)"
            type="number"
            min="0"
            value={form.precio}
            onChange={handleChange}
            placeholder="Ej: 1990"
            error={errores.precio}
          />

          <FormField
            id="stock"
            label="Stock inicial"
            type="number"
            min="0"
            value={form.stock}
            onChange={handleChange}
            placeholder="Ej: 10"
            error={errores.stock}
          />

          <Button type="submit">Agregar al inventario</Button>
        </form>
      )}
    </section>
  );
}

export default AgregarArticulo;
