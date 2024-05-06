import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import useAuthStateManagement from './hooks/useAuthStateManagement';

const App = () => {
  useAuthStateManagement();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.paper',
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%', // Ensures it takes full width
          p: 3, // Applies padding uniformly around the content
          boxSizing: 'border-box', // Ensures padding is included in width
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default App;
