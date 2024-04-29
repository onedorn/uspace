import React, { SyntheticEvent, useState } from 'react';
import { Alert, Avatar, Box, Button, CircularProgress, Container, CssBaseline, IconButton, SnackbarCloseReason, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { authUserFailure, authUserRequest } from '../store/user/user.actions';
import { auth } from '../firebase/config';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const error = useSelector((state: RootState) => state.user.error);
  const loading = useSelector((state: RootState) => state.user.loading);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setOpen(false);
    dispatch(authUserRequest());

    createUserWithEmailAndPassword(auth, email, password)
      .then((_userCredential: UserCredential) => {
        navigate('/student');
      })
      .catch((error) => {
        dispatch(authUserFailure({ message: error.message }));
        setOpen(true);
      });
  };

  const handleClose = (event: Event | SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="dense" // Smaller margin
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small" // Smaller input field
            error={email === ''}
            helperText={email === '' ? 'Email is required' : ''}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small" // Smaller input field
            error={email === ''}
            helperText={email === '' ? 'Password is required' : ''}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  size="small"
                  edge="end"
                  aria-label="toggle password visibility"
                  sx={{
                    padding: '5px',
                    '& .MuiSvgIcon-root': {
                      fontSize: '1rem',
                    },
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setShowPassword(true);
                  }}
                  onMouseUp={() => setShowPassword(false)}
                  onMouseLeave={() => setShowPassword(false)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }} // Adjusted margin
            disabled={loading || (!email && !password)}
          >
            Sign Up
          </Button>
          {open && (
            <Alert
              severity="error"
              sx={{ width: '100%', mt: 2 }}
              action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
              onClose={handleClose}
            >
              {error}
            </Alert>
          )}
          {loading && <CircularProgress size={24} sx={{ display: 'block', margin: 'auto' }} />}
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
