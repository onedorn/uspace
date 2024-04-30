import React, { useEffect, useState } from 'react';
import { Avatar, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  EmailAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  OAuthProvider,
  TwitterAuthProvider,
  unlink,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { Apple, Facebook, GitHub, Google, Twitter, Window } from '@mui/icons-material';

interface ProviderDetails {
  id: string;
  name: string;
  provider: GoogleAuthProvider | FacebookAuthProvider | TwitterAuthProvider | GithubAuthProvider | OAuthProvider | EmailAuthProvider;
}

const StudentPage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [linkedProviders, setLinkedProviders] = useState<string[]>([]);

  const providerConfigs = [
    { id: 'google.com', icon: <Google />, name: 'Google', color: '#DB4437', provider: new GoogleAuthProvider() },
    { id: 'facebook.com', icon: <Facebook />, name: 'Facebook', color: '#3B5998', provider: new FacebookAuthProvider() },
    { id: 'twitter.com', icon: <Twitter />, name: 'Twitter', color: '#1DA1F2', provider: new TwitterAuthProvider() },
    { id: 'github.com', icon: <GitHub />, name: 'GitHub', color: '#333', provider: new GithubAuthProvider() },
    { id: 'apple.com', icon: <Apple />, name: 'Apple', color: '#A3AAAE', provider: new OAuthProvider('apple.com') },
    { id: 'microsoft.com', icon: <Window />, name: 'Microsoft', color: '#F25022', provider: new OAuthProvider('microsoft.com') },
  ];

  useEffect(() => {
    if (user && user.providerData) {
      const providers = user.providerData.map(({ providerId }) => providerId);
      setLinkedProviders(providers);
    }
  }, [user]);

  const handleLinkProvider = (provider: ProviderDetails) => {
    if (auth.currentUser) {
      linkWithPopup(auth.currentUser, provider.provider)
        .then((result) => {
          console.log(`${provider.name} linked successfully`, result);
          setLinkedProviders((prev) => [...prev, provider.id]);
        })
        .catch((error) => {
          console.error(`Error linking ${provider.name}`, error);
        });
    }
  };

  const handleUnlinkProvider = (providerId: string) => {
    if (auth.currentUser) {
      unlink(auth.currentUser, providerId)
        .then(() => {
          console.log(`${providerId} unlinked successfully`);
          setLinkedProviders((prev) => prev.filter((p) => p !== providerId));
        })
        .catch((error) => {
          console.error(`Error unlinking ${providerId}`, error);
        });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Avatar src={user?.photoURL || ''} alt="User Profile" sx={{ width: 150, height: 150, mb: 2 }} />
      <IconButton size="large" aria-label="show 4 new mails" color="inherit" />

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        {providerConfigs.map((provider) => (
          <Tooltip title={linkedProviders.includes(provider.id) ? `Unlink ${provider.name}` : `Link ${provider.name}`} key={provider.id}>
            <IconButton
              onClick={() => (linkedProviders.includes(provider.id) ? handleUnlinkProvider(provider.id) : handleLinkProvider(provider))}
              sx={{
                border: linkedProviders.includes(provider.id) ? '2px solid' : '1px dashed',
                borderColor: linkedProviders.includes(provider.id) ? provider.color : 'grey.300',
                color: linkedProviders.includes(provider.id) ? provider.color : 'action.disabled',
                backgroundColor: '#fff',
                '&:hover': {
                  backgroundColor: linkedProviders.includes(provider.id) ? '#f0f0f0' : '#ddd',
                },
              }}
            >
              {provider.icon}
            </IconButton>
          </Tooltip>
        ))}
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

export default StudentPage;
