import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { resources } from '@translations/index';

const deviceLocale = Intl.DateTimeFormat().resolvedOptions().locale;
let language: string = '';
if (!deviceLocale) {
    language = 'en';
} else {
    language = deviceLocale.includes('fr') ? 'fr' : 'en';
}

i18n
    .use(Backend) 
    .use(initReactI18next) 
    .init({
        lng : language,
        fallbackLng: language, 
        resources: resources,
        interpolation: {
            escapeValue: false, 
        },
        react: {
            useSuspense: false, 
        },
    });

export default i18n;
