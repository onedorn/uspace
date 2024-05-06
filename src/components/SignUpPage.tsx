import React, { useState } from 'react';
import { Alert, Avatar, Box, Button, CircularProgress, Container, CssBaseline, IconButton, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { validateEmail, validatePassword } from '../helpers/auth.helpres';
import { useAuth } from '../context/AuthContext';
import { useStatus } from '../context/StatusContext';
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { createUser } = useAuth();
  const { loading, alert, clearAlert } = useStatus();

  const handleCreateUserWithEmailAndPassword = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    await createUser(email, password);
  };

  const handleEmailChange = (event: { target: { value: any } }): void => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setEmailError(validateEmail(newEmail));
  };

  const handlePasswordChange = (event: { target: { value: any } }): void => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
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
        <Box component="form" onSubmit={handleCreateUserWithEmailAndPassword} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            size="small"
            error={!!emailError}
            helperText={emailError}
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
            onChange={handlePasswordChange}
            size="small"
            error={!!passwordError}
            helperText={passwordError}
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
            disabled={loading || !!emailError || !!passwordError}
          >
            Sign Up
          </Button>
          {alert.open && (
            <Alert
              severity={alert.severity as 'error' | 'info' | 'success' | 'warning'}
              sx={{ width: '100%', mt: 2 }}
              action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={() => clearAlert()}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              {alert.message}
            </Alert>
          )}
          {loading && <CircularProgress size={24} sx={{ display: 'block', margin: 'auto' }} />}
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
