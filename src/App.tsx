import React from 'react';
import './App.css';
import './i18n';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import InvestmentSection from './components/PricingSection';
import ExpectationsSection from './components/ExpectationsSection';
import ClientsSection from './components/ClientsSection';
import LocationSection from './components/LocationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BlobBackground from './components/BlobBackground';
import BackToTop from './components/BackToTop';
import CookieConsent from './components/CookieConsent';

const App: React.FC = () => {
  return (
    <>
      <BlobBackground />
      <div className="App">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <InvestmentSection />
        <ExpectationsSection />
        <ClientsSection />
        <LocationSection />
        <ContactSection />
        <Footer />
        <BackToTop />
        <CookieConsent />
      </div>
    </>
  );
};

export default App;
