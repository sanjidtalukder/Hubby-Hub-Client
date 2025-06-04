import { Link, NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FaSignOutAlt, FaBars, FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    logout()
      .then(() => console.log('Logged out'))
      .catch(err => console.error(err));
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md transition-all font-medium ${
      isActive ? 'bg-blue-100 text-blue-700 underline' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>
        Home
      </NavLink>
      <NavLink to="/groups" className={linkClass} onClick={() => setMenuOpen(false)}>
        All Groups
      </NavLink>
      {user && (
        <>
          <NavLink to="/create-group" className={linkClass} onClick={() => setMenuOpen(false)}>
            Create Group
          </NavLink>
          <NavLink to="/my-groups" className={linkClass} onClick={() => setMenuOpen(false)}>
            My Groups
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 text-gray-900 dark:text-white">
      <div className="navbar max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold text-blue-600 dark:text-blue-300 hover:text-purple-600 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            <img
  src="https://mir-s3-cdn-cf.behance.net/projects/404/25c50e104102623.Y3JvcCwyOTUyLDIzMDksNTU1LDA.png"
  alt="HobbyHub Logo"
  className="w-10 h-10 object-cover rounded-full"
/>

            HobbyHub
          </Link>
        </div>

        {/* Center - Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks}
        </div>

        {/* Right - Auth / Profile / Theme / Menu */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm text-xl tooltip"
            data-tip={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>

          {/* Desktop Auth/Profile */}
          {user ? (
            <div className="hidden md:block dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar cursor-pointer relative group">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                  <img
                    src={user.photoURL || 'https://i.ibb.co/2kR5zq0/default-avatar.png'}
                    alt={user.displayName || 'User'}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">
                  {user.displayName || 'User'}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52"
              >
                <li>
                  <p className="text-sm font-semibold px-2">👤 {user.displayName || 'User'}</p>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-error btn-sm text-white mt-2 flex items-center gap-2 mx-2"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <NavLink to="/login" className="btn btn-outline btn-sm">Login</NavLink>
              <NavLink to="/register" className="btn btn-primary btn-sm">Register</NavLink>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            className="btn btn-ghost text-xl md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40">
          <div className="absolute top-0 right-0 w-64 h-full bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col gap-4 z-50">
            <button
              className="text-right text-xl font-bold self-end"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
            {navLinks}
            {!user ? (
              <>
                <NavLink to="/login" className="btn btn-outline btn-sm" onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/register" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
                  Register
                </NavLink>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="btn btn-error btn-sm flex items-center justify-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
