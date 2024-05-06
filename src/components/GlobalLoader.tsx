import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useStatus } from '../context/StatusContext';

const LoadingOverlay = () => {
  const { loading } = useStatus();

  return (
    <Backdrop open={loading} style={{ color: '#fff' }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;
