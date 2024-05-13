import React, { useEffect, useState } from 'react';
import { Avatar, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import {
  EmailAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  User,
} from 'firebase/auth';
import { Facebook, GitHub, Google, Mail, Twitter, Window } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase/config';
import { useTheme as useMuiTheme } from '@mui/material/styles';

import Avatars, { UserAvatar } from '../constants/avatars';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import UpdateIcon from '@mui/icons-material/Update';
import LogoutIcon from '@mui/icons-material/Logout';

interface ProviderDetails {
  id: string;
  name: string;
  provider: GoogleAuthProvider | FacebookAuthProvider | TwitterAuthProvider | GithubAuthProvider | OAuthProvider | EmailAuthProvider;
}

const UserProfile = () => {
  const [linkedProviders, setLinkedProviders] = useState<string[]>([]);
  const { user, signOutUser, linkProviderWithPopup, unlinkProvider, updateUserProfile, updateUserEmail, updateUserPassword, deleteUserAccount, linkWithEmailAndPassword } = useAuth();
  const theme = useMuiTheme();

  const providerConfigs = [
    { id: 'password', icon: <Mail />, name: 'Mail', color: '#504c4c', provider: new EmailAuthProvider() },
    { id: 'google.com', icon: <Google />, name: 'Google', color: '#DB4437', provider: new GoogleAuthProvider() },
    { id: 'facebook.com', icon: <Facebook />, name: 'Facebook', color: '#3B5998', provider: new FacebookAuthProvider() },
    { id: 'twitter.com', icon: <Twitter />, name: 'Twitter', color: '#1DA1F2', provider: new TwitterAuthProvider() },
    { id: 'github.com', icon: <GitHub />, name: 'GitHub', color: '#458b4e', provider: new GithubAuthProvider() },
    { id: 'microsoft.com', icon: <Window />, name: 'Microsoft', color: '#F25022', provider: new OAuthProvider('microsoft.com') },
  ];

  useEffect((): void => {
    if (user && user.providerData) {
      const providers = user.providerData.map(({ providerId }) => providerId);
      setLinkedProviders(providers);
    }
  }, [user]);

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
    deleteUserAccount();
  };

  const handleSignOut = async (): Promise<void> => {
    signOutUser();
  };

  const handleLinkProvider = async ({ provider }: ProviderDetails): Promise<void> => {
    if (provider.providerId === 'password') {
      const email = prompt('Enter your email:', '');
      const password = prompt('Enter your password:', '');

      if (email === null || password === null) {
        return;
      }

      linkWithEmailAndPassword(email, password);
    } else {
      linkProviderWithPopup(provider);
    }
  };

  const handleUnlinkProvider = async (providerId: string): Promise<void> => {
    if (providerId === 'password') {
      unlinkProvider(providerId);
    } else {
      unlinkProvider(providerId);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {/*<Sidebar />*/}
      {/*<Outlet />*/}
      <Avatar src={user?.photoURL || ''} alt="User Profile" sx={{ width: 150, height: 150, mb: 2 }} />
      <IconButton size="large" aria-label="show 4 new mails" color="inherit" />

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        {providerConfigs.map((provider) => (
          <Tooltip title={linkedProviders.includes(provider.id) ? `Unlink ${provider.name}` : `Link ${provider.name}`} key={provider.id}>
            <IconButton
              onClick={() => (linkedProviders.includes(provider.id) ? handleUnlinkProvider(provider.id) : handleLinkProvider(provider))}
              sx={{
                border: linkedProviders.includes(provider.id) ? '2px solid' : '1px dashed',
                borderColor: linkedProviders.includes(provider.id) ? provider.color : theme.palette.mode === 'dark' ? 'grey.600' : 'grey.300',
                color: linkedProviders.includes(provider.id) ? provider.color : theme.palette.mode === 'dark' ? 'grey.500' : 'action.disabled',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#f0f0f0',
                },
              }}
            >
              {provider.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
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
      </Stack>

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

export default UserProfile;
