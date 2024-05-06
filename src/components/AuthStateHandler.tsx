import React from 'react';
import useAuthStateManagement from '../hooks/useAuthStateManagement';

const AuthStateHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useAuthStateManagement();
  return <>{children}</>;
};

export default AuthStateHandler;
