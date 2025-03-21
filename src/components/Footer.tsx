import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Footer.css';
import { TranslationFunction, I18nInstance } from '../types/i18n';

const Footer: React.FC = () => {
  // Cast the t function to use our custom type
  const { t, i18n } = useTranslation() as I18nInstance;
  
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
                <li><a href="#investment">{t('footer.sections.services')}</a></li>
                <li><a href="#expectations">{t('footer.sections.whatToExpect')}</a></li>
              </ul>
            </div>
            
            <div className="footer-nav-column">
              <h4>{t('footer.sections.connect')}</h4>
              <ul>
                <li><a href="#location">{t('footer.sections.location')}</a></li>
                <li><a href="#contact">{t('footer.sections.contactUs')}</a></li>
                <li><a href="#investment">{t('footer.sections.requestPricing')}</a></li>
              </ul>
            </div>
            
            <div className="footer-nav-column">
              <h4>{t('footer.sections.followUs')}</h4>
              <div className="social-links">
                <a href="https://www.instagram.com/newhealthsociety/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/company/newhealthsociety/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.facebook.com/people/New-Health-Society/61567745465834/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.youtube.com/@newhealthsociety" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>{t('footer.legal.copyright')}</p>
          <div className="footer-links">
            <a href={i18n.language === 'de' ? 'https://newhealthsociety.com/de/datenschutz/' : 'https://newhealthsociety.com/privacy-policy/'} target="_blank" rel="noopener noreferrer">{t('footer.legal.privacy')}</a>
            <a href={i18n.language === 'de' ? 'https://newhealthsociety.com/de/agb/' : 'https://newhealthsociety.com/terms-and-conditions/'} target="_blank" rel="noopener noreferrer">{t('footer.legal.terms')}</a>
            <a href="https://newhealthsociety.com/imprint/" target="_blank" rel="noopener noreferrer">{t('footer.legal.imprint')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 