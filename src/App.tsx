import React, { useEffect, useState } from 'react';
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
import FinalCTASection from './components/FinalCTASection';
import BlobBackground from './components/BlobBackground';
import BackToTop from './components/BackToTop';
import CookieConsent from './components/CookieConsent';
import GoogleAnalytics from './components/GoogleAnalytics';
import { initUTMTracking } from './utils/utmTracking';

const App: React.FC = () => {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Initialize UTM tracking immediately (before consent)
    // This captures UTM parameters from the URL and stores them
    initUTMTracking();
    console.log('[App] UTM tracking initialized');

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

  const handleConsentChange = (accepted: boolean) => {
    setHasConsent(accepted);
    console.log('[App] Cookie consent changed:', accepted ? 'accepted' : 'declined');
  };

  return (
    <>
      <BlobBackground />
      <GoogleAnalytics hasConsent={hasConsent} />
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
        <BackToTop />
        <CookieConsent onConsentChange={handleConsentChange} />
      </div>
    </>
  );
};

export default App;