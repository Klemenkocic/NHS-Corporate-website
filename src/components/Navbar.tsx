import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
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
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
            </li>
            <li className="nav-item">
              <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')}>Pricing</a>
            </li>
            <li className="nav-item">
              <a href="#expectations" onClick={(e) => scrollToSection(e, 'expectations')}>What to Expect</a>
            </li>
            <li className="nav-item">
              <a href="#location" onClick={(e) => scrollToSection(e, 'location')}>Location</a>
            </li>
            <li className="nav-item nav-cta">
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="nav-button">Contact Us</a>
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