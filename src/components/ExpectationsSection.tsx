import React, { useEffect, useRef } from 'react';
import '../styles/ExpectationsSection.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ExpectationsSection: React.FC = () => {
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
          <h2>WHAT TO EXPECT?</h2>
          <p>Your wellness journey from start to finish</p>
        </div>
        
        <div ref={horizontalRef} className="expectations-horizontal">
          <div className="expectation-slide">
            <div className="expectation-content-container">
              <div className="expectation-image">
                <img src="/assets/Group-Arrival.jpg" alt="Group arrival at facility" />
              </div>
              <div className="expectation-content">
                <h3>Welcome to Our Gym!</h3>
                <p>When you arrive, expect a warm welcome from our friendly team, who’ll greet you personally by name. With plenty of parking right outside, getting here couldn’t be easier.</p>
                <p>Our modern facility features brand-new changing rooms and secure, lockable lockers, providing convenience and peace of mind. Whether you’re joining us for focused individual workouts or dynamic team-building sessions, our gym environment is built to inspire teamwork, energy, and outstanding performance.</p>
              </div>
            </div>
          </div>
          
          <div className="expectation-slide">
            <div className="expectation-content-container">
              <div className="expectation-image">
                <img src="/assets/Preparation-and-Partnering.jpg" alt="Custom training plan" />
              </div>
              <div className="expectation-content">
                <h3>Partnering & Team Briefing</h3>
                <p>Your session kicks off at our front bar, where you’ll receive your personalized amino drink and fresh workout towel to ensure you’re energized and ready to go. To build camaraderie and motivation, you’ll be paired up with another participant—encouraging accountability and mutual support throughout your training.</p>
                <p>Before we start, one of our expert coaches will walk you through the day’s training session, clearly explaining each exercise and answering any questions you may have. We ensure you’re confident and motivated from the very first rep!</p>
              </div>
            </div>
          </div>
          
          <div className="expectation-slide">
            <div className="expectation-content-container">
              <div className="expectation-image">
                <img src="/assets/Expert-Supervision.jpg" alt="Training with expert supervision" />
              </div>
              <div className="expectation-content">
                <h3>Training Under Expert Supervision</h3>
                <p>Each training session starts with an energizing warm-up to get you ready and focused. Choose your favorite music to boost motivation and make your workout even more enjoyable.</p>
                <p>Every session is thoughtfully designed to engage your entire body, ensuring balanced and effective training. You’ll work closely with your training partner for extra motivation and accountability, while our experienced coaches provide continuous supervision and personalized guidance to ensure optimal form and safety.</p>
              </div>
            </div>
          </div>
          
          <div className="expectation-slide">
            <div className="expectation-content-container">
              <div className="expectation-image">
                <img src="/assets/Recovery-and-Refuel.jpg" alt="Recovery and protein refuel" />
              </div>
              <div className="expectation-content">
                <h3>Recovery and Protein Refuel</h3>
                <p>After your session, refresh yourself in our brand-new showers with towels provided for your comfort.</p>
                <p>Then, gather at our bar for a complimentary, custom-made protein shake, crafted to support your recovery and fitness goals. Our coaches will join you for a relaxed debrief, answering any questions you may have about training, nutrition, or your overall progress.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default ExpectationsSection; 