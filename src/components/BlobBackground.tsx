import React, { ReactElement } from 'react';
import '../styles/BlobBackground.css';

const BlobBackground: React.FC = () => {
  // Generate a diagonal wave pattern with the actual SVG boxes overlapping
  const renderLogos = () => {
    // Increase grid size to ensure better coverage of edges
    const rows = 7;  
    const cols = 7;  
    const logos: ReactElement[] = [];
    
    // Size of each logo
    const size = 400;
    
    // The NHS Brandmark SVG has two boxes (upper left and bottom right)
    // For perfect overlap of the actual boxes, we need precise positioning
    
    // This factor positions logos so the boxes overlap
    const overlapFactor = 0.5;
    
    // Calculate spacing to create the diagonal overlap pattern
    const horizontalSpacing = size * overlapFactor;
    const verticalSpacing = size * overlapFactor;
    
    // Adjust offsets to ensure proper edge coverage
    const xOffset = -200;  // Increased negative offset for better left edge coverage
    const yOffset = -200;  // Increased negative offset for better top edge coverage
    
    // Fine-tuning offset to create perfect diagonal alignment
    // These values shift each logo slightly down-right for perfect box alignment
    const fineAdjustX = 213;
    const fineAdjustY = 13;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Position calculation with fine-tuning adjustments for perfect box overlap
        const top = yOffset + (row * verticalSpacing) + (row * fineAdjustY);
        const left = xOffset + (col * horizontalSpacing) + (col * fineAdjustX);
        
        // Slightly lighter opacity for a less gray appearance
        const opacity = 0.3;
        
        logos.push(
          <div 
            key={`${row}-${col}`}
            className="logo-container"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}px`,
              left: `${left}px`,
              opacity: opacity,
            }}
          >
            <img 
              src="/assets/NHS-Brandmark-small.svg" 
              alt="NHS Logo" 
              className="nhs-logo"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        );
      }
    }
    
    return logos;
  };

  return (
    <div className="blob-background">
      {renderLogos()}
    </div>
  );
};

export default BlobBackground; 