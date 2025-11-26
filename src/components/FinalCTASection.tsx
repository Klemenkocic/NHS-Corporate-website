import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/FinalCTASection.css';
import { TranslationFunction } from '../types/i18n';

const FinalCTASection: React.FC = () => {
  const { t } = useTranslation() as { t: TranslationFunction };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="final-cta-section">
      <div className="final-cta-container">
        <div className="final-cta-text">
          {t('landing.finalCta.eyebrow') && <p className="eyebrow">{t('landing.finalCta.eyebrow')}</p>}
          <h2 dangerouslySetInnerHTML={{ __html: t('landing.finalCta.title') }}></h2>
          <p dangerouslySetInnerHTML={{ __html: t('landing.finalCta.subtitle') }}></p>
        </div>
        <button className="primary-button final-cta-button" onClick={scrollToTop}>
          {t('landing.finalCta.cta')}
        </button>
      </div>
    </section>
  );
};

export default FinalCTASection;

