import React, { SyntheticEvent, useState } from 'react';
import { Alert, Avatar, Box, Button, Container, CssBaseline, Divider, IconButton, Link, TextField, Tooltip, Typography } from '@mui/material';
import {
  Apple as AppleIcon,
  Close as CloseIcon,
  Facebook as FacebookIcon,
  GitHub as GitHubIcon,
  Google as GoogleIcon,
  LockOutlined as LockOutlinedIcon,
  Twitter as TwitterIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Window as MicrosoftIcon,
} from '@mui/icons-material';
import {
  browserSessionPersistence,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  TwitterAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { authUserFailure, authUserRequest } from '../store/user/user.actions';
import { FirebaseError } from 'firebase/app';

const SignInPage = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
  const [showPassword, setShowPassword] = useState(false);

  const loading = useSelector((state: RootState) => state.user.loading);

  const providerData = [
    { icon: <GoogleIcon />, provider: new GoogleAuthProvider(), label: 'Google', color: '#DB4437', iconColor: '#fff' },
    { icon: <GitHubIcon />, provider: new GithubAuthProvider(), label: 'GitHub', color: '#333', iconColor: '#fff' },
    { icon: <FacebookIcon />, provider: new FacebookAuthProvider(), label: 'Facebook', color: '#3B5998', iconColor: '#fff' },
    { icon: <AppleIcon />, provider: new OAuthProvider('apple.com'), label: 'Apple', color: '#A3AAAE', iconColor: '#000' },
    { icon: <MicrosoftIcon />, provider: new OAuthProvider('microsoft.com'), label: 'Microsoft', color: '#F25022', iconColor: '#fff' },
    { icon: <TwitterIcon />, provider: new TwitterAuthProvider(), label: 'Twitter', color: '#1DA1F2', iconColor: '#fff' },
  ];

  const handleLogInWithEmailAndPassword = (event: Event | SyntheticEvent<any, Event>) => {
    event.preventDefault();

    setPersistence(auth, browserSessionPersistence).then(async () => {
      try {
        setAlert((prev) => ({ ...prev, open: false }));
        dispatch(authUserRequest());
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        const firebaseError = error as FirebaseError;
        dispatch(authUserFailure({ message: firebaseError.message }));
        setAlert({ open: true, message: firebaseError.message, severity: 'error' });
      }
    });
  };

  const handlePasswordResetEmail = (event: Event | SyntheticEvent<any, Event>) => {
    event.preventDefault();
    setAlert((prev) => ({ ...prev, open: false }));

    const newEmail = prompt('Please enter your email address:');

    if (newEmail === null) {
      return;
    }

    sendPasswordResetEmail(auth, newEmail)
      .then(() => {
        setAlert({ open: true, message: 'Password reset email sent. Please check your inbox.', severity: 'success' });
      })
      .catch((error) => {
        const firebaseError = error.message;
        setAlert({ open: true, message: firebaseError.message, severity: 'error' });
      });
  };

  const handleSignInWithProvider = (provider: GoogleAuthProvider | GithubAuthProvider | OAuthProvider | FacebookAuthProvider | TwitterAuthProvider) => {
    setPersistence(auth, browserSessionPersistence).then(async () => {
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        const firebaseError = error as FirebaseError;
        dispatch(authUserFailure({ message: firebaseError.message }));
        setAlert({ open: true, message: firebaseError.message, severity: 'error' });
      }
    });
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
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleLogInWithEmailAndPassword} noValidate sx={{ mt: 1 }}>
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
            size="small"
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
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
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
            Sign In
          </Button>
          <Link
            component="button"
            variant="body2" // Smaller font size
            onClick={handlePasswordResetEmail}
            sx={{ cursor: 'pointer', display: 'block', textAlign: 'center' }}
          >
            Forgot password?
          </Link>
          <Divider sx={{ width: '100%', mb: 2, mt: 2 }} textAlign="center">
            <Box component="span" sx={{ bgcolor: 'background.paper', px: 1 }}>
              OR
            </Box>
          </Divider>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 2, mt: 2 }}>
            {providerData.map(({ provider, icon, label, color, iconColor }, index) => (
              <Tooltip title={`Sign in with ${label}`} placement="top" key={label}>
                <Button
                  startIcon={React.cloneElement(icon, { style: { color: iconColor } })}
                  variant="contained"
                  onClick={() => handleSignInWithProvider(provider)}
                  disabled={loading}
                  sx={{
                    mx: 0.5,
                    backgroundColor: color,
                    color: iconColor,
                    ':first-of-type': { ml: 0 },
                    ':last-of-type': { mr: 0 },
                    '&:hover': {
                      backgroundColor: `${color}CC`,
                    },
                    '& .MuiButton-startIcon': {
                      margin: 0,
                    },
                  }}
                />
              </Tooltip>
            ))}
          </Box>
          {alert.open && (
            <Alert
              severity={alert.severity as 'error' | 'info' | 'success' | 'warning'}
              sx={{ width: '100%', mt: 2 }}
              action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={() => setAlert((prev) => ({ ...prev, open: false }))}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
              onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
            >
              {alert.message}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SignInPage;
