import React, { createContext, useContext, useState } from 'react';
import i18n from 'i18next';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
}

export const defaultLanguage = 'en';

const LanguageContext = createContext<LanguageContextType | null>({
  language: defaultLanguage,
  setLanguage: (language: string) => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(defaultLanguage);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleLanguageChange,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
