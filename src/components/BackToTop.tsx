import React, { useState, useEffect } from 'react';
import '../styles/BackToTop.css';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls past hero section
  useEffect(() => {
    const handleScroll = () => {
      // Get hero section height to determine when to show the button
      const heroSection = document.querySelector('.hero-section');
      const heroHeight = heroSection?.clientHeight || 600;
      
      if (window.scrollY > heroHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <i className="fas fa-arrow-up"></i>
      <span>Back to top</span>
    </button>
  );
};

export default BackToTop;
