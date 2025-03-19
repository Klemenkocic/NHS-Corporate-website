import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/ExpectationsSection.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Define a type that allows any translation key
type TranslationFunction = {
  (key: string): string;
};

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ExpectationsSection: React.FC = () => {
  // Cast the t function to use our custom type
  const { t } = useTranslation() as { t: TranslationFunction };
  
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create a function to handle the ScrollTrigger setup
    const setupScrollTrigger = () => {
      // Make sure all refs are available
      if (!sectionRef.current || !triggerRef.current || !horizontalRef.current) return;
      
      const horizontal = horizontalRef.current;
      
      // Calculate the width of the horizontal scroll content
      const horizontalWidth = horizontal.scrollWidth - window.innerWidth;

      // Create the horizontal scroll animation
      return gsap.to(horizontal, {
        x: -horizontalWidth,
        ease: "none", // Linear animation
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${horizontalWidth}`,
          pin: true,
          scrub: 1, // Smooth scrolling
          anticipatePin: 1,
          invalidateOnRefresh: true, // Recalculate on window resize
          markers: false, // Set to true for debugging
        }
      });
    };

    // Store context to use in the cleanup function
    const ctx = gsap.context(() => {
      // Kill any existing ScrollTriggers to prevent conflicts
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === triggerRef.current) {
          trigger.kill();
        }
      });
      
      // Setup the ScrollTrigger animation
      const scrollTween = setupScrollTrigger();
      
      // Add resize listener to update the animation on window resize
      const handleResize = () => {
        // Small delay to ensure all layout calculations are complete
        setTimeout(() => {
          scrollTween?.kill();
          ScrollTrigger.refresh();
          setupScrollTrigger();
        }, 100);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Return cleanup function for resize listener
      return () => {
        window.removeEventListener('resize', handleResize);
        if (scrollTween) scrollTween.kill();
      };
    }, sectionRef);

    // Refresh ScrollTrigger after a short delay to ensure layout is complete
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Cleanup function
    return () => {
      clearTimeout(refreshTimeout);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="expectations" className="expectations-section">
      <div ref={triggerRef} className="expectations-trigger">
        <div className="expectations-header">
          <h2>{t('expectations.title')}</h2>
          <p>Your wellness journey from start to finish</p>
        </div>
        
        <div ref={horizontalRef} className="expectations-horizontal">
          <div className="expectation-slide">
            <div className="expectation-content-container">
              <div className="expectation-image">
                <img src="/assets/Group-Arrival.jpg" alt="Group arrival at facility" />
              </div>
              <div className="expectation-content">
                <h3>{t('expectations.slides.slide1.title')}</h3>
                <p>{t('expectations.slides.slide1.text')}</p>
              </div>
            </div>
          </div>
          
          <div className="expectation-slide">
            <div className="expectation-content-container">
              <div className="expectation-image">
                <img src="/assets/Preparation-and-Partnering.jpg" alt="Custom training plan" />
              </div>
              <div className="expectation-content">
                <h3>{t('expectations.slides.slide2.title')}</h3>
                <p>{t('expectations.slides.slide2.text')}</p>
              </div>
            </div>
          </div>
          
          <div className="expectation-slide">
            <div className="expectation-content-container">
              <div className="expectation-image">
                <img src="/assets/Expert-Supervision.jpg" alt="Training with expert supervision" />
              </div>
              <div className="expectation-content">
                <h3>{t('expectations.slides.slide3.title')}</h3>
                <p>{t('expectations.slides.slide3.text')}</p>
              </div>
            </div>
          </div>
          
          <div className="expectation-slide">
            <div className="expectation-content-container">
              <div className="expectation-image">
                <img src="/assets/Recovery-and-Refuel.jpg" alt="Recovery and protein refuel" />
              </div>
              <div className="expectation-content">
                <h3>{t('expectations.slides.slide4.title')}</h3>
                <p>{t('expectations.slides.slide4.text')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>{t('expectations.scrollIndicator')}</span>
      </div>
    </section>
  );
};

export default ExpectationsSection; 