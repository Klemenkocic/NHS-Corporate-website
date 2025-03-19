import React, { useEffect } from 'react';
import '../styles/ContactSection.css';

const ContactSection: React.FC = () => {
  useEffect(() => {
    // Load Typeform embed script
    const script = document.createElement('script');
    script.src = 'https://embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      const embedScript = document.querySelector('script[src="https://embed.typeform.com/next/embed.js"]');
      if (embedScript && embedScript.parentNode) {
        embedScript.parentNode.removeChild(embedScript);
      }
    };
  }, []);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2>GET IN</h2>
          <h2 className="highlight">TOUCH</h2>
          <p>Ready to transform your corporate wellness program? Contact us today.</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-form">
            <div 
              data-tf-live="01JPPQ7QCRVX99ZA7GAKR8QGS8"
              style={{ width: '100%', height: '500px' }}
            ></div>
          </div>
          
          <div className="contact-details">
            <div className="contact-info-box">
              <h3>Contact Information</h3>
              <div className="contact-info">
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <p>Lilienthalallee 5 | 80807 München</p>
                </div>
                <div className="info-item">
                  <span className="info-icon">📱</span>
                  <p>+49 176 81253942</p>
                </div>
                <div className="info-item">
                  <span className="info-icon">✉️</span>
                  <p>info@newhealthsociety.com</p>
                </div>
              </div>
            </div>
            
            <div className="hours-box">
              <h3>Opening Hours</h3>
              <div className="hours-grid">
                <div className="day">Monday - Friday</div>
                <div className="time">11:00 - 16:00</div>
                <div className="day">Saturday</div>
                <div className="time">Closed</div>
                <div className="day">Sunday</div>
                <div className="time">Closed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 