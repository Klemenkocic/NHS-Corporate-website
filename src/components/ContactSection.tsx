import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/ContactSection.css';

// Define a type that allows any translation key
type TranslationFunction = {
  (key: string): string;
};

const ContactSection: React.FC = () => {
  // Cast the t function to use our custom type
  const { t } = useTranslation() as { t: TranslationFunction };
  
  useEffect(() => {
    // Load Typeform embed script
    const script = document.createElement('script');
    script.src = 'https://embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      const embedScript = document.querySelector('script[src="https://embed.typeform.com/next/embed.js"]');
      if (embedScript && embedScript.parentNode) {
        embedScript.parentNode.removeChild(embedScript);
      }
    };
  }, []);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2>{t('contact.header1')}</h2>
          <h2 className="highlight">{t('contact.header2')}</h2>
          <p>{t('contact.subtitle')}</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-form">
            <div 
              data-tf-live="01JPPQ7QCRVX99ZA7GAKR8QGS8"
              style={{ width: '100%', height: '500px' }}
            ></div>
          </div>
          
          <div className="contact-details">
            <div className="contact-info-box">
              <h3>{t('contact.info.title')}</h3>
              <div className="contact-info">
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <p>{t('contact.info.address')}</p>
                </div>
                <div className="info-item">
                  <span className="info-icon">📱</span>
                  <p>{t('contact.info.phone')}</p>
                </div>
                <div className="info-item">
                  <span className="info-icon">✉️</span>
                  <p>{t('contact.info.email')}</p>
                </div>
              </div>
            </div>
            
            <div className="hours-box">
              <h3>{t('contact.hours.title')}</h3>
              <div className="hours-grid">
                <div className="day">{t('contact.hours.weekdays')}</div>
                <div className="time">{t('contact.hours.weekdaysHours')}</div>
                <div className="day">{t('contact.hours.saturday')}</div>
                <div className="time">{t('contact.hours.saturdayHours')}</div>
                <div className="day">{t('contact.hours.sunday')}</div>
                <div className="time">{t('contact.hours.sundayHours')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 