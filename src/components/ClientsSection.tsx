import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/ClientsSection.css';

// Define a type that allows any translation key
type TranslationFunction = {
  (key: string): string;
};

const ClientsSection: React.FC = () => {
  // Cast the t function to use our custom type
  const { t } = useTranslation() as { t: TranslationFunction };

  // Client data with logo image paths
  const clients = [
    { name: 'Google', logo: '/assets/Google.png' },
    { name: 'Autodoc', logo: '/assets/autodoc.svg' },
    { name: 'ImmoScout24', logo: '/assets/ImmoScout24.png' },
    { name: 'Klarna', logo: '/assets/Klarna.webp' },
    { name: 'BioNTech', logo: '/assets/BioNTech.png' },
    { name: 'Autohero', logo: '/assets/autohero.png' },
    { name: 'CHS', logo: '/assets/csm_CHS_Logo_RGB_d40d58f2d9.png' },
    { name: 'Witte', logo: '/assets/witte.png' },
  ];

  return (
    <section className="clients-section">
      <div className="clients-container">
        <div className="clients-header">
          <h2>{t('clients.title')}</h2>
          <h2 className="highlight">LEADING COMPANIES</h2>
          <p className="clients-subtext">Executives from these companies have trusted our coaches!</p>
        </div>
        
        <div className="clients-logos">
          {clients.map((client, index) => (
            <div key={index} className="client-logo">
              <img src={client.logo} alt={`${client.name} logo`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection; 