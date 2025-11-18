import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/PromiseSection.css';
import { TranslationFunction } from '../types/i18n';

const PromiseSection: React.FC = () => {
  const { t } = useTranslation() as { t: TranslationFunction };

  return (
    <section id="promise" className="promise-section">
      <div className="promise-container">
        <p className="eyebrow">{t('landing.promise.eyebrow')}</p>
        <h2>{t('landing.promise.title')}</h2>
        <p className="subtitle">{t('landing.promise.subtitle')}</p>

        <div className="promise-card">
          <p>{t('landing.promise.body')}</p>
          <div className="promise-highlight">
            <h3>{t('landing.promise.highlightTitle')}</h3>
            <p>{t('landing.promise.highlightSubtitle')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;

