import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Badge, Button, IconButton, styled, Toolbar, Tooltip, Typography } from '@mui/material';
import { deleteUser, signOut, updateEmail, updatePassword, updateProfile, User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { authUserSuccess } from '../store/user/user.actions';
import Avatars, { UserAvatar } from '../constants/avatars';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import UpdateIcon from '@mui/icons-material/Update';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logo from '../jack-russell-terrier-logo.png';

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
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleUpdateUser = async () => {
    const avatarURL = createAvatarURL();
    const displayName = prompt('Enter your name:', auth.currentUser?.displayName || '');

    if (displayName === null) {
      return;
    }

    updateProfile(auth.currentUser as User, {
      displayName: displayName,
      photoURL: avatarURL,
    })
      .then(() => {
        const student = {
          ...user,
          displayName: displayName,
          photoURL: avatarURL,
        };
        dispatch(authUserSuccess(student));
        console.log(student);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateUserEmail = async () => {
    const user = auth.currentUser as User;
    const newEmail = prompt('Enter your email:', (user.email as string) || '');

    if (newEmail === null) {
      return;
    }

    updateEmail(user, newEmail)
      .then(() => {
        console.log('Email updated.');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateUserPassword = async () => {
    const user = auth.currentUser as User;
    const newPassword = prompt('Enter your password:', '');

    if (newPassword === null) {
      return;
    }

    updatePassword(user, newPassword)
      .then(() => {
        console.log('Password Updated successfully.');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteUser = async () => {
    deleteUser(auth.currentUser as User)
      .then(() => {
        console.log('User deleted.');
      })
      .catch((error) => {
        console.log(error);
      });
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
