import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Footer.css';

// Define a type that allows any translation key
type TranslationFunction = {
  (key: string): string;
};

const Footer: React.FC = () => {
  // Cast the t function to use our custom type
  const { t } = useTranslation() as { t: TranslationFunction };
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src="/assets/NHS Logo black-cropped.svg" alt="New Health Society Logo" className="footer-logo-white" />
            <p>{t('footer.tagline')}</p>
          </div>
          
          <div className="footer-nav">
            <div className="footer-nav-column">
              <h4>{t('footer.sections.about')}</h4>
              <ul>
                <li><a href="#about">{t('footer.sections.ourMission')}</a></li>
                <li><a href="#pricing">{t('footer.sections.services')}</a></li>
                <li><a href="#expectations">{t('footer.sections.whatToExpect')}</a></li>
              </ul>
            </div>
            
            <div className="footer-nav-column">
              <h4>{t('footer.sections.connect')}</h4>
              <ul>
                <li><a href="#location">{t('footer.sections.location')}</a></li>
                <li><a href="#contact">{t('footer.sections.contactUs')}</a></li>
                <li><a href="#pricing">{t('footer.sections.requestPricing')}</a></li>
              </ul>
            </div>
            
            <div className="footer-nav-column">
              <h4>{t('footer.sections.followUs')}</h4>
              <div className="social-links">
                <a href="https://instagram.com/newhealthsociety" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://linkedin.com/company/new-health-society" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://facebook.com/newhealthsociety" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>{t('footer.legal.copyright')}</p>
          <div className="footer-links">
            <a href="/privacy">{t('footer.legal.privacy')}</a>
            <a href="/terms">{t('footer.legal.terms')}</a>
            <a href="/imprint">{t('footer.legal.imprint')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 