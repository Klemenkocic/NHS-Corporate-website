import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@heroui/react";
import '../styles/HeroSection.css';
import { TranslationFunction } from '../types/i18n';
import { buildConsultationURL } from '../utils/utmTracking';

const HeroSection: React.FC = () => {
  // Cast the t function to use our custom type
  const { t, i18n } = useTranslation() as { t: TranslationFunction; i18n: any };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const currentLanguage = i18n.language;
    const baseUrl = currentLanguage === 'de'
      ? 'https://newhealthsociety.com/de/kostenlose-erstberatung-ads/'
      : 'https://newhealthsociety.com/free-initial-consultation-ads/';

    const url = buildConsultationURL(baseUrl);
    window.top!.location.href = url;
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background">
        <div className="overlay"></div>
      </div>
      <div className="hero-content">
        <h1 dangerouslySetInnerHTML={{ __html: t('hero.title') }}></h1>
        <p dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}></p>
        <Button
          className="primary-button"
          radius="md"
          onClick={handleButtonClick}
        >
          {t('hero.cta')}
        </Button>
      </div>
    </section>
  );
};

export default HeroSection; 