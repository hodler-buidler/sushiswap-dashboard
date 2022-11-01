import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const DEFAULT_LOCALE = 'en';
export const FALLBACK_LOCALE = 'en';

const translations = {
  en: {
    translation: {},
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translations,
    lng: DEFAULT_LOCALE,
    fallbackLng: FALLBACK_LOCALE,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
