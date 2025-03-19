import React from 'react';
import '../styles/AboutSection.css';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <h2>THE COSTLY IMPACT OF</h2>
          <h2 className="highlight">EMPLOYEE HEALTH ISSUES</h2>
        </div>
        
        <div className="stats-container">
          <div className="stat-card">
            <h3>14%</h3>
            <p>Of all sick leave in Germany is due to back pain alone</p>
          </div>
          
          <div className="stat-card">
            <h3>96.7M€</h3>
            <p>Equating to lost revenue of</p>
          </div>
          
          <div className="stat-card">
            <h3>2.4M+</h3>
            <p>Workdays per year are lost due to back related illnesses in Munich</p>
          </div>
          
          <div className="stat-card">
            <h3>€250M+</h3>
            <p>Lost yearly in Munich alone. Workplace inefficiencies and stalled projects drain finances</p>
          </div>
          
          <div className="stat-card">
            <h3>2-6X</h3>
            <p>More expensive working in pain than health related leave - resulting in efficiency loss</p>
          </div>
          
          <div className="stat-card">
            <h3>2945 €</h3>
            <p>Per year — that's the average cost of an employee's lack of productivity due to pain</p>
          </div>
        </div>
        
        <div className="sources-container">
          <span className="sources-text">
            Source
            <div className="sources-tooltip">
              <ul>
                <li><a href="https://www.statistik.bayern.de/presse/mitteilungen/2024/pm210/index.html#:~:text=In%20der%20Stadt%20M%C3%BCnchen%20liegt,bei%20rund%2046%20Milliarden%20Euro" target="_blank" rel="noopener noreferrer">Statistik Bayern - Economy in Munich</a></li>
                <li><a href="https://www.tk.de/presse/themen/praevention/gesundheitsstudien/fehltage-2023-rueckenbeschwerden-2168354" target="_blank" rel="noopener noreferrer">TK Study - Back Pain Issues</a></li>
                <li><a href="https://de.statista.com/statistik/daten/studie/1107939/umfrage/beschaeftigte-in-muenchen/" target="_blank" rel="noopener noreferrer">Statista - Employment in Munich</a></li>
                <li><a href="https://www.statistik.bayern.de/presse/mitteilungen/2024/pm210/index.html#:~:text=In%20der%20Stadt%20München%20liegt,bei%20rund%2046%20Milliarden%20Euro" target="_blank" rel="noopener noreferrer">Statistik Bayern - Munich Revenue</a></li>
              </ul>
            </div>
          </span>
        </div>
        
        <div className="about-content">
          <div className="text-content">
            <h3>OUR MISSION</h3>
            <p>New Health Society is revolutionizing corporate wellness by offering premium health services that improve employee wellbeing and company performance.</p>
            <p>We combine professional training techniques and personalized assessments with weekly team building experinces to create sustainable team health that in turn delivers measurable ROI for businesses of all sizes.</p>
          </div>
          
          <div className="image-content">
            <img src="/assets/gym.jpg" alt="New Health Society Facility" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 