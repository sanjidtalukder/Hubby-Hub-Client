// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // যদি ইউজারের লগইন স্টেট লোড হচ্ছে, তাহলে লোডিং দেখাও
    return <div>Loading...</div>;
  }

  if (!user) {
    // যদি ইউজার লগইন না থাকে, তাহলে লগইন পেজে রিডাইরেক্ট করো
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // যদি ইউজার লগইন থাকে, তাহলে চাইল্ড কম্পোনেন্ট রেন্ডার করো
  return children;
};

export default PrivateRoute;
