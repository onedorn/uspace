import React from 'react';
import { Box, Typography } from '@mui/material';

const App = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Take full height of the viewport
        backgroundColor: '#f0f0f0', // Light grey background
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Our Application
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        This area is accessible for not logged-in users. Please sign in to continue.
      </Typography>
    </Box>
  );
};

export default App;
