import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@heroui/react";
import '../styles/HeroSection.css';
import { TranslationFunction } from '../types/i18n';

const HeroSection: React.FC = () => {
  // Cast the t function to use our custom type
  const { t } = useTranslation() as { t: TranslationFunction };
  
  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="video-container">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/assets/Website-Video.m4v" type="video/mp4" />
          {t('common.videoUnsupported')}
        </video>
        <div className="overlay"></div>
      </div>
      <div className="hero-content">
        <h1>{t('hero.title1')}</h1>
        <h1 className="highlight">{t('hero.title2')}</h1>
        <p>{t('hero.subtitle')}</p>
        <Button
          className="primary-button"
          radius="md"
          onClick={(e: React.MouseEvent) => scrollToSection(e, 'investment')}
        >
          {t('hero.cta')}
        </Button>
      </div>
    </section>
  );
};

export default HeroSection; 