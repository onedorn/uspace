import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import uaTranslation from './ua/translations.json';
import enTranslation from './en/translations.json';

const resources = {
  en: { translation: enTranslation },
  ua: { translation: uaTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ua',
    fallbackLng: 'ua',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['htmlTag', 'querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
    debug: process.env.NODE_ENV !== 'production',
  });

export default i18n;
