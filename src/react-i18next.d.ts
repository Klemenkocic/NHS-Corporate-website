import 'react-i18next';
import enTranslation from './locales/en/translation.json';

// Define the type for your translation keys
declare module 'react-i18next' {
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: 'translation';
    // custom resources type
    resources: {
      translation: typeof enTranslation;
    };
  }
} 