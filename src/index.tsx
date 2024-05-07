import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n/config';
import './firebase/config';

import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { StatusProvider } from './context/StatusContext';
import { AuthProvider } from './context/AuthContext';
import { FirestoreProvider } from './context/FirestoreContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import NotFoundPage from './components/NotFoundPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import ProtectedRoute from './components/ProtectedRout';
import UserProfile from './components/Profile';
import GlobalAlert from './components/GlobalAlert';
import UserSettings from './components/UserSettings';
import UserDetails from './components/UserDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <div>Home Page Content</div> },
      { path: 'signin', element: <SignInPage /> },
      { path: 'signup', element: <SignUpPage /> },
      {
        path: 'student',
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
        children: [
          { path: 'profile', element: <UserDetails /> },
          { path: 'settings', element: <UserSettings /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading ...</div>}></Suspense>
    <LanguageProvider>
      <ThemeProvider>
        <StatusProvider>
          <FirestoreProvider>
            <AuthProvider>
              <RouterProvider router={router}></RouterProvider>
              <GlobalAlert />
            </AuthProvider>
          </FirestoreProvider>
        </StatusProvider>
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
