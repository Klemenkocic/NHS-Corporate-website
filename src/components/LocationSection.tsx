import React from 'react';
import '../styles/LocationSection.css';

const LocationSection: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="location" className="location-section">
      <div className="location-container">
        <div className="location-header">
          <h2>HOW TO</h2>
          <h2 className="highlight">FIND US</h2>
          <p className="location-subtext">We're excited to welcome you to New Health Society! Here's everything you need to find us easily and start your journey toward peak performance.</p>
        </div>
        
        <div className="location-content">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.7325075069197!2d11.618826376992697!3d48.17551187127114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e75bc6516c31f%3A0xf7bd9a4c60853bef!2sLilienthalallee%205%2C%2080807%20M%C3%BCnchen%2C%20Germany!5e0!3m2!1sen!2sus!4v1710798539626!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="New Health Society Location"
            ></iframe>
          </div>
          
          <div className="accessibility-box">
            <h3>Accessibility</h3>
            <p>Lilienthalallee 5 | 80807 München</p>
            <ul className="accessibility-features">
              <li>Plenty of parking spaces are available for stress-free visits.</li>
              <li>Easy to reach via Frankfurter Ring by car.</li>
              <li>Public transport-friendly with direct access via U6 (Studentenstadt).</li>
              <li>Bike-friendly location with nearby racks for cyclists.</li>
            </ul>
            <p className="tour-text">Book a free tour today and experince your new gym in action. Fill out the Typeform bellow!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection; 