import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/ChallengesSection.css';

interface ChallengeCard {
  title: string;
  description: string;
}

const ChallengesSection: React.FC = () => {
  const { t } = useTranslation();

  const cards = (t as any)('landing.challenges.cards', {
    returnObjects: true
  }) as ChallengeCard[];

  return (
    <section id="challenges" className="challenges-section">
      <div className="challenges-container">
        <p className="eyebrow">{(t as any)('landing.challenges.eyebrow')}</p>
        <h2>{(t as any)('landing.challenges.title')}</h2>
        <p className="subtitle">{(t as any)('landing.challenges.subtitle')}</p>

        <div className="challenge-grid">
          {cards?.map((card, index) => (
            <div key={index} className="challenge-card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;

