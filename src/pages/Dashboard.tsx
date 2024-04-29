import React, { SyntheticEvent } from 'react';
import { Avatar, Container, IconButton, Tooltip, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { GithubAuthProvider, GoogleAuthProvider, linkWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';
import GoogleIcon from '@mui/icons-material/Google';
import { GitHub } from '@mui/icons-material';

const StudentPage = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const handleLinkWithGoogleCredentials = (event: Event | SyntheticEvent<any, Event>) => {
    event.preventDefault();

    if (!auth.currentUser) {
      return;
    }

    linkWithPopup(auth.currentUser, new GoogleAuthProvider())
      .then((result) => {
        // Accounts successfully linked.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log('Accounts successfully linked', credential, user);
      })
      .catch((error) => {
        console.log('Error linking accounts', error);
      });
  };

  const handleLinkWithGithubCredentials = (event: Event | SyntheticEvent<any, Event>) => {
    event.preventDefault();

    if (!auth.currentUser) {
      return;
    }

    linkWithPopup(auth.currentUser, new GithubAuthProvider())
      .then((result) => {
        // Accounts successfully linked.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log('Accounts successfully linked', credential, user);
      })
      .catch((error) => {
        console.log('Error linking accounts', error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Avatar src={user?.photoURL || ''} alt="User Profile" sx={{ width: 150, height: 150, mb: 2 }} />
      <IconButton size="large" aria-label="show 4 new mails" color="inherit" />
      <Tooltip title="Sign in with Google">
        <IconButton onClick={handleLinkWithGoogleCredentials}>
          <GoogleIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sign in with Github">
        <IconButton onClick={handleLinkWithGithubCredentials}>
          <GitHub />
        </IconButton>
      </Tooltip>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Welcome, {user?.displayName || 'Unknown User'}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#666' }}>
        UID: {user?.uid}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#666' }}>
        Email: {user?.email}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#666' }}>
        Phone: {user?.phoneNumber || 'No phone number'}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#666' }}>
        Email Verified: {user?.emailVerified ? 'Yes' : 'No'}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#666' }}>
        Anonymous User: {user?.isAnonymous ? 'Yes' : 'No'}
      </Typography>
    </Container>
  );
};

export default StudentPage;
