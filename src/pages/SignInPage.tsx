import React, { SyntheticEvent, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  IconButton,
  Link,
  SnackbarCloseReason,
  TextField,
  Typography,
} from '@mui/material';
import {
  Apple as AppleIcon,
  Close as CloseIcon,
  Facebook as FacebookIcon,
  GitHub as GitHubIcon,
  Google as GoogleIcon,
  LockOutlined as LockOutlinedIcon,
  Twitter as TwitterIcon,
  Visibility,
  VisibilityOff,
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
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const error = useSelector((state: RootState) => state.user.error);
  const loading = useSelector((state: RootState) => state.user.loading);

  const handleLogInWithEmailAndPassword = (event: Event | SyntheticEvent<any, Event>) => {
    event.preventDefault();

    setPersistence(auth, browserSessionPersistence).then(async () => {
      try {
        setOpen(false);
        dispatch(authUserRequest());
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        dispatch(authUserFailure({ message: (error as FirebaseError).message }));
        setOpen(true);
      }
    });
  };

  const handlePasswordResetEmail = (event: Event | SyntheticEvent<any, Event>) => {
    event.preventDefault();
    setSuccess(false);

    const newEmail = prompt('Please enter your email address:');

    if (newEmail === null) {
      return;
    }

    sendPasswordResetEmail(auth, newEmail)
      .then(() => {
        console.log('Password reset email sent');
        setSuccess(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setSuccess(false);
        console.log('Error code:', errorMessage);
      });
  };

  const handleGoogleProviderLogin = () => {
    setPersistence(auth, browserSessionPersistence).then(async () => {
      try {
        await signInWithPopup(auth, new GoogleAuthProvider());
      } catch (error) {
        dispatch(authUserFailure({ message: (error as FirebaseError).message }));
        alert(error);
      }
    });
  };

  const handleGithubProviderLogin = () => {
    setPersistence(auth, browserSessionPersistence).then(async () => {
      try {
        await signInWithPopup(auth, new GithubAuthProvider());
      } catch (error) {
        dispatch(authUserFailure({ message: (error as FirebaseError).message }));
        alert(error);
      }
    });
  };

  const handleFacebookProviderLogin = () => {
    setPersistence(auth, browserSessionPersistence).then(async () => {
      try {
        await signInWithPopup(auth, new FacebookAuthProvider());
      } catch (error) {
        dispatch(authUserFailure({ message: (error as FirebaseError).message }));
        alert(error);
      }
    });
  };

  const handleAppleProviderLogin = () => {
    setPersistence(auth, browserSessionPersistence).then(async () => {
      try {
        await signInWithPopup(auth, new OAuthProvider('apple.com'));
      } catch (error) {
        dispatch(authUserFailure({ message: (error as FirebaseError).message }));
        alert(error);
      }
    });
  };

  const handleMicrosoftProviderLogin = () => {
    setPersistence(auth, browserSessionPersistence).then(async () => {
      try {
        await signInWithPopup(auth, new OAuthProvider('microsoft.com'));
      } catch (error) {
        dispatch(authUserFailure({ message: (error as FirebaseError).message }));
        alert(error);
      }
    });
  };

  const handleTwitterProviderLogin = () => {
    setPersistence(auth, browserSessionPersistence).then(async () => {
      try {
        await signInWithPopup(auth, new TwitterAuthProvider());
      } catch (error) {
        dispatch(authUserFailure({ message: (error as FirebaseError).message }));
        alert(error);
      }
    });
  };

  const handleErrorClose = (event: Event | SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSuccessClose = (event: Event | SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            error={password === ''}
            helperText={password === '' ? 'Password is required' : ''}
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
          <Box sx={{ mt: 1, width: '100%' }}>
            <Button
              key="Google"
              startIcon={<GoogleIcon />}
              fullWidth
              variant="outlined"
              sx={{ mb: 1 }}
              onClick={() => handleGoogleProviderLogin()}
              disabled={loading}
            >
              Sign in with Google
            </Button>

            <Button
              key="Github"
              startIcon={<GitHubIcon />}
              fullWidth
              variant="outlined"
              sx={{ mb: 1 }}
              onClick={() => handleGithubProviderLogin()}
              disabled={loading}
            >
              Sign in with GitHub
            </Button>
            <Button
              key="Microsoft"
              startIcon={<MicrosoftIcon />}
              fullWidth
              variant="outlined"
              sx={{ mb: 1 }}
              onClick={() => handleMicrosoftProviderLogin()}
              disabled={loading}
            >
              Sign in with Microsoft
            </Button>
            <Button
              key="Apple"
              startIcon={<AppleIcon />}
              fullWidth
              variant="outlined"
              sx={{ mb: 1 }}
              onClick={() => handleAppleProviderLogin()}
              disabled={loading}
            >
              Sign in with Apple
            </Button>
            <Button
              key="Facebook"
              startIcon={<FacebookIcon />}
              fullWidth
              variant="outlined"
              sx={{ mb: 1 }}
              onClick={() => handleFacebookProviderLogin()}
              disabled={loading}
            >
              Sign in with Facebook
            </Button>
            <Button
              key="Twitter"
              startIcon={<TwitterIcon />}
              fullWidth
              variant="outlined"
              sx={{ mb: 1 }}
              onClick={() => handleTwitterProviderLogin()}
              disabled={loading}
            >
              Sign in with Twitter
            </Button>
          </Box>
          {success && (
            <Alert
              severity="success"
              sx={{ width: '100%', mt: 2 }}
              action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleSuccessClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
              onClose={handleErrorClose}
            >
              Password reset email sent successfully!
            </Alert>
          )}
          {open && (
            <Alert
              severity="error"
              sx={{ width: '100%', mt: 2 }}
              action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleErrorClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
              onClose={handleErrorClose}
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

export default SignInPage;
