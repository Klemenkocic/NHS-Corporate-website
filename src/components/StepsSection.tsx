import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/StepsSection.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Only apply GSAP animations on desktop
    const isDesktop = window.innerWidth > 768;

    if (!isDesktop || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate each step as it comes into view
      stepsRef.current.forEach((step, index) => {
        if (!step) return;

        gsap.fromTo(
          step,
          {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            scale: 0.9
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              markers: false
            }
          }
        );

        // Animate the connector line
        const connector = step.querySelector('.step-connector');
        if (connector) {
          gsap.fromTo(
            connector,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = (t as any)(`${translationKey}.slides`, {
    returnObjects: true
  }) as StepItem[];

  const title = (t as any)(`${translationKey}.title`);
  const subtitle = (t as any)(`${translationKey}.subtitle`);

  return (
    <section ref={sectionRef} id={sectionId} className="steps-section">
      <div className="steps-container">
        <div className="steps-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="steps-timeline">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) stepsRef.current[index] = el;
              }}
              className={`step-item ${index % 2 === 0 ? 'step-left' : 'step-right'}`}
            >
              <div className="step-number">{index + 1}</div>

              <div className="step-content">
                <div className="step-image">
                  <img src={step.image} alt={step.alt} />
                </div>

                <div className="step-text">
                  <h3>{step.title}</h3>
                  <ul className="step-bullets">
                    {step.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="step-connector"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
