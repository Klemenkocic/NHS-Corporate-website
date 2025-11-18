import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/FinalCTASection.css';
import { TranslationFunction } from '../types/i18n';

const FinalCTASection: React.FC = () => {
  const { t } = useTranslation() as { t: TranslationFunction };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="final-cta-section">
      <div className="final-cta-container">
        <div>
          <p className="eyebrow">{t('landing.finalCta.eyebrow')}</p>
          <h2>{t('landing.finalCta.title')}</h2>
          <p>{t('landing.finalCta.subtitle')}</p>
        </div>
        <button className="primary-button" onClick={scrollToContact}>
          {t('landing.finalCta.cta')}
        </button>
      </div>
    </section>
  );
};

export default FinalCTASection;

