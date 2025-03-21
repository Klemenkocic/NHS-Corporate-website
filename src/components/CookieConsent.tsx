import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/CookieConsent.css';
import { TranslationFunction, I18nInstance } from '../types/i18n';

const CookieConsent: React.FC = () => {
  const { t, i18n } = useTranslation() as I18nInstance;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // If no consent found, show the banner after a short delay
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookies-banner">
      <div className="cookies-text">
        {t('cookies.text')}
      </div>
      <div className="cookies-buttons">
        <button 
          onClick={handleAccept} 
          className="cookies-button cookies-accept primary-button"
        >
          {t('cookies.accept')}
        </button>
        <button 
          onClick={handleDecline} 
          className="cookies-button cookies-decline"
        >
          {t('cookies.decline')}
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
