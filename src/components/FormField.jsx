// Campo de formulario reutilizable: etiqueta + control + mensaje de error.
// Cuando hay error, el control recibe aria-invalid y se vincula al mensaje
// mediante aria-describedby para que los lectores de pantalla lo anuncien.
function FormField({ id, label, error, as = 'input', className = '', children, ...props }) {
  const Control = as;
  const controlClass = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 ${
    error ? 'border-red-500' : 'border-slate-300'
  } ${className}`;

  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-slate-700" htmlFor={id}>
        {label}
      </label>
      <Control
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={controlClass}
        {...props}
      >
        {children}
      </Control>
      {error && (
        <p id={`${id}-error`} role="alert" className="m-0 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
