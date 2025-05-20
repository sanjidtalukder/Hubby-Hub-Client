import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Pages/MainLayout';
import Login from '../components/Login';
import Register from '../components/Register';
import Footer from '../components/Footer';
import Home from '../Pages/home/Home';



export const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, 
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element:<Register />
      },
      {
        path: 'footer',
        element:<Footer />
      },
      {
        path:'home',
        element:<Home />
      }
    ],
  },
]);
