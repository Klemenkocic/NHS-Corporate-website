import React, { useEffect } from 'react';
import './App.css';
import './i18n';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ClientsSection from './components/ClientsSection';
import ChallengesSection from './components/ChallengesSection';
import GoogleReviewsSection from './components/GoogleReviewsSection';
import ExpectationsSection from './components/ExpectationsSection';
import StepsSection from './components/StepsSection';
import FacilityGallerySection from './components/FacilityGallerySection';
import ContactSection from './components/ContactSection';
import FinalCTASection from './components/FinalCTASection';
import BlobBackground from './components/BlobBackground';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import CookieConsent from './components/CookieConsent';

const App: React.FC = () => {
  useEffect(() => {
    // Function to send height to parent iframe
    const sendHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: 'resize', height }, '*');
    };

    // Send height on load
    sendHeight();

    // Send height when window resizes
    window.addEventListener('resize', sendHeight);

    // Send height when content changes (use MutationObserver)
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true 
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', sendHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <BlobBackground />
      <div className="App">
        <Navbar />
        <HeroSection />
        <ClientsSection />
        <ChallengesSection />
        <GoogleReviewsSection />
        <ExpectationsSection
          sectionId="experience"
          translationKey="landing.features.experience"
        />
        <FacilityGallerySection />
        <StepsSection
          sectionId="steps"
          translationKey="landing.features.steps"
        />
        <ExpectationsSection
          sectionId="transformations"
          translationKey="landing.features.transformations"
        />
        <FinalCTASection />
        <ContactSection />
        <Footer />
        <BackToTop />
        <CookieConsent />
      </div>
    </>
  );
};

export default App;