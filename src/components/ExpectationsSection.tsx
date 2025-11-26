import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/ExpectationsSection.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface FeatureSlide {
  title: string;
  time?: string;
  image?: string;
  images?: string[];
  alt: string;
  bullets?: string[];
  text?: string;
  quote?: string;
}

interface FeatureSectionProps {
  sectionId: string;
  translationKey: string;
}

const ExpectationsSection: React.FC<FeatureSectionProps> = ({
  sectionId,
  translationKey
}) => {
  const { t } = useTranslation();

  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [currentImageIndices, setCurrentImageIndices] = useState<number[]>([]);
  
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
      const getScrollAmount = () => {
        const totalWidth = horizontal.scrollWidth;
        const viewportWidth = window.innerWidth;
        return totalWidth - viewportWidth;
      };

      const horizontalWidth = getScrollAmount();

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

  const slides = useMemo(() => (t as any)(`${translationKey}.slides`, {
    returnObjects: true
  }) as FeatureSlide[], [t, translationKey]);

  const title = (t as any)(`${translationKey}.title`);
  const subtitle = (t as any)(`${translationKey}.subtitle`);
  const scrollIndicator = (t as any)(`${translationKey}.scrollIndicator`);

  // Initialize image indices for each slide
  useEffect(() => {
    setCurrentImageIndices(slides.map(() => 0));
  }, [slides.length]);

  // Auto-cycle through images
  useEffect(() => {
    if (slides.length === 0 || currentImageIndices.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndices(prev =>
        prev.map((index, slideIndex) => {
          if (!slides[slideIndex]) return 0;
          const slide = slides[slideIndex];
          const imageCount = slide.images?.length || 1;
          return (index + 1) % imageCount;
        })
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleImageClick = (slideIndex: number, direction: 'next' | 'prev') => {
    setCurrentImageIndices(prev => {
      const newIndices = [...prev];
      const slide = slides[slideIndex];
      const imageCount = slide.images?.length || 1;

      if (direction === 'next') {
        newIndices[slideIndex] = (newIndices[slideIndex] + 1) % imageCount;
      } else {
        newIndices[slideIndex] = (newIndices[slideIndex] - 1 + imageCount) % imageCount;
      }

      return newIndices;
    });
  };

  // Render desktop version with horizontal scrolling
  const renderDesktopVersion = () => (
    <section ref={sectionRef} id={sectionId} className="expectations-section">
      <div ref={triggerRef} className="expectations-trigger">
        <div className="expectations-header">
          <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
          <p dangerouslySetInnerHTML={{ __html: subtitle }}></p>
        </div>
        
        <div ref={horizontalRef} className="expectations-horizontal">
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} className="expectation-slide">
              <div className="expectation-content-container">
                <div className="expectation-image-carousel">
                  {slide.images ? (
                    <>
                      <div className="carousel-images">
                        {slide.images.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt={`${slide.alt} ${imgIndex + 1}`}
                            className={currentImageIndices[slideIndex] === imgIndex ? 'active' : ''}
                          />
                        ))}
                      </div>
                      <button
                        className="carousel-nav prev"
                        onClick={() => handleImageClick(slideIndex, 'prev')}
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      <button
                        className="carousel-nav next"
                        onClick={() => handleImageClick(slideIndex, 'next')}
                        aria-label="Next image"
                      >
                        ›
                      </button>
                      <div className="carousel-indicators">
                        {slide.images.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            className={currentImageIndices[slideIndex] === imgIndex ? 'active' : ''}
                            onClick={() => {
                              setCurrentImageIndices(prev => {
                                const newIndices = [...prev];
                                newIndices[slideIndex] = imgIndex;
                                return newIndices;
                              });
                            }}
                            aria-label={`Go to image ${imgIndex + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <img src={slide.image} alt={slide.alt} />
                  )}
                </div>
                <div className="expectation-content">
                  <div className="title-time-container">
                    <h3>{slide.title}</h3>
                    {slide.time && <span className="time-indicator">{slide.time}</span>}
                  </div>
                  {slide.bullets ? (
                    <ul className="expectation-bullet-list">
                      {slide.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex}>{bullet}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="transformation-text">
                      {slide.text && <p className="transformation-description">{slide.text}</p>}
                      {slide.quote && (
                        <blockquote className="transformation-quote">
                          {slide.quote}
                        </blockquote>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {scrollIndicator && (
        <div className="scroll-indicator">
          <span>{scrollIndicator}</span>
        </div>
      )}
    </section>
  );

  // Render mobile version with vertical stacking
  const renderMobileVersion = () => (
    <section id={sectionId} className="expectations-section mobile-section">
      <div className="expectations-header">
        <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
        <p dangerouslySetInnerHTML={{ __html: subtitle }}></p>
      </div>
      
      <div className="mobile-expectations-container">
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} className="mobile-expectation-slide">
            <div className="mobile-expectation-content">
              <div className="mobile-title-time">
                <h3>{slide.title}</h3>
                {slide.time && <span className="time-indicator">{slide.time}</span>}
              </div>
              <div className="mobile-expectation-image-carousel">
                {slide.images ? (
                  <>
                    <div className="carousel-images">
                      {slide.images.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt={`${slide.alt} ${imgIndex + 1}`}
                          className={currentImageIndices[slideIndex] === imgIndex ? 'active' : ''}
                        />
                      ))}
                    </div>
                    <button
                      className="carousel-nav prev"
                      onClick={() => handleImageClick(slideIndex, 'prev')}
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                    <button
                      className="carousel-nav next"
                      onClick={() => handleImageClick(slideIndex, 'next')}
                      aria-label="Next image"
                    >
                      ›
                    </button>
                    <div className="carousel-indicators">
                      {slide.images.map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          className={currentImageIndices[slideIndex] === imgIndex ? 'active' : ''}
                          onClick={() => {
                            setCurrentImageIndices(prev => {
                              const newIndices = [...prev];
                              newIndices[slideIndex] = imgIndex;
                              return newIndices;
                            });
                          }}
                          aria-label={`Go to image ${imgIndex + 1}`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <img src={slide.image} alt={slide.alt} />
                )}
              </div>
              {slide.bullets ? (
                <ul className="expectation-bullet-list">
                  {slide.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              ) : (
                <div className="transformation-text">
                  {slide.text && <p className="transformation-description">{slide.text}</p>}
                  {slide.quote && (
                    <blockquote className="transformation-quote">
                      {slide.quote}
                    </blockquote>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return isMobile ? renderMobileVersion() : renderDesktopVersion();
};

export default ExpectationsSection; 