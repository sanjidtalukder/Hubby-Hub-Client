import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../Pages/MainLayout';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../Pages/home/Home';
import AllGroups from '../components/groups/AllGroups';
import MyGroups from '../components/groups/MyGroups';
import UpdateGroup from '../components/groups/UpdateGroup';
import PrivateRoute from '../components/PrivateRoute';
import CreateGroup from '../Pages/CreateGroup';
import NotFound from '../Pages/NotFound';
import GroupDetails from '../Pages/GroupDetails';
import AboutUs from '../components/AboutUs';
import FAQ from '../components/FAQ';
 

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'groups', element: <AllGroups /> },
      { path: 'create-group', element: <PrivateRoute><CreateGroup /></PrivateRoute> },
      { path: 'my-groups', element: <PrivateRoute><MyGroups /></PrivateRoute> },
      { path: 'update-group/:id', element: <PrivateRoute><UpdateGroup /></PrivateRoute> },
      { path: 'group-details/:id', element: <PrivateRoute><GroupDetails /></PrivateRoute> }, 
      { path: 'aboutus', element: <PrivateRoute><AboutUs /></PrivateRoute> },
      { path: 'faq', element: <PrivateRoute><FAQ /></PrivateRoute> },
       { path: '*', element: <NotFound /> }, 
    ],
  },
]);
