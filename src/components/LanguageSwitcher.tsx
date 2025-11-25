import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/LanguageSwitcher.css';

// Define a type that allows any translation key
type TranslationFunction = {
  (key: string): string;
};

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation() as { i18n: any, t: TranslationFunction };
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Map of language codes to display names
  const languages = {
    en: 'English',
    de: 'Deutsch'
  };

  // Get current language display name
  const getCurrentLanguageDisplayName = () => {
    return languages[i18n.language as keyof typeof languages] || languages.de;
  };

  // Get the other language option
  const getOtherLanguage = () => {
    return i18n.language === 'en' ? 'de' : 'en';
  };

  // Get the name of the other language
  const getOtherLanguageName = () => {
    return languages[getOtherLanguage() as keyof typeof languages];
  };

  // Handle language change
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsHovered(false);
  };

  // Set default language to German when component mounts
  useEffect(() => {
    if (i18n.language !== 'de') {
      i18n.changeLanguage('de');
    }
  }, [i18n]);

  // Handle mouse enter with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300);
  };

  return (
    <div 
      className="language-switcher"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="language-button">
        {getCurrentLanguageDisplayName()}
      </button>
      
      {isHovered && (
        <div className="language-dropdown">
          <button
            className="language-option"
            onClick={() => changeLanguage(getOtherLanguage())}
          >
            {getOtherLanguageName()}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 