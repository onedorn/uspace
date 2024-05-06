import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Badge, Button, IconButton, Menu, MenuItem, styled, Toolbar, Tooltip, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

import Logo from '../jack-russell-terrier-logo.png';
import { Language, Mail, NightsStay, Notifications, WbSunny } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import { useFirestore } from '../context/FirestoreContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuth();
  const { updateDocument } = useFirestore();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'ua', name: 'Українська' },
  ];

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = async (langCode: string) => {
    if (!user) {
      console.error('No user found. Please ensure the user is logged in.');
      return;
    }

    setLanguage(langCode);
    handleClose();

    try {
      await updateDocument('users', user.uid, {
        preferences: {
          ...(user as any).preferences,
          language: langCode,
        },
      });
      console.log('Language updated successfully in Firestore.');
    } catch (error) {
      console.error('Failed to update language in Firestore:', error);
    }
  };

  const handleThemeToggle = async () => {
    if (!user) {
      console.error('No user found. Please ensure the user is logged in.');
      return;
    }

    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme); // Update local state

    try {
      // Update the user's theme preference in Firestore
      await updateDocument('users', user.uid, {
        preferences: {
          ...(user as any).preferences,
          theme: newTheme,
        },
      });
      console.log('Theme updated successfully in Firestore.');
    } catch (error) {
      console.error('Failed to update theme in Firestore:', error);
    }
  };

  return (
    <div>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home" onClick={() => navigate('/')}>
            <img src={Logo} alt="Company Logo" style={{ height: 50 }} />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            USpace
          </Typography>

          {user ? (
            <>
              <Tooltip title="Mails">
                <IconButton
                  aria-label="show 4 new mails"
                  color="inherit"
                  size="large" // "medium" is default
                  edge="end"
                  sx={{ mr: 0.5 }}
                >
                  <Badge badgeContent={4} color="error">
                    <Mail />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications">
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                  size="large" // "medium" is default
                  edge="end"
                  sx={{ mr: 0.5 }}
                >
                  <Badge badgeContent={17} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>

              <IconButton
                size="large" // "medium" is default
                edge="end"
                color="inherit"
                aria-label="toggle theme"
                onClick={handleThemeToggle}
                sx={{ mr: 0.5 }}
              >
                {theme === 'dark' ? <NightsStay /> : <WbSunny />}
              </IconButton>

              <IconButton
                size="large"
                edge="end"
                color="inherit" // color="primary"
                aria-label="language"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{ mr: 2 }}
              >
                <Language />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {languageOptions.map((option) => (
                  <MenuItem key={option.code} onClick={() => changeLanguage(option.code)} selected={option.code === language}>
                    {option.name}
                  </MenuItem>
                ))}
              </Menu>

              <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                <Avatar alt={user.displayName as string} src={user.photoURL as string} />
              </StyledBadge>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/signin')}>
                Sign In
              </Button>
              <Button color="inherit" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
