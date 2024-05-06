import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import I18NextHttpBackend from 'i18next-http-backend';

i18n
  .use(I18NextHttpBackend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    // lng: 'en',
    debug: true,
    // fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    saveMissing: true,
  });

export default i18n;
