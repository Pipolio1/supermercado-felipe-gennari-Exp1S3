import Home from './pages/Home';
import AgregarArticulo from './pages/AgregarArticulo';
import ListadoArticulos from './pages/ListadoArticulos';
import DetalleArticulo from './pages/DetalleArticulo';
import Carrito from './pages/Carrito';
import QuienesSomos from './pages/QuienesSomos';
import NuestrasTiendas from './pages/NuestrasTiendas';
import Contactanos from './pages/Contactanos';
import ComoComprar from './pages/ComoComprar';

// Definición centralizada de las rutas navegables del sitio.
// App.jsx las usa para configurar React Router y BottomNav para el menú,
// evitando duplicar paths y etiquetas. Las rutas con `oculta` existen en el
// router pero no aparecen en el menú inferior.
const routes = [
  { path: '/', label: 'Inventario', Component: Home, end: true },
  { path: '/agregar-articulo', label: 'Agregar artículo', Component: AgregarArticulo },
  { path: '/listado-articulos', label: 'Listado', Component: ListadoArticulos },
  { path: '/listado-articulos/:id', Component: DetalleArticulo, oculta: true },
  { path: '/carrito', label: 'Carrito', Component: Carrito },
  { path: '/quienes-somos', label: 'Quiénes somos', Component: QuienesSomos },
  { path: '/nuestras-tiendas', label: 'Nuestras tiendas', Component: NuestrasTiendas },
  { path: '/contactanos', label: 'Contáctanos', Component: Contactanos },
  { path: '/como-comprar', label: 'Cómo comprar', Component: ComoComprar },
];

export default routes;
