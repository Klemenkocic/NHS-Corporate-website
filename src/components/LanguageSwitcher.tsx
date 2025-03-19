import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/LanguageSwitcher.css';

// Define a type that allows any translation key
type TranslationFunction = {
  (key: string): string;
};

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation() as { i18n: any, t: TranslationFunction };

  // Handle language change
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-switcher">
      <div className="flag-container">
        <button 
          className={`flag-button ${i18n.language === 'en' ? 'active' : ''}`} 
          onClick={() => changeLanguage('en')}
          aria-label="Switch to English"
        >
          <img 
            src="/assets/english-icon.svg" 
            alt="English" 
            className="flag-icon" 
          />
        </button>
        
        <button 
          className={`flag-button ${i18n.language === 'de' ? 'active' : ''}`} 
          onClick={() => changeLanguage('de')}
          aria-label="Switch to German"
        >
          <img 
            src="/assets/deutsch-icon.svg" 
            alt="Deutsch" 
            className="flag-icon" 
          />
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher; 