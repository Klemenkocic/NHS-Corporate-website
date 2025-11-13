import React, { useEffect } from 'react';
import './App.css';
import './i18n';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import InvestmentSection from './components/PricingSection';
import ExpectationsSection from './components/ExpectationsSection';
import ClientsSection from './components/ClientsSection';
import LocationSection from './components/LocationSection';
import ContactSection from './components/ContactSection';
import BlobBackground from './components/BlobBackground';
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
        <HeroSection />
        <AboutSection />
        <InvestmentSection />
        <ExpectationsSection />
        <ClientsSection />
        <LocationSection />
        <ContactSection />
        <BackToTop />
        <CookieConsent />
      </div>
    </>
  );
};

export default App;