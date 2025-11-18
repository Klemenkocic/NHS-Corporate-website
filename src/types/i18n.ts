// Shared translation function type for i18n
// Flexible type that supports both simple string translation and returnObjects
export type TranslationFunction = (key: string, options?: any) => any;

// Shared i18n interface
export interface I18nInstance {
  t: TranslationFunction;
  i18n: {
    language: string;
    changeLanguage: (lng: string) => Promise<unknown>;
  };
} 