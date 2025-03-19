import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src="/assets/NHS Logo black-cropped.svg" alt="New Health Society Logo" className="footer-logo-white" />
            <p>Revolutionizing Corporate Wellness</p>
          </div>
          
          <div className="footer-nav">
            <div className="footer-nav-column">
              <h4>About</h4>
              <ul>
                <li><a href="#about">Our Mission</a></li>
                <li><a href="#pricing">Services</a></li>
                <li><a href="#expectations">What to Expect</a></li>
              </ul>
            </div>
            
            <div className="footer-nav-column">
              <h4>Connect</h4>
              <ul>
                <li><a href="#location">Location</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#pricing">Request Pricing</a></li>
              </ul>
            </div>
            
            <div className="footer-nav-column">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="https://instagram.com/newhealthsociety" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://linkedin.com/company/new-health-society" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://facebook.com/newhealthsociety" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} New Health Society. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/imprint">Imprint</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 