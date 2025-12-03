import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/PricingSection.css';
import { Button } from "@heroui/react";
import { TranslationFunction } from '../types/i18n';
import { buildConsultationURL } from '../utils/utmTracking';

const InvestmentSection: React.FC = () => {
  // Cast the t function to use our custom type
  const { t, i18n } = useTranslation() as { t: TranslationFunction; i18n: any };

  // Add function to handle contact form opening or redirect
  const handleBookConsultation = () => {
    const baseUrl = 'https://newhealthsociety.com/de/kostenlose-erstberatung-ads/';

    const url = buildConsultationURL(baseUrl);
    window.top!.location.href = url;
  };

  return (
    <section id="investment" className="pricing-section">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2>{t('pricing.header2')}</h2>
        </div>
        
        <div className="pricing-plans">
          <div className="pricing-card executive">
            <div className="card-header">
              <h3>{t('pricing.executive.title')}</h3>
            </div>
            <div className="card-content">
              <ul>
                <li>{t('pricing.executive.features.feature1')}</li>
                <li>{t('pricing.executive.features.feature2')}</li>
                <li>{t('pricing.executive.features.feature3')}</li>
                <li>{t('pricing.executive.features.feature4')}</li>
                <li>{t('pricing.executive.features.feature5')}</li>
                <li>{t('pricing.executive.features.feature6')}</li>
              </ul>
            </div>
            <div className="card-price">
              <p>{t('pricing.executive.price')}</p>
            </div>
            <div className="card-action">
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
                onClick={handleBookConsultation}
                className="nav-contact-button"
              >
                {t('pricing.executive.cta')}
              </Button>
            </div>
          </div>
          
          <div className="pricing-card group">
            <div className="card-header">
              <h3>{t('pricing.group.title')}</h3>
            </div>
            <div className="card-content">
              <ul>
                <li>{t('pricing.group.features.feature1')}</li>
                <li>{t('pricing.group.features.feature2')}</li>
                <li>{t('pricing.group.features.feature3')}</li>
                <li>{t('pricing.group.features.feature4')}</li>
                <li>{t('pricing.group.features.feature5')}</li>
                <li>{t('pricing.group.features.feature6')}</li>
              </ul>
            </div>
            <div className="card-price">
              <p>{t('pricing.group.price')}</p>
            </div>
            <div className="card-action">
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
                onClick={handleBookConsultation}
                className="nav-contact-button"
              >
                {t('pricing.group.cta')}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pricing-results">
          <div className="results-header">
            <h3>{t('pricing.roi.title')}</h3>
          </div>
          <div className="results-container">
            <div className="stats-wrapper">
              <div className="results-stats">
                <div className="result-item">
                  <h4>{t('pricing.roi.stats.stat1.value')}</h4>
                  <p>{t('pricing.roi.stats.stat1.text')}</p>
                </div>
                <div className="result-item">
                  <h4>{t('pricing.roi.stats.stat2.value')}</h4>
                  <p>{t('pricing.roi.stats.stat2.text')}</p>
                </div>
                <div className="result-item">
                  <h4>{t('pricing.roi.stats.stat3.value')}</h4>
                  <p>{t('pricing.roi.stats.stat3.text')}</p>
                </div>
                <div className="result-item">
                  <h4>{t('pricing.roi.stats.stat4.value')}</h4>
                  <p>{t('pricing.roi.stats.stat4.text')}</p>
                </div>
              </div>
              <div className="results-sources-container">
                <span className="results-sources-text">
                  {t('pricing.roi.source')}:
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
              <img src="/assets/ROI.jpg" alt="Return on Investment in Corporate Wellness" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentSection; 