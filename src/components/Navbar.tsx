import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Navbar.css';
import { Button } from "@heroui/react";
import LanguageSwitcher from './LanguageSwitcher';

// Define a type that allows any translation key
type TranslationFunction = {
  (key: string): string;
};

const Navbar: React.FC = () => {
  // Cast the t function to use our custom type
  const { t } = useTranslation() as { t: TranslationFunction };
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    closeMenu();
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="#" onClick={scrollToTop}>
            <img src="/assets/NHS Logo black-cropped.svg" alt="New Health Society Logo" className="navbar-logo-white" />
          </a>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>{t('navbar.about')}</a>
            </li>
            <li className="nav-item">
              <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')}>{t('navbar.pricing')}</a>
            </li>
            <li className="nav-item">
              <a href="#expectations" onClick={(e) => scrollToSection(e, 'expectations')}>{t('navbar.whatToExpect')}</a>
            </li>
            <li className="nav-item">
              <a href="#location" onClick={(e) => scrollToSection(e, 'location')}>{t('navbar.location')}</a>
            </li>
            <li className="nav-item nav-cta">
              <Button
                style={{
                  background: 'linear-gradient(to right, #005eb8, #00205b)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  fontSize: '16px',
                  fontWeight: 500,
                  boxShadow: '0 4px 14px 0 rgba(0, 94, 184, 0.39)',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease, transform 0.2s ease'
                }}
                radius="md"
                onClick={(e: React.MouseEvent) => scrollToSection(e, 'contact')}
                className="nav-contact-button"
              >
                {t('navbar.contactUs')}
              </Button>
            </li>
            <li className="nav-item">
              <LanguageSwitcher />
            </li>
          </ul>
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 