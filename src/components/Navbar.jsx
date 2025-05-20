import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => console.log('Logged out'))
      .catch(err => console.error(err));
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `btn btn-ghost text-base font-medium ${isActive ? 'btn-active bg-blue-100 text-blue-700' : ''}`
        }
        onClick={() => setMenuOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/groups"
        className={({ isActive }) =>
          `btn btn-ghost text-base font-medium ${isActive ? 'btn-active bg-blue-100 text-blue-700' : ''}`
        }
        onClick={() => setMenuOpen(false)}
      >
        All Groups
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/create-group"
            className={({ isActive }) =>
              `btn btn-ghost text-base font-medium ${isActive ? 'btn-active bg-blue-100 text-blue-700' : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            Create Group
          </NavLink>
          <NavLink
            to="/my-groups"
            className={({ isActive }) =>
              `btn btn-ghost text-base font-medium ${isActive ? 'btn-active bg-blue-100 text-blue-700' : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            My Groups
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar bg-white shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Left: Logo */}
        <div className="flex-1 flex items-center">
          <Link
            to="/"
            className="text-3xl font-extrabold text-blue-600 hover:text-purple-600 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            HobbyHub
          </Link>
        </div>

        {/* Center: NavLinks */}
        <div className="flex-1 justify-center hidden md:flex items-center gap-4">
          {navLinks}
        </div>

        {/* Right: User / Auth Buttons */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              className="btn btn-square btn-ghost text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              <FaBars />
            </button>
          </div>

          {/* Desktop User Avatar */}
          {user && (
            <div className="hidden md:flex dropdown dropdown-end ml-4">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar cursor-pointer relative group">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                  <img
                    src={user.photoURL || 'https://i.ibb.co/2kR5zq0/default-avatar.png'}
                    alt={user.displayName || 'User'}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  {user.displayName || 'User'}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
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
          )}

          {/* Guest Buttons on Desktop */}
          {!user && (
            <div className="hidden md:flex gap-2 ml-4">
              <NavLink to="/login" className="btn btn-outline btn-sm">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary btn-sm">
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full right-4 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2 w-48 md:hidden z-50">
          {navLinks}
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="btn btn-outline btn-sm w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-primary btn-sm w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="btn btn-error btn-sm w-full flex items-center justify-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
