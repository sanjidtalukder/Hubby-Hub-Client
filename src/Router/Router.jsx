import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Pages/MainLayout';
import Login from '../components/Login';



export const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, 
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);
