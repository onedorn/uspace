import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './firebase/config';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import StudentPage from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRout';
import Root from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <App /> },
      { path: 'signin', element: <SignInPage /> },
      { path: 'signup', element: <SignUpPage /> },
      {
        path: 'student',
        element: (
          <ProtectedRoute>
            <StudentPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
