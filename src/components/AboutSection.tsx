import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/AboutSection.css';

// Define a type that allows any translation key
type TranslationFunction = {
  (key: string): string;
};

const AboutSection: React.FC = () => {
  // Cast the t function to use our custom type
  const { t } = useTranslation() as { t: TranslationFunction };
  
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <h2>{t('about.header1')}</h2>
          <h2 className="highlight">{t('about.header2')}</h2>
        </div>
        
        <div className="stats-container">
          <div className="stat-card">
            <h3>{t('about.stats.stat1.value')}</h3>
            <p>{t('about.stats.stat1.text')}</p>
          </div>
          
          <div className="stat-card">
            <h3>{t('about.stats.stat2.value')}</h3>
            <p>{t('about.stats.stat2.text')}</p>
          </div>
          
          <div className="stat-card">
            <h3>{t('about.stats.stat3.value')}</h3>
            <p>{t('about.stats.stat3.text')}</p>
          </div>
          
          <div className="stat-card">
            <h3>{t('about.stats.stat4.value')}</h3>
            <p>{t('about.stats.stat4.text')}</p>
          </div>
          
          <div className="stat-card">
            <h3>{t('about.stats.stat5.value')}</h3>
            <p>{t('about.stats.stat5.text')}</p>
          </div>
          
          <div className="stat-card">
            <h3>{t('about.stats.stat6.value')}</h3>
            <p>{t('about.stats.stat6.text')}</p>
          </div>
        </div>
        
        <div className="sources-container">
          <span className="sources-text">
            {t('about.source')}
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
            <h3>{t('about.mission.title')}</h3>
            <p>{t('about.mission.paragraph1')}</p>
            <p>{t('about.mission.paragraph2')}</p>
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