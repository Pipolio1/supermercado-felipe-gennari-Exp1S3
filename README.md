# Supermercado Felipe — Sistema de Gestión de Inventario

Sitio web de gestión de inventario para un supermercado, desarrollado con **React**, **Vite**, **React Router** y **Tailwind CSS** como una Single Page Application (SPA).

**Evaluación Sumativa — Desarrollo Frontend II (PFY2202), Semana 3**

## Sitio en línea

La aplicación está desplegada en GitHub Pages y disponible públicamente en:

**https://pipolio1.github.io/supermercado-felipe-gennari-Exp1S3/**

## Descripción

La aplicación gestiona el inventario de un supermercado mediante un **estado global** implementado con **Context API + useReducer**. El menú inferior permite navegar sin recargar la página entre todas las secciones del sitio:

- **Inventario** (`/`): lista de productos con marca, tipo, precio y stock, con botones para aumentar o disminuir unidades y alertas de stock bajo.
- **Agregar artículo** (`/agregar-articulo`): formulario controlado para ingresar nuevos artículos al inventario (nombre, marca, tipo, precio y stock inicial).
- **Listado** (`/listado-articulos`): tabla con todos los artículos actuales del inventario, con **filtro dinámico por tipo de producto**. El filtro actualiza la vista sin modificar los datos originales del inventario. Al hacer clic en el nombre de un artículo se abre su detalle.
- **Detalle de artículo** (`/listado-articulos/:id`): página con ruta dinámica que muestra la información completa del artículo seleccionado y permite **agregarlo al carrito** eligiendo la cantidad; las unidades agregadas se descuentan del stock del inventario.
- **Carrito** (`/carrito`): lista los artículos agregados al carrito con su cantidad, subtotal y total de la compra. El usuario puede **aumentar o disminuir cantidades** (o quitar artículos) y el inventario general se actualiza automáticamente: aumentar descuenta stock y disminuir o quitar lo devuelve. No es posible agregar más unidades que el stock disponible.
- **Quiénes somos** (`/quienes-somos`): misión, visión y valores del supermercado.
- **Nuestras tiendas** (`/nuestras-tiendas`): sucursales con dirección, ciudad y horario.
- **Contáctanos** (`/contactanos`): datos de contacto y formulario de mensajes.
- **Cómo comprar** (`/como-comprar`): pasos para realizar una compra.

El inventario y el carrito se **persisten en `localStorage`**, por lo que el estado sobrevive a recargas de la página en el mismo navegador.

## Tecnologías utilizadas

- React 19 (hooks: `useState`, `useEffect`, `useReducer`, `useContext`, `useMemo`, `useCallback`)
- [Vite](https://vite.dev/) (entorno de desarrollo y build)
- [React Router](https://reactrouter.com/) 7, paquete `react-router` (enrutamiento del lado del cliente, con rutas dinámicas)
- [Tailwind CSS 4](https://tailwindcss.com/) vía `@tailwindcss/vite` (framework CSS: todos los estilos son clases utilitarias)
- HTML, CSS y JavaScript
- GitHub Pages (despliegue)

## Desarrollo local

Para trabajar en el proyecto en tu propio computador necesitas [Node.js](https://nodejs.org/) instalado (versión 20.19 o superior, requerida por Vite 7).

En la carpeta del proyecto, instala las dependencias:

```bash
npm install
```

Luego inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicación se abrirá en [http://localhost:5173](http://localhost:5173). Esta es una versión local solo para desarrollo: los cambios en el código se recargan automáticamente en el navegador (HMR). El sitio público en GitHub Pages no se ve afectado hasta que se publique una nueva versión (ver sección siguiente).

Para volver a los datos iniciales del inventario durante las pruebas, borra la clave `supermercado-felipe-estado` del Local Storage del navegador (DevTools → Application → Local Storage) y recarga.

## Decisión de enrutamiento: HashRouter vs BrowserRouter

El proyecto usa `HashRouter` de React Router de forma deliberada. GitHub Pages es un alojamiento de archivos estáticos: no permite configurar el servidor para que todas las rutas respondan con `index.html`, que es el requisito de `BrowserRouter` en una SPA. Con `BrowserRouter`, visitar o recargar una URL interna directamente produciría un error 404 del servidor.

Las alternativas evaluadas fueron:

- **Truco del `404.html`** (copiar `index.html` como `404.html`): funciona, pero es un parche frágil que depende del comportamiento de error de GitHub Pages.
- **Cambiar de alojamiento** (Netlify, Vercel): permite `BrowserRouter` con redirects, pero sale del alcance del curso, que exige GitHub Pages.

Dado que el despliegue debe mantenerse en GitHub Pages, `HashRouter` es la opción técnicamente correcta: la navegación ocurre después del `#` y nunca llega al servidor, a costa de tener `#` en la URL.

## Gestión de estado global

El inventario y el carrito viven en un estado global (`src/context/InventoryContext.jsx`) implementado con Context API y dos `useReducer` (uno por estado, siguiendo la práctica de separar estados según funcionalidad y alcance):

- El reducer de **inventario** maneja tres acciones: `ADD_PRODUCT` (agregar artículo), `INCREMENT_STOCK` y `DECREMENT_STOCK` (ajustar unidades, sin bajar de cero).
- El reducer de **carrito** mantiene un mapa `{ id: cantidad }` con acciones para agregar, fijar cantidad y quitar ítems.
- **Sincronización carrito ↔ inventario**: cada acción del carrito despacha también la acción inversa sobre el stock (`addToCart` descuenta, `decrementCartItem` y `removeCartItem` devuelven), por lo que ambos estados nunca quedan inconsistentes.
- El `dispatch` queda encapsulado: el contexto expone acciones específicas (`addProduct`, `incrementStock`, `decrementStock`, `addToCart`, `incrementCartItem`, `decrementCartItem`, `removeCartItem`) creadas con `useCallback`, de modo que los consumidores no pueden enviar acciones arbitrarias a los reducers.
- Las acciones del carrito reciben el stock disponible y topan las cantidades: no se puede reservar más stock del que existe.
- Los identificadores de los artículos nuevos se generan con `crypto.randomUUID()`, evitando las colisiones posibles de `Date.now()` entre altas realizadas en el mismo milisegundo.
- El valor del provider y el carrito enriquecido (`cartItems`, que une cantidades con datos de producto) se memoizan con `useMemo`, por lo que sus referencias solo cambian cuando cambian los datos.
- Ambos estados se guardan en `localStorage` en cada cambio (`useEffect`) y se restauran al cargar la página.
- Cualquier página puede leer o modificar el estado mediante el hook `useInventory()`, sin pasar props manualmente entre componentes.

## Filtro del listado

El filtro por tipo de producto de **Listado** es un `useState` **local de esa página** (no se eleva al estado global, porque ninguna otra vista lo necesita). La lista visible se deriva del inventario con `Array.filter`, por lo que los datos originales del inventario nunca se modifican: al cambiar o quitar el filtro, todos los artículos siguen intactos.

## Validación de formularios

Los formularios de **Agregar artículo** y **Contáctanos** comparten los validadores de `src/utils/validators.js`, que aplican expresiones regulares y reglas diferenciadas por campo (texto de producto, nombre de persona, correo, precio y stock como enteros). Cada función devuelve un mensaje de error específico que se muestra junto al campo a través del componente `FormField`, que además incorpora `aria-invalid` y `aria-describedby` para que los lectores de pantalla anuncien el problema. Los formularios usan `noValidate` para que la validación la gobierne esta lógica y no los mensajes genéricos del navegador.

## Otros comandos disponibles

### `npm run build`

Genera la versión optimizada para producción en la carpeta `dist`.

### `npm run preview`

Sirve localmente la build de producción para revisarla antes de desplegar.

## Estructura del proyecto

```
src/
├── main.jsx                    # Punto de entrada de la aplicación
├── App.jsx                     # Layout principal, React Router e InventoryProvider
├── index.css                   # Directiva de Tailwind CSS y estilos base
├── routes.js                   # Definición centralizada de rutas (path, etiqueta y componente)
├── constants.js                # Constantes compartidas (umbral de stock bajo)
├── context/
│   └── InventoryContext.jsx    # Estado global: inventario + carrito (Context API + useReducer)
├── components/
│   ├── BottomNav.jsx           # Menú inferior: genera los NavLink desde routes.js
│   ├── StatsCards.jsx          # Tarjetas de estadísticas del inventario
│   ├── InventoryTable.jsx      # Tabla de productos; con control de stock y/o enlace al detalle
│   ├── ProductRow.jsx          # Fila de producto (acciones y enlace opcionales según la tabla)
│   ├── CartRow.jsx             # Fila del carrito: cantidad +/-, subtotal y quitar
│   ├── FormField.jsx           # Campo de formulario: etiqueta, control y error accesible
│   └── Button.jsx              # Botón principal compartido por los formularios
├── utils/
│   ├── format.js               # Formato de precios en CLP (formatPrecio)
│   └── validators.js           # Validadores con regex compartidos por los formularios
├── data/
│   ├── products.js             # Datos iniciales del inventario y tipos de producto
│   ├── tiendas.js              # Datos de las sucursales
│   └── pasosCompra.js          # Pasos del proceso de compra
└── pages/
    ├── Home.jsx                # Página principal: estadísticas y tabla de inventario
    ├── AgregarArticulo.jsx     # Formulario para ingresar nuevos artículos
    ├── ListadoArticulos.jsx    # Tabla con filtro por tipo y enlace al detalle
    ├── DetalleArticulo.jsx     # Detalle del artículo (ruta dinámica) y agregar al carrito
    ├── Carrito.jsx             # Carrito de compras con cantidades sincronizadas al stock
    ├── QuienesSomos.jsx
    ├── NuestrasTiendas.jsx
    ├── Contactanos.jsx
    ├── ComoComprar.jsx
    └── NotFound.jsx            # Página para rutas no encontradas
```

## Decisiones de organización

- **Rutas centralizadas** (`src/routes.js`): `App.jsx` y `BottomNav.jsx` consumen el mismo arreglo de rutas, por lo que agregar o renombrar una sección solo requiere editar un lugar. Las rutas con la marca `oculta` (como el detalle de artículo, que usa el parámetro dinámico `:id`) existen en el router pero no aparecen en el menú.
- **Estado global con Context API + useReducer** (`src/context/InventoryContext.jsx`): el inventario y el carrito son compartidos por todas las páginas y las actualizaciones siguen el patrón de acciones (type + payload), lo que mantiene la lógica de estado centralizada, inmutable y predecible.
- **Separación de responsabilidades en el inventario**: `Home` calcula las estadísticas y coordina las acciones; `StatsCards`, `InventoryTable` y `ProductRow` son componentes de presentación reutilizables que reciben datos por props.
- **Tabla única de inventario**: `InventoryTable` es usada tanto por **Inventario** (con `onCambiarStock`, mostrando la columna de acciones) como por **Listado** (en modo solo lectura, con `conEnlaceDetalle` para navegar al detalle), evitando duplicar la tabla entre vistas.
- **Utilidades y controles compartidos**: `formatPrecio` vive en `src/utils/format.js` y los validadores en `src/utils/validators.js`; `FormField` y `Button` unifican los controles de los formularios.
- **Datos uniformes en `data/`**: productos, tiendas y pasos de compra viven fuera de las páginas, de modo que el contenido se actualiza sin tocar los componentes.
- **Estilos con Tailwind CSS**: todos los estilos son clases utilitarias aplicadas directamente en el JSX; no hay hojas de estilo personalizadas por componente.
