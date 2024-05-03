import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContextProvider } from '../context/AuthContext';
import NavBar from '../components/NavBar';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <AuthContextProvider navigate={navigate}>
      <NavBar />
      <Outlet />
    </AuthContextProvider>
  );
};

export default Layout;
