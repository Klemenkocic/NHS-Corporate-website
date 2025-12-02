/**
 * UTM Tracking Utility
 * Captures and stores UTM parameters before cookie consent is granted
 * and sends them to Google Analytics after consent
 */

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const UTM_STORAGE_KEY = 'nhs_utm_params';
const UTM_TIMESTAMP_KEY = 'nhs_utm_timestamp';
const UTM_EXPIRY_DAYS = 30; // UTM params expire after 30 days

/**
 * Capture UTM parameters from the current URL
 */
export const captureUTMParams = (): UTMParams | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};

  // Check if any UTM parameters exist
  const hasUTM = urlParams.has('utm_source') ||
                  urlParams.has('utm_medium') ||
                  urlParams.has('utm_campaign') ||
                  urlParams.has('utm_term') ||
                  urlParams.has('utm_content');

  if (!hasUTM) {
    return null;
  }

  // Capture all UTM parameters
  if (urlParams.has('utm_source')) utmParams.utm_source = urlParams.get('utm_source')!;
  if (urlParams.has('utm_medium')) utmParams.utm_medium = urlParams.get('utm_medium')!;
  if (urlParams.has('utm_campaign')) utmParams.utm_campaign = urlParams.get('utm_campaign')!;
  if (urlParams.has('utm_term')) utmParams.utm_term = urlParams.get('utm_term')!;
  if (urlParams.has('utm_content')) utmParams.utm_content = urlParams.get('utm_content')!;

  return utmParams;
};

/**
 * Store UTM parameters in sessionStorage (survives page reloads but not tab closes)
 */
export const storeUTMParams = (params: UTMParams): void => {
  try {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
    sessionStorage.setItem(UTM_TIMESTAMP_KEY, Date.now().toString());
    console.log('[UTM Tracking] Stored UTM params:', params);
  } catch (error) {
    console.error('[UTM Tracking] Failed to store UTM params:', error);
  }
};

/**
 * Get stored UTM parameters
 */
export const getStoredUTMParams = (): UTMParams | null => {
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    const timestamp = sessionStorage.getItem(UTM_TIMESTAMP_KEY);

    if (!stored || !timestamp) {
      return null;
    }

    // Check if params have expired
    const storedTime = parseInt(timestamp, 10);
    const expiryTime = UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000; // Convert days to milliseconds

    if (Date.now() - storedTime > expiryTime) {
      clearStoredUTMParams();
      return null;
    }

    return JSON.parse(stored) as UTMParams;
  } catch (error) {
    console.error('[UTM Tracking] Failed to retrieve UTM params:', error);
    return null;
  }
};

/**
 * Clear stored UTM parameters
 */
export const clearStoredUTMParams = (): void => {
  try {
    sessionStorage.removeItem(UTM_STORAGE_KEY);
    sessionStorage.removeItem(UTM_TIMESTAMP_KEY);
    console.log('[UTM Tracking] Cleared stored UTM params');
  } catch (error) {
    console.error('[UTM Tracking] Failed to clear UTM params:', error);
  }
};

/**
 * Send UTM parameters to Google Analytics
 */
export const sendUTMToGA = (params: UTMParams): void => {
  if (typeof window.gtag === 'undefined') {
    console.warn('[UTM Tracking] Google Analytics (gtag) is not loaded yet');
    return;
  }

  try {
    // Send a custom event with UTM parameters
    window.gtag('event', 'utm_parameters_captured', {
      event_category: 'UTM Tracking',
      event_label: 'Post-Consent UTM Capture',
      utm_source: params.utm_source || '(not set)',
      utm_medium: params.utm_medium || '(not set)',
      utm_campaign: params.utm_campaign || '(not set)',
      utm_term: params.utm_term || '(not set)',
      utm_content: params.utm_content || '(not set)',
    });

    console.log('[UTM Tracking] Sent UTM params to GA:', params);
  } catch (error) {
    console.error('[UTM Tracking] Failed to send UTM params to GA:', error);
  }
};

/**
 * Initialize UTM tracking - call this on app load
 */
export const initUTMTracking = (): void => {
  const currentUTMParams = captureUTMParams();

  if (currentUTMParams) {
    storeUTMParams(currentUTMParams);
  }
};

/**
 * Process stored UTM parameters after consent is granted
 */
export const processStoredUTMParams = (): void => {
  const storedParams = getStoredUTMParams();

  if (storedParams) {
    // Wait a bit for gtag to be fully loaded
    setTimeout(() => {
      sendUTMToGA(storedParams);
      // Keep the params for the session in case user navigates
      // clearStoredUTMParams(); // Uncomment if you want to clear after sending
    }, 1000);
  }
};

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}
