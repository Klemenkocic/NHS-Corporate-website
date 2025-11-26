import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/StepsSection.css';

export interface StepItem {
  title: string;
  image: string;
  alt: string;
  bullets: string[];
}

interface StepsSectionProps {
  sectionId: string;
  translationKey: string;
}

const StepsSection: React.FC<StepsSectionProps> = ({
  sectionId,
  translationKey
}) => {
  const { t } = useTranslation();

  const steps = (t as any)(`${translationKey}.slides`, {
    returnObjects: true
  }) as StepItem[];

  const title = (t as any)(`${translationKey}.title`);
  const subtitle = (t as any)(`${translationKey}.subtitle`);

  return (
    <section id={sectionId} className="steps-section">
      <div className="steps-container">
        <div className="steps-header">
          <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
          <p dangerouslySetInnerHTML={{ __html: subtitle }}></p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <h3>{step.title}</h3>
              <p>{step.bullets.join(' ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
