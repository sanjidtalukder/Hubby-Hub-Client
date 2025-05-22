import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Router/Router'; 
import AuthProvider from './providers/AuthProvider'; 
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
      <Toaster position="top-right" />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);
