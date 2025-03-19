import React from 'react';
import '../styles/HeroSection.css';
import { Button } from "@heroui/react";

const HeroSection: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <Button
          style={{
            background: 'linear-gradient(to right, #005eb8, #00205b)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 24px',
            fontSize: '16px',
            fontWeight: 500,
            boxShadow: '0 4px 14px 0 rgba(0, 94, 184, 0.39)',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease, transform 0.2s ease'
          }}
          radius="md"
          onClick={(e: React.MouseEvent) => scrollToSection(e, 'pricing')}
          className="nav-contact-button"
        >
          Pricing
        </Button>
      </div>
    </section>
  );
};

export default HeroSection; 