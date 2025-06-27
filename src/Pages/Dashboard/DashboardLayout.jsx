import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaUsers,
  FaPlus,
  FaHome,
  FaQuestionCircle,
  FaInfoCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import Navbar from '../../components/Navbar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : 'auto';
  }, [sidebarOpen]);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors font-medium ${
      isActive
        ? 'bg-blue-500 text-white'
        : 'text-gray-300 hover:bg-blue-600 hover:text-white'
    }`;

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 pt-16">
        <aside
          className={`fixed left-0 h-full bg-blue-900 z-30 text-white p-6
            transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            transition-transform duration-300 ease-in-out
            md:translate-x-0 md:static md:flex-shrink-0 md:w-64`}
        >
          <button
            className="md:hidden mb-6 text-white text-2xl"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close Sidebar"
          >
            <FaTimes />
          </button>

          <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

          <nav className="flex flex-col gap-3 text-sm">
            <p className="uppercase font-semibold text-gray-300 mb-2">🔧 Dashboard</p>
            <NavLink to="/dashboard" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FaTachometerAlt /> Overview
            </NavLink>
            <NavLink to="/dashboard/all-items" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FaUsers /> All Groups
            </NavLink>
            <NavLink to="/dashboard/add-item" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FaPlus /> Create Groups
            </NavLink>
            <NavLink to="/dashboard/my-items" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FaUsers /> My Groups
            </NavLink>

            <hr className="my-4 border-white/30" />

            <p className="uppercase font-semibold text-gray-300 mb-2">🌐 Main Site</p>
            <NavLink to="/" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FaHome /> Home
            </NavLink>
            <NavLink to="/groups" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FaUsers /> All Groups
            </NavLink>
            <NavLink to="/create-group" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FaPlus /> Create Group
            </NavLink>
            <NavLink to="/my-groups" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FaUsers /> My Groups
            </NavLink>
            <NavLink to="/aboutus" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FaInfoCircle /> About Us
            </NavLink>
            <NavLink to="/faq" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FaQuestionCircle /> FAQ
            </NavLink>

            <hr className="my-4 border-white/30" />

            <NavLink to="/login" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FaSignOutAlt /> Login
            </NavLink>
            <NavLink to="/register" className={linkClass} onClick={() => setSidebarOpen(false)}>
              <FaPlus /> Register
            </NavLink>
          </nav>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-2 p-4 md:p-6 ml-0 md:ml-6 overflow-auto min-h-screen">
          <button
            className="fixed top-20 left-4 z-20 text-blue-900 md:hidden bg-white p-2 rounded-md shadow-md"
            aria-label="Open Sidebar"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars size={20} />
          </button>

          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;