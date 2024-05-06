import React, { SyntheticEvent, useState } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, Divider, IconButton, Link, TextField, Tooltip, Typography } from '@mui/material';
import {
  Facebook as FacebookIcon,
  GitHub as GitHubIcon,
  Google as GoogleIcon,
  LockOutlined as LockOutlinedIcon,
  Twitter as TwitterIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Window as MicrosoftIcon,
} from '@mui/icons-material';
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, OAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { useStatus } from '../context/StatusContext';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { loading } = useStatus();
  const { signInUser, triggerPasswordResetEmail, signInUserWithPopup } = useAuth();

  const providerData = [
    { icon: <GoogleIcon />, provider: new GoogleAuthProvider(), label: 'Google', color: '#DB4437', iconColor: '#fff' },
    { icon: <GitHubIcon />, provider: new GithubAuthProvider(), label: 'GitHub', color: '#333', iconColor: '#fff' },
    { icon: <FacebookIcon />, provider: new FacebookAuthProvider(), label: 'Facebook', color: '#3B5998', iconColor: '#fff' },
    { icon: <MicrosoftIcon />, provider: new OAuthProvider('microsoft.com'), label: 'Microsoft', color: '#F25022', iconColor: '#fff' },
    { icon: <TwitterIcon />, provider: new TwitterAuthProvider(), label: 'Twitter', color: '#1DA1F2', iconColor: '#fff' },
  ];

  const handleLogInWithEmailAndPassword = async (event: Event | SyntheticEvent<any, Event>): Promise<void> => {
    event.preventDefault();

    await signInUser(email, password);
  };

  const handlePasswordResetEmail = async (event: Event | SyntheticEvent<any, Event>): Promise<void> => {
    event.preventDefault();

    const newEmail = prompt('Please enter your email address:');

    if (newEmail === null) {
      return;
    }

    await triggerPasswordResetEmail(newEmail);
  };

  const handleSignInWithProvider = async (
    provider: GoogleAuthProvider | GithubAuthProvider | OAuthProvider | FacebookAuthProvider | TwitterAuthProvider
  ): Promise<void> => {
    await signInUserWithPopup(provider);
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
          // opacity: loading ? 0.5 : 1,
          // pointerEvents: loading ? 'none' : 'auto',
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
        </Box>
      </Box>
    </Container>
  );
};

export default SignInPage;
