// Botón principal del sitio, compartido por los formularios.
function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`mt-2 bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-md text-base ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
