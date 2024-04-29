import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { authUserLeave, authUserSuccess } from '../store/user/user.actions';

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null): void => {
      if (user) {
        dispatch(
          authUserSuccess({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            isAnonymous: user.isAnonymous,
          })
        );
        navigate('/student');
        console.log('Login successful', user);
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
