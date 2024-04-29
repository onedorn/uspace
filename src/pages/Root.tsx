import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { authUserLeave, authUserSuccess } from '../store/user/user.actions';
import { mapUserData } from '../helpers/user.helpers';

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null): Promise<void> => {
      if (user) {
        if (!user.emailVerified) {
          // manage verification email sent to user
          console.log('User not verified its email', user);
          await signOut(auth);
        } else {
          dispatch(authUserSuccess(mapUserData(user)));
          navigate('/student');
          console.log('Login successful', user);
        }
      } else {
        dispatch(authUserLeave());
        console.log('User logged out', user);
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
