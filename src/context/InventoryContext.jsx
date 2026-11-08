import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import initialProducts from '../data/products';

// Clave de localStorage donde se persiste el inventario y el carrito,
// para que el estado sobreviva a recargas de la página.
const STORAGE_KEY = 'supermercado-felipe-estado';

function cargarEstadoGuardado() {
  try {
    const texto = localStorage.getItem(STORAGE_KEY);
    return texto ? JSON.parse(texto) : null;
  } catch {
    return null;
  }
}

// Acciones internas del reducer de inventario
const ACTIONS = {
  ADD_PRODUCT: 'add-product',
  INCREMENT_STOCK: 'increment-stock',
  DECREMENT_STOCK: 'decrement-stock',
};

// Acciones internas del reducer del carrito
// El estado es un mapa { [productoId]: cantidad }
const CART_ACTIONS = {
  ADD: 'add',
  SET_QUANTITY: 'set-quantity',
  REMOVE: 'remove',
};

function inventoryReducer(products, action) {
  switch (action.type) {
    case ACTIONS.ADD_PRODUCT:
      return [...products, action.payload];
    case ACTIONS.INCREMENT_STOCK:
      return products.map((p) =>
        p.id === action.payload.id ? { ...p, stock: p.stock + action.payload.amount } : p
      );
    case ACTIONS.DECREMENT_STOCK:
      return products.map((p) =>
        p.id === action.payload.id
          ? { ...p, stock: Math.max(0, p.stock - action.payload.amount) }
          : p
      );
    default:
      return products;
  }
}

function cartReducer(cart, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD: {
      const actual = cart[action.payload.id] || 0;
      return { ...cart, [action.payload.id]: actual + action.payload.amount };
    }
    case CART_ACTIONS.SET_QUANTITY: {
      if (action.payload.amount <= 0) {
        const { [action.payload.id]: _omitido, ...resto } = cart;
        return resto;
      }
      return { ...cart, [action.payload.id]: action.payload.amount };
    }
    case CART_ACTIONS.REMOVE: {
      const { [action.payload.id]: _omitido, ...resto } = cart;
      return resto;
    }
    default:
      return cart;
  }
}

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const estadoGuardado = cargarEstadoGuardado();
  const [products, dispatchInventory] = useReducer(
    inventoryReducer,
    estadoGuardado?.products ?? initialProducts
  );
  const [cart, dispatchCart] = useReducer(cartReducer, estadoGuardado?.cart ?? {});

  // Cada cambio de inventario o carrito se guarda en localStorage.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ products, cart }));
  }, [products, cart]);

  // El dispatch queda encapsulado: los consumidores solo usan estas acciones
  // específicas y no pueden enviar acciones arbitrarias al reducer.
  const addProduct = useCallback((producto) => {
    // crypto.randomUUID() evita las colisiones posibles con Date.now()
    // cuando se agregan dos artículos en el mismo milisegundo.
    dispatchInventory({
      type: ACTIONS.ADD_PRODUCT,
      payload: { ...producto, id: crypto.randomUUID() },
    });
  }, []);

  const incrementStock = useCallback((id) => {
    dispatchInventory({ type: ACTIONS.INCREMENT_STOCK, payload: { id, amount: 1 } });
  }, []);

  const decrementStock = useCallback((id) => {
    dispatchInventory({ type: ACTIONS.DECREMENT_STOCK, payload: { id, amount: 1 } });
  }, []);

  // Cada cambio en el carrito mueve unidades entre el inventario y el carrito:
  // agregar/aumentar descuenta stock; disminuir/quitar lo devuelve.
  const addToCart = useCallback((id, cantidad, stockDisponible) => {
    const amount = Math.min(cantidad, stockDisponible);
    if (amount <= 0) return;
    dispatchCart({ type: CART_ACTIONS.ADD, payload: { id, amount } });
    dispatchInventory({ type: ACTIONS.DECREMENT_STOCK, payload: { id, amount } });
  }, []);

  const incrementCartItem = useCallback((id, cantidadActual, stockDisponible) => {
    if (stockDisponible <= 0) return;
    dispatchCart({ type: CART_ACTIONS.SET_QUANTITY, payload: { id, amount: cantidadActual + 1 } });
    dispatchInventory({ type: ACTIONS.DECREMENT_STOCK, payload: { id, amount: 1 } });
  }, []);

  const decrementCartItem = useCallback((id, cantidadActual) => {
    dispatchCart({ type: CART_ACTIONS.SET_QUANTITY, payload: { id, amount: cantidadActual - 1 } });
    dispatchInventory({ type: ACTIONS.INCREMENT_STOCK, payload: { id, amount: 1 } });
  }, []);

  const removeCartItem = useCallback((id, cantidadActual) => {
    if (cantidadActual <= 0) return;
    dispatchCart({ type: CART_ACTIONS.REMOVE, payload: { id } });
    dispatchInventory({ type: ACTIONS.INCREMENT_STOCK, payload: { id, amount: cantidadActual } });
  }, []);

  // Carrito enriquecido: une las cantidades con los datos del producto para
  // que las páginas no tengan que hacer el cruce. Si un producto ya no
  // existe en el inventario, su ítem se descarta.
  const cartItems = useMemo(
    () =>
      products
        .filter((p) => cart[p.id] > 0)
        .map((p) => ({ ...p, cantidad: cart[p.id] })),
    [products, cart]
  );

  // El valor del provider se memoiza para no cambiar de referencia
  // (y re-renderizar consumidores) salvo que cambie el inventario o el carrito.
  const value = useMemo(
    () => ({
      products,
      cartItems,
      addProduct,
      incrementStock,
      decrementStock,
      addToCart,
      incrementCartItem,
      decrementCartItem,
      removeCartItem,
    }),
    [
      products,
      cartItems,
      addProduct,
      incrementStock,
      decrementStock,
      addToCart,
      incrementCartItem,
      decrementCartItem,
      removeCartItem,
    ]
  );

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}
