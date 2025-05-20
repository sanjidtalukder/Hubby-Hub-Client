import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => console.log('Logged out'))
      .catch(err => console.error(err));
  };

  const navLinks = (
    <>
      <NavLink to="/" className="btn btn-ghost text-base font-medium">Home</NavLink>
      <NavLink to="/groups" className="btn btn-ghost text-base font-medium">All Groups</NavLink>
      {user && (
        <>
          <NavLink to="/create-group" className="btn btn-ghost text-base font-medium">Create Group</NavLink>
          <NavLink to="/my-groups" className="btn btn-ghost text-base font-medium">My Groups</NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Left: Logo */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-purple-600 transition">
          HobbyHub
        </Link>
      </div>

      {/* Center: Navigation Links (Hidden on Mobile) */}
      <div className="hidden md:flex gap-2 items-center">
        {navLinks}
      </div>

      {/* Right: Auth Section */}
      <div className="flex-none gap-4 items-center">
        {!user ? (
          <div className="flex gap-2">
            <NavLink to="/login" className="btn btn-outline btn-sm">Login</NavLink>
            <NavLink to="/register" className="btn btn-primary btn-sm">Register</NavLink>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar group">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoURL || 'https://i.ibb.co/2kR5zq0/default-avatar.png'}
                  alt="user"
                />
              </div>
              {/* Tooltip-style Hover Name */}
              <div className="absolute bottom-[-28px] left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                {user.displayName || 'User'}
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
              <li>
                <p className="text-sm">👤 {user.displayName || 'User'}</p>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-sm btn-error text-white mt-2 flex items-center gap-1">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
