import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
const currentLanguage = localStorage.getItem("language") || "en";
i18n
  .use(HttpApi) // Load translations from backend or files
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Bind i18next to React
  .init({
  
    lng:currentLanguage,
    fallbackLng: 'en', // Default language if detection fails
    debug: true, // Enable debug mode in development
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    backend: {
      loadPath: '/languages/{{lng}}/{{ns}}.json', // Path to translation files
    },
  });

export default i18n;
