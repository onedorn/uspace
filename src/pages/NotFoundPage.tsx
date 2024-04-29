import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <ErrorOutlineIcon color="error" sx={{ fontSize: 60 }} />
      <Typography variant="h4" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Oops! The page you're looking for isn't here.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        You might have the wrong address, or the page may have moved.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
