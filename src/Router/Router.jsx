import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
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
import FutureGroupDetails from '../Pages/FutureGroupDetails';
import AboutUs from '../components/AboutUs';
import FAQ from '../components/FAQ';
import DashboardLayout from '../Pages/Dashboard/DashboardLayout';
import Dashboard from '../Pages/Dashboard/Dashboard';
import AllItems from '../Pages/Dashboard/AllItems';
import AddItem from '../Pages/Dashboard/AddItem';
import MyItems from '../Pages/Dashboard/MyItems';

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
      { path: 'future-group-details/:id', element: <PrivateRoute><FutureGroupDetails /></PrivateRoute> },
      { path: 'aboutus', element: <PrivateRoute><AboutUs /></PrivateRoute> },
      { path: 'faq', element: <PrivateRoute><FAQ /></PrivateRoute> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
     path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
     children: [
      { index: true, element: <Dashboard /> },
      { path: 'all-items', element: <AllItems /> },
      { path: 'add-item', element: <AddItem /> },
      { path: 'my-items', element: <MyItems /> },
    ],
  },
]);
