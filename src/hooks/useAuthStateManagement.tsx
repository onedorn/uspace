import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStatus } from '../context/StatusContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useFirestore } from '../context/FirestoreContext';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { mapUserData } from '../helpers/user.helpers';

const useAuthStateManagement = () => {
  const navigate = useNavigate();
  const { setUser, signOutUser, triggerEmailVerification } = useAuth();
  const { getDocument, setDocument } = useFirestore();
  const { setLoading, setAlert } = useStatus();
  const { setLanguage } = useLanguage();
  const { setTheme } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      try {
        if (currentUser && currentUser.emailVerified) {
          let userData = await getDocument('users', currentUser.uid);
          let userTemplateData = null;

          if (!userData) {
            userData = mapUserData(currentUser);
            userTemplateData = createEmailTemplateData(currentUser);
            await setDocument('users', currentUser.uid, userData);
            await setDocument('mail', currentUser.uid, userTemplateData);
            console.log('User data initialized.');
          }

          if (userData.providerData.length !== currentUser.providerData.length) {
            userData.providerData = currentUser.providerData;
            await setDocument('users', currentUser.uid, {
              ...userData,
              providerData: currentUser.providerData,
            });
            console.log('User provider data updated.');
          }

          setUser(userData);
          setTheme(userData.preferences.theme);
          setLanguage(userData.preferences.language);
          navigate('/student');
          console.log('User is signed in.', userData);
        } else if (currentUser) {
          triggerEmailVerification();
          signOutUser();
          console.log('User is signed out.');
          navigate('/signin');
        } else {
          setUser(null);
          console.log('User is signed out.');
          navigate('/signin');
        }
      } catch (error) {
        console.error('Failed to handle auth state change:', error);
        setAlert('An error occurred while processing your request.', 'error');
        navigate('/signin');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const createEmailTemplateData = (currentUser: User): object => {
    return {
      to: [currentUser.email],
      template: {
        name: 'subscribe',
        data: {
          email: currentUser.email,
          username: currentUser.displayName || 'USpace student',
          signupDate: currentUser.metadata.creationTime,
        },
      },
    };
  };

  return null;
};

export default useAuthStateManagement;
