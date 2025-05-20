import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <h1>HobbyHub</h1>
      <Outlet /> {/* Nested route গুলো এখানে render হবে */}
    </div>
  );
};

export default MainLayout;
