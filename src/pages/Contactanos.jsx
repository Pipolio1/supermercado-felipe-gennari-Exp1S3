import { useState } from 'react';
import FormField from '../components/FormField';
import Button from '../components/Button';
import {
  validarNombrePersona,
  validarCorreo,
  validarMensaje,
} from '../utils/validators';

const formularioInicial = {
  nombre: '',
  correo: '',
  mensaje: '',
};

function Contactanos() {
  const [form, setForm] = useState(formularioInicial);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errores[name]) setErrores({ ...errores, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {
      nombre: validarNombrePersona(form.nombre),
      correo: validarCorreo(form.correo),
      mensaje: validarMensaje(form.mensaje),
    };
    setErrores(nuevosErrores);
    if (Object.values(nuevosErrores).some(Boolean)) return;

    setForm(formularioInicial);
    setErrores({});
    setEnviado(true);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Contáctanos</h2>
      <p className="mb-4 text-slate-600">
        ¿Tienes dudas, sugerencias o reclamos? Escríbenos y te responderemos a la brevedad.
      </p>

      <div className="bg-white rounded-lg shadow p-5 mb-6">
        <p><strong>Teléfono:</strong> +56 2 2345 6789</p>
        <p><strong>Correo:</strong> contacto@supermercadofelipe.cl</p>
        <p><strong>Horario de atención:</strong> Lunes a viernes, 09:00 - 18:00</p>
      </div>

      {enviado ? (
        <p className="bg-green-100 border border-green-700 rounded-lg p-4 text-green-900">
          ¡Gracias por escribirnos! Tu mensaje fue enviado correctamente.
        </p>
      ) : (
        <form
          className="flex flex-col gap-3 bg-white rounded-lg shadow p-5"
          onSubmit={handleSubmit}
          noValidate
        >
          <FormField
            id="nombre"
            label="Nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: María Pérez"
            error={errores.nombre}
          />

          <FormField
            id="correo"
            label="Correo electrónico"
            type="email"
            value={form.correo}
            onChange={handleChange}
            placeholder="Ej: maria@correo.cl"
            error={errores.correo}
          />

          <FormField
            id="mensaje"
            label="Mensaje"
            as="textarea"
            rows="5"
            value={form.mensaje}
            onChange={handleChange}
            placeholder="Escribe tu mensaje aquí..."
            error={errores.mensaje}
          />

          <Button type="submit">Enviar mensaje</Button>
        </form>
      )}
    </section>
  );
}

export default Contactanos;
