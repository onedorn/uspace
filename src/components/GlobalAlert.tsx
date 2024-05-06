import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useStatus } from '../context/StatusContext';

const GlobalAlert = () => {
  const { alert, clearAlert } = useStatus();

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={5000}
      onClose={clearAlert}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // This controls the position
    >
      <Alert onClose={clearAlert} severity={alert.severity} sx={{ width: '100%' }}>
        {alert?.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalAlert;
