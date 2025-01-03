import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from '@translations'; // Importez vos ressources locales de traduction

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'fr',
  resources,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
