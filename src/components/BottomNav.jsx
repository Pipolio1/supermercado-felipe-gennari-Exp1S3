import { NavLink } from 'react-router';
import routes from '../routes';

const getNavLinkClass = ({ isActive }) =>
  isActive
    ? 'bg-white text-green-900 font-bold px-3 py-1.5 rounded-md text-sm no-underline'
    : 'text-green-100 hover:bg-green-700 hover:text-white px-3 py-1.5 rounded-md text-sm no-underline';

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-center flex-wrap gap-1 bg-green-900 px-2 py-3">
      {routes.filter((r) => !r.oculta).map(({ path, label, end }) => (
        <NavLink key={path} to={path} end={end} className={getNavLinkClass}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
