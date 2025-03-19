import React from \"react\";
import { useTranslation } from \"react-i18next\";
import \"../styles/LanguageSwitcher.css\";

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  const currentLanguage = i18n.language;
  
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className=\"language-switcher\">
      <button 
        className={`language-button ${currentLanguage === \"en\" ? \"active\" : \"\"}`} 
        onClick={() => changeLanguage(\"en\")}
        aria-label=\"Switch to English\"
      >
        {t(\"languageSwitcher.en\")}
      </button>
      <span className=\"language-divider\">|</span>
      <button 
        className={`language-button ${currentLanguage === \"de\" ? \"active\" : \"\"}`} 
        onClick={() => changeLanguage(\"de\")}
        aria-label=\"Switch to German\"
      >
        {t(\"languageSwitcher.de\")}
      </button>
    </div>
  );
};

export default LanguageSwitcher;