import React from 'react';
import '../styles/PricingSection.css';

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2>THE NEW HEALTH SOCIETY</h2>
          <h2 className="highlight">SOLUTION</h2>
          <p>The ultimate corporate wellness transformation</p>
        </div>
        
        <div className="pricing-plans">
          <div className="pricing-card executive">
            <div className="card-header">
              <h3>EXECUTIVE TRAINING</h3>
            </div>
            <div className="card-content">
              <ul>
                <li>1-on-1 training for optimal results and busy schedules</li>
                <li>Monthly Coaching Sessions</li>
                <li>Monthly Health assessments & biometric tracking</li>
                <li>Custom nutrition & recovery plans for optimal performance</li>
                <li>Private gym access for complete focus</li>
                <li>Flexible scheduling for busy individuals</li>
              </ul>
            </div>
            <div className="card-price">
              <p>From 140€/session</p>
            </div>
            <div className="card-action">
              <button className="book-button">Book a Consultation</button>
            </div>
          </div>
          
          <div className="pricing-card group">
            <div className="card-header">
              <h3>GROUP TRAINING</h3>
            </div>
            <div className="card-content">
              <ul>
                <li>Small-group training for companies focusing on team building and health</li>
                <li>Maximum 1:6 personal trainer to participant ratio</li>
                <li>Monthly health assessments & biometric tracking</li>
                <li>Custom nutrition & recovery plans for optimal performance</li>
                <li>Private gym access for complete focus - your gym, your music, your people, your vibe</li>
                <li>Scheduling on availability during lunch time hours</li>
              </ul>
            </div>
            <div className="card-price">
              <p>On Request</p>
            </div>
            <div className="card-action">
              <button className="book-button">Request Pricing</button>
            </div>
          </div>
        </div>
        
        <div className="pricing-results">
          <div className="results-header">
            <h3>THE ROI OF INVESTING IN EMPLOYEE WELLNESS</h3>
          </div>
          <div className="results-container">
            <div className="stats-wrapper">
              <div className="results-stats">
                <div className="result-item">
                  <h4>30-50%</h4>
                  <p>Sick leaves drop by integrating wellness programs</p>
                </div>
                <div className="result-item">
                  <h4>3-6€ return</h4>
                  <p>for every €1 invested in wellness resulting in return in productivity</p>
                </div>
                <div className="result-item">
                  <h4>14 days</h4>
                  <p>per year / per employee gained back for active individuals in productivity</p>
                </div>
                <div className="result-item">
                  <h4>28%</h4>
                  <p>Reduction in health costs to the company</p>
                </div>
              </div>
              <div className="results-sources-container">
                <span className="results-sources-text">
                  Source:
                  <div className="results-sources-tooltip">
                    <ul>
                      <li><a href="https://www.sfmic.com/roi-and-voi-a-strong-wellness-program-measures-both/" target="_blank" rel="noopener noreferrer">SFMIC - ROI and VOI: A Strong Wellness Program Measures Both</a></li>
                      <li><a href="https://www.kff.org/health-costs/report/2023-employer-health-benefits-survey/" target="_blank" rel="noopener noreferrer">KFF - 2023 Employer Health Benefits Survey</a></li>
                      <li><a href="https://www.ehstoday.com/safety-leadership/article/21918281/presenteeism-costs-business-10-times-more-than-absenteeism" target="_blank" rel="noopener noreferrer">EHS Today - Presenteeism Costs Business 10 Times More</a></li>
                    </ul>
                  </div>
                </span>
              </div>
            </div>
            <div className="results-image">
              <img src="/assets/Comprehensive-Training-New.jpg" alt="Comprehensive Training session" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 