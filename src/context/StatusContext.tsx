import React, { createContext, useContext, useState } from 'react';

interface StatusContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  alert: { open: boolean; message: string; severity: 'error' | 'info' | 'success' | 'warning' };
  setAlert: (message: string, severity: 'error' | 'info' | 'success' | 'warning') => void;
  clearAlert: () => void;
}

const StatusContext = createContext<StatusContextType | null>(null);

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [alert, setAlertState] = useState<{ open: boolean; message: string; severity: 'error' | 'info' | 'success' | 'warning' }>({
    open: false,
    message: '',
    severity: 'info',
  });

  const setAlert = (message: string, severity: 'error' | 'info' | 'success' | 'warning') => {
    setAlertState({ open: true, message, severity });
  };

  const clearAlert = () => {
    setAlertState({ open: false, message: '', severity: 'info' });
  };

  return (
    <StatusContext.Provider
      value={{
        loading,
        setLoading,
        alert,
        setAlert,
        clearAlert,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error('useStatus must be used within a StatusProvider');
  }
  return context;
};
