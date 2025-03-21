// Shared translation function type for i18n
export type TranslationFunction = {
  (key: string): string;
};

// Shared i18n interface
export interface I18nInstance {
  t: TranslationFunction;
  i18n: {
    language: string;
    changeLanguage: (lng: string) => Promise<unknown>;
  };
} 