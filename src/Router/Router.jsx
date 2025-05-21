import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../Pages/MainLayout';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../Pages/home/Home';
import AllGroups from '../components/groups/AllGroups';
import MyGroups from '../components/groups/MyGroups';
import UpdateGroup from '../components/groups/UpdateGroup';
// import PrivateRoute from '../components/PrivateRoute';
import PrivateRoute from '../components/PrivateRoute';


export const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'group', element: <AllGroups /> },
      { path: 'myGroups', element: <PrivateRoute><MyGroups /></PrivateRoute> },
      { path: 'updateGroup/:id', element: <PrivateRoute><UpdateGroup /></PrivateRoute> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
