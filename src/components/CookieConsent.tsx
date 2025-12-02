import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/CookieConsent.css';
import { I18nInstance } from '../types/i18n';

interface CookieConsentProps {
  onConsentChange: (accepted: boolean) => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onConsentChange }) => {
  const { t } = useTranslation() as I18nInstance;
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
    } else {
      // If consent was already given, notify parent
      onConsentChange(consent === 'accepted');
    }
  }, [onConsentChange]);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
    onConsentChange(true);
    console.log('[Cookie Consent] User accepted cookies');
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setVisible(false);
    onConsentChange(false);
    console.log('[Cookie Consent] User declined cookies');
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
