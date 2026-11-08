import { HashRouter as Router, Routes, Route } from 'react-router';
import { InventoryProvider } from './context/InventoryContext';
import routes from './routes';
import BottomNav from './components/BottomNav';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <InventoryProvider>
        <div className="min-h-screen flex flex-col">
          <header className="bg-green-700 text-white py-6 px-4 text-center">
            <h1 className="m-0 text-3xl font-bold">Supermercado Felipe</h1>
            <p className="mt-1 opacity-90">Sistema de gestión de inventario</p>
          </header>
          <main className="flex-1 w-full max-w-5xl mx-auto px-4 pt-6 pb-28">
            <Routes>
              {routes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </InventoryProvider>
    </Router>
  );
}

export default App;
