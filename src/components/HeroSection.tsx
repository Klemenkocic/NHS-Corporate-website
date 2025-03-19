import React from 'react';
import '../styles/HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="video-container">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/assets/Website-Video.m4v" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
      </div>
      <div className="hero-content">
        <h1>REVOLUTIONIZING</h1>
        <h1 className="highlight">CORPORATE WELLNESS</h1>
        <p>ENHANCING PERFORMANCE, HEALTH, & ROI</p>
        <button className="cta-button">Get Started</button>
      </div>
    </section>
  );
};

export default HeroSection; 