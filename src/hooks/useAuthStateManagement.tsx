import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStatus } from '../context/StatusContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useFirestore } from '../context/FirestoreContext';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { mapUserData } from '../helpers/user.helpers';

const useAuthStateManagement = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { setLoading, setAlert } = useStatus();
  const { setTheme } = useTheme();
  const { setLanguage } = useLanguage();
  const { getDocument, setDocument } = useFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      try {
        if (currentUser && currentUser.emailVerified) {
          let userData = await getDocument('users', currentUser.uid);

          if (!userData) {
            // Handle new user or missing data scenarios
            // Initialize with defaults or data from the currentUser object
            userData = mapUserData(currentUser);
            await setDocument('users', currentUser.uid, userData);
            console.log('User data initialized.');
          }

          setUser(userData);
          setTheme(userData.preferences.theme);
          setLanguage(userData.preferences.language);
          navigate('/student');
          console.log('User is signed in.', userData);
        } else {
          if (currentUser) {
            // Handle email verification scenarios
            await signOut(auth);
            console.log('User is signed out.');
            setAlert('Please verify your email to proceed.', 'warning');
          }

          // Handle sign out scenarios
          setUser(null);
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

  return null;
};

export default useAuthStateManagement;
