import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { es } from './locales/es';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            es: es
        },
        lng: "es", // idioma por defecto
        fallbackLng: "es",

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
