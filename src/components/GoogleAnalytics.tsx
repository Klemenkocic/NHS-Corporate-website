/**
 * Google Analytics Component
 * Loads Google Tag Manager and Google Analytics
 * Only activates after user consent
 */

import { useEffect } from 'react';
import { processStoredUTMParams } from '../utils/utmTracking';

// Google Tag Manager ID - GT-NN6NB3N3
// Google Ads ID - AW-16907151980
const GTM_ID = 'GT-NN6NB3N3';
const GADS_ID = 'AW-16907151980';

interface GoogleAnalyticsProps {
  hasConsent: boolean;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ hasConsent }) => {
  useEffect(() => {
    if (!hasConsent) {
      return;
    }

    // Check if gtag is already loaded
    if (window.gtag) {
      console.log('[GA] Google Analytics already loaded');
      processStoredUTMParams();
      return;
    }

    console.log('[GA] Loading Google Analytics with consent...');

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());

    // Grant consent
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
    });

    // Configure Google Tag Manager
    window.gtag('config', GTM_ID);

    // Configure Google Ads
    window.gtag('config', GADS_ID);

    // Load the gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`;
    script.onload = () => {
      console.log('[GA] Google Analytics loaded successfully');
      // Process any stored UTM parameters after GA loads
      processStoredUTMParams();
    };
    script.onerror = () => {
      console.error('[GA] Failed to load Google Analytics');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [hasConsent]);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;
