import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/FacilityGallerySection.css';
import { TranslationFunction } from '../types/i18n';

const galleryImages = [
  { src: '/assets/gym.jpg', alt: 'Functional training area' },
  { src: '/assets/Group-Arrival.jpg', alt: 'Community space' },
  { src: '/assets/Preparation-and-Partnering.jpg', alt: 'Preparation area' },
  { src: '/assets/Expert-Supervision.jpg', alt: 'Coaching moments' }
];

const FacilityGallerySection: React.FC = () => {
  const { t } = useTranslation() as { t: TranslationFunction };

  return (
    <section id="facility" className="facility-gallery-section">
      <div className="facility-container">
        <p className="eyebrow">{t('landing.facility.eyebrow')}</p>
        <h2>{t('landing.facility.title')}</h2>
        <p className="subtitle">{t('landing.facility.subtitle')}</p>

        <div className="facility-grid">
          {galleryImages.map((image, index) => (
            <div key={index} className="facility-card">
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilityGallerySection;

