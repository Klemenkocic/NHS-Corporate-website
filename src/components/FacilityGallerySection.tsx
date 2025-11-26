import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/FacilityGallerySection.css';
import { TranslationFunction } from '../types/i18n';

const galleryImages = [
  { src: '/assets/NHS_Shoot_25-06-005-200x300.jpg', alt: 'NHS Facility' },
  { src: '/assets/NHS_Shoot_25-06-006-200x300.jpg', alt: 'NHS Facility' },
  { src: '/assets/NHS_Shoot_25-06-016-300x200.jpg', alt: 'NHS Facility' },
  { src: '/assets/NHS_Shoot_25-06-034-200x300.jpg', alt: 'NHS Facility' },
  { src: '/assets/NHS_Shoot_25-06-046-200x300.jpg', alt: 'NHS Facility' },
  { src: '/assets/NHS_Shoot_25-06-054-200x300.jpg', alt: 'NHS Facility' },
  { src: '/assets/NHS_Shoot_25-06-060-200x300.jpg', alt: 'NHS Facility' },
  { src: '/assets/NHS_Shoot_25-06-066-200x300.jpg', alt: 'NHS Facility' },
  { src: '/assets/NHS_Shoot_25-06-082-200x300.jpg', alt: 'NHS Facility' },
  { src: '/assets/NHS_Shoot_25-06-090-1-200x300.jpg', alt: 'NHS Facility' },
  { src: '/assets/NHS_Shoot_25-06-093-240x300.jpg', alt: 'NHS Facility' },
  { src: '/assets/NHS_Shoot_25-06-101-200x300.jpg', alt: 'NHS Facility' },
  { src: '/assets/NHS_Shoot_25-06-105-200x300.jpg', alt: 'NHS Facility' },
  { src: '/assets/NHS_Shoot_25-06-206-200x300.jpg', alt: 'NHS Facility' },
  { src: '/assets/image-1-200x300.jpg', alt: 'NHS Facility' }
];

const FacilityGallerySection: React.FC = () => {
  const { t } = useTranslation() as { t: TranslationFunction };

  return (
    <section id="facility" className="facility-gallery-section">
      <div className="facility-container">
        <p className="eyebrow">{t('landing.facility.eyebrow')}</p>
        <h2 dangerouslySetInnerHTML={{ __html: t('landing.facility.title') }}></h2>
        <p className="subtitle" dangerouslySetInnerHTML={{ __html: t('landing.facility.subtitle') }}></p>

        <div className="facility-carousel-wrapper">
          <div className="facility-carousel">
            <div className="facility-track">
              {[...galleryImages, ...galleryImages].map((image, index) => (
                <div key={index} className="facility-card">
                  <img src={image.src} alt={image.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilityGallerySection;

