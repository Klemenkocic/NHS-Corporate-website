import React, { useEffect, useRef, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Function to check if the device is mobile
  const checkIfMobile = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    return mobile;
  };
  
  useEffect(() => {
    // Initial check
    checkIfMobile();
    
    // Create a function to handle the ScrollTrigger setup
    const setupScrollTrigger = () => {
      // Don't setup GSAP horizontal scrolling on mobile
      if (checkIfMobile()) {
        // Kill any existing ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === triggerRef.current) {
            trigger.kill();
          }
        });
        return null;
      }
      
      // Make sure all refs are available
      if (!sectionRef.current || !triggerRef.current || !horizontalRef.current) return null;
      
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
        // Check if the mobile state has changed
        const wasMobile = isMobile;
        const nowMobile = checkIfMobile();
        
        // If switching between mobile and desktop, force a page refresh
        if (wasMobile !== nowMobile) {
          window.location.reload();
          return;
        }
        
        // If no state change, just update the animation
        // Small delay to ensure all layout calculations are complete
        setTimeout(() => {
          if (scrollTween) scrollTween.kill();
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
  }, [isMobile]);

  // Slide data array to use for both desktop and mobile
  const slides = [
    {
      title: t('expectations.slides.slide1.title'),
      time: t('expectations.slides.slide1.time'),
      image: "/assets/Group-Arrival.jpg",
      alt: "Group arrival at facility",
      bullets: [
        t('expectations.slides.slide1.bullets.bullet1'),
        t('expectations.slides.slide1.bullets.bullet2'),
        t('expectations.slides.slide1.bullets.bullet3')
      ]
    },
    {
      title: t('expectations.slides.slide2.title'),
      time: t('expectations.slides.slide2.time'),
      image: "/assets/Preparation-and-Partnering.jpg",
      alt: "Custom training plan",
      bullets: [
        t('expectations.slides.slide2.bullets.bullet1'),
        t('expectations.slides.slide2.bullets.bullet2'),
        t('expectations.slides.slide2.bullets.bullet3')
      ]
    },
    {
      title: t('expectations.slides.slide3.title'),
      time: t('expectations.slides.slide3.time'),
      image: "/assets/Expert-Supervision.jpg",
      alt: "Training with expert supervision",
      bullets: [
        t('expectations.slides.slide3.bullets.bullet1'),
        t('expectations.slides.slide3.bullets.bullet2'),
        t('expectations.slides.slide3.bullets.bullet3')
      ]
    },
    {
      title: t('expectations.slides.slide4.title'),
      time: t('expectations.slides.slide4.time'),
      image: "/assets/Recovery-and-Refuel.jpg",
      alt: "Recovery and protein refuel",
      bullets: [
        t('expectations.slides.slide4.bullets.bullet1'),
        t('expectations.slides.slide4.bullets.bullet2'),
        t('expectations.slides.slide4.bullets.bullet3')
      ]
    }
  ];

  // Render desktop version with horizontal scrolling
  const renderDesktopVersion = () => (
    <section ref={sectionRef} id="expectations" className="expectations-section">
      <div ref={triggerRef} className="expectations-trigger">
        <div className="expectations-header">
          <h2>{t('expectations.title')}</h2>
          <p>{t('expectations.subtitle')}</p>
        </div>
        
        <div ref={horizontalRef} className="expectations-horizontal">
          {slides.map((slide, index) => (
            <div key={index} className="expectation-slide">
              <div className="expectation-content-container">
                <div className="expectation-image">
                  <img src={slide.image} alt={slide.alt} />
                </div>
                <div className="expectation-content">
                  <div className="title-time-container">
                    <h3>{slide.title}</h3>
                    <span className="time-indicator">{slide.time}</span>
                  </div>
                  <ul className="expectation-bullet-list">
                    {slide.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>{t('expectations.scrollIndicator')}</span>
      </div>
    </section>
  );

  // Render mobile version with vertical stacking
  const renderMobileVersion = () => (
    <section id="expectations" className="expectations-section mobile-section">
      <div className="expectations-header">
        <h2>{t('expectations.title')}</h2>
        <p>{t('expectations.subtitle')}</p>
      </div>
      
      <div className="mobile-expectations-container">
        {slides.map((slide, index) => (
          <div key={index} className="mobile-expectation-slide">
            <div className="mobile-expectation-content">
              <div className="mobile-title-time">
                <h3>{slide.title}</h3>
                <span className="time-indicator">{slide.time}</span>
              </div>
              <div className="mobile-expectation-image">
                <img src={slide.image} alt={slide.alt} />
              </div>
              <ul className="expectation-bullet-list">
                {slide.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return isMobile ? renderMobileVersion() : renderDesktopVersion();
};

export default ExpectationsSection; 