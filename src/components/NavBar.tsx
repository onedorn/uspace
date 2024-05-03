import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Badge, Button, IconButton, Menu, MenuItem, styled, Toolbar, Tooltip, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import Avatars, { UserAvatar } from '../constants/avatars';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import UpdateIcon from '@mui/icons-material/Update';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import Logo from '../jack-russell-terrier-logo.png';
import { useTranslation } from 'react-i18next';

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

function NavBar() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const { user, signOutUser, updateUserEmail, updateUserPassword, updateUserProfile, deleteUserAccount } = useAuth();

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

  const changeLanguage = (langCode: string) => {
    setSelectedLang(langCode);
    i18n.changeLanguage(langCode);
    handleClose();
  };

  const createAvatarURL = () => {
    // Get all keys (collections) from the Avatars object
    const avatarKeys = Object.keys(Avatars) as (keyof UserAvatar)[];
    const selectedCollectionKey = avatarKeys[Math.floor(Math.random() * avatarKeys.length)];

    // Get the array of names from the selected collection
    const avatarNames = Avatars[selectedCollectionKey];
    const selectedAvatarName = avatarNames[Math.floor(Math.random() * avatarNames.length)];

    // Construct the URL with an optional seed parameter
    return `https://api.dicebear.com/8.x/${selectedCollectionKey}/svg?seed=${selectedAvatarName}`;
  };

  const handleSignOut = async (): Promise<void> => {
    await signOutUser();
  };

  const handleUpdateUser = async (): Promise<void> => {
    const photoURL = createAvatarURL();
    const displayName = prompt('Enter your name:', auth.currentUser?.displayName || '');

    if (displayName === null) {
      return;
    }

    await updateUserProfile({ displayName, photoURL });
  };

  const handleUpdateUserEmail = async (): Promise<void> => {
    const user = auth.currentUser as User;
    const newEmail = prompt('Enter your email:', (user.email as string) || '');

    if (newEmail === null) {
      return;
    }

    await updateUserEmail(newEmail);
  };

  const handleUpdateUserPassword = async (): Promise<void> => {
    const newPassword = prompt('Enter your password:', '');

    if (newPassword === null) {
      return;
    }

    await updateUserPassword(newPassword);
  };

  const handleDeleteUser = async (): Promise<void> => {
    await deleteUserAccount();
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
            <LanguageIcon />
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
              <MenuItem key={option.code} onClick={() => changeLanguage(option.code)} selected={option.code === selectedLang}>
                {option.name}
              </MenuItem>
            ))}
          </Menu>

          {user ? (
            <>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Tooltip title="Logout">
                <IconButton onClick={handleSignOut}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Account">
                <IconButton onClick={handleDeleteUser}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Update Email">
                <IconButton onClick={handleUpdateUserEmail}>
                  <EmailIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Update Password">
                <IconButton onClick={handleUpdateUserPassword}>
                  <LockIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Update Profile">
                <IconButton onClick={handleUpdateUser}>
                  <UpdateIcon />
                </IconButton>
              </Tooltip>
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

export default NavBar;
