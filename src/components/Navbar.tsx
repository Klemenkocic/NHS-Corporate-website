import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@heroui/react";
import '../styles/Navbar.css';
import LanguageSwitcher from './LanguageSwitcher';
import { TranslationFunction } from '../types/i18n';

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
          <a href="/" onClick={scrollToTop}>
            <img src="/assets/NHS Logo black-cropped.svg" alt="New Health Society Logo" className="navbar-logo-white" />
          </a>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item nav-cta">
              <Button
                className="primary-button nav-contact-button"
                radius="md"
                onClick={(e: React.MouseEvent) => scrollToSection(e, 'contact')}
              >
                {t('navbar.contactUs')}
              </Button>
            </li>
          </ul>
          <div className="mobile-language-switcher">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="mobile-menu-container">
          <div className="desktop-language-switcher">
            <LanguageSwitcher />
          </div>
          <div className="menu-toggle" onClick={toggleMenu}>
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 