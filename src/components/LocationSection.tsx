import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/LocationSection.css';

// Define a type that allows any translation key
type TranslationFunction = {
  (key: string): string;
};

const LocationSection: React.FC = () => {
  // Cast the t function to use our custom type
  const { t } = useTranslation() as { t: TranslationFunction };
  
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="location" className="location-section">
      <div className="location-container">
        <div className="location-header">
          <h2>{t('location.header1')}</h2>
          <h2 className="highlight">{t('location.header2')}</h2>
          <p className="location-subtext">{t('location.subtext')}</p>
        </div>
        
        <div className="location-content">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.7325075069197!2d11.618826376992697!3d48.17551187127114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e75bc6516c31f%3A0xf7bd9a4c60853bef!2sLilienthalallee%205%2C%2080807%20M%C3%BCnchen%2C%20Germany!5e0!3m2!1sen!2sus!4v1710798539626!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="New Health Society Location"
            ></iframe>
          </div>
          
          <div className="accessibility-box">
            <h3>{t('location.accessibility.title')}</h3>
            <p>{t('location.accessibility.address')}</p>
            <ul className="accessibility-features">
              <li>{t('location.accessibility.parking')}</li>
              <li>{t('location.accessibility.car')}</li>
              <li>{t('location.accessibility.publicTransport')}</li>
              <li>{t('location.accessibility.bike')}</li>
            </ul>
            <p className="tour-text">{t('location.accessibility.tourText')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection; 