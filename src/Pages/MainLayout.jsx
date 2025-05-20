import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from './home/Home';

const MainLayout = () => {
  return (
    <div>
     
      <Navbar></Navbar>
     
      <Outlet /> 
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
