import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@heroui/react";
import '../styles/GoogleReviewsSection.css';
import { TranslationFunction } from '../types/i18n';

interface GoogleReview {
  authorAttribution?: {
    displayName?: string;
    uri?: string;
  };
  rating?: number;
  text?: {
    text?: string;
  };
  relativePublishTimeDescription?: string;
}

const GoogleReviewsSection: React.FC = () => {
  const { t, i18n } = useTranslation() as { t: TranslationFunction; i18n: any };
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalRatings, setTotalRatings] = useState<number>(0);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
    const placeId =
      process.env.REACT_APP_GOOGLE_PLACE_ID || 'ChIJ39twPwB1nkcRlt7w_DSf9Bg';

    if (!apiKey) {
      setError(t('landing.reviews.missingApiKey'));
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchReviews = async () => {
      try {
        setLoading(true);

        console.log('Fetching reviews with Place ID:', placeId);
        console.log('API Key present:', !!apiKey);

        // Use the new Google Places API (New) endpoint
        const response = await fetch(
          `https://places.googleapis.com/v1/places/${placeId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': apiKey,
              'X-Goog-FieldMask': 'rating,userRatingCount,reviews'
            },
            signal: controller.signal
          }
        );

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          let errorData;
          try {
            errorData = JSON.parse(errorText);
            console.error('API Error (parsed):', errorData);
          } catch {
            console.error('Could not parse error response');
          }
          throw new Error(`Request failed: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Reviews data received:', data);
        console.log('Number of reviews:', data.reviews?.length || 0);
        setReviews(data.reviews || []);
        setTotalRatings(data.userRatingCount || 0);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Fetch error details:', err);
          console.error('Error message:', (err as Error).message);
          setError(t('landing.reviews.error'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();

    return () => controller.abort();
  }, [t]);

  const rating =
    reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
    (reviews.length || 1);

  return (
    <section id="reviews" className="google-reviews-section">
      <div className="reviews-container">
        <div className="reviews-header">
          {t('landing.reviews.eyebrow') && (
            <p className="eyebrow">{t('landing.reviews.eyebrow')}</p>
          )}
          <h2 dangerouslySetInnerHTML={{ __html: t('landing.reviews.title') }}></h2>
          <p className="subtitle" dangerouslySetInnerHTML={{ __html: t('landing.reviews.subtitle') }}></p>
          <p className="subtitle2" dangerouslySetInnerHTML={{ __html: t('landing.reviews.subtitle2') }}></p>
        </div>

        <div className="reviews-summary">
          <div className="rating-value">
            {Number.isFinite(rating) ? rating.toFixed(1) : '5.0'}
          </div>
          <div>
            <p className="rating-label">{t('landing.reviews.ratingLabel')}</p>
            <p className="rating-sub">
              {totalRatings > 0
                ? `${t('landing.reviews.ratingSub')} (${totalRatings} ${t('landing.reviews.ratingsCount', { count: totalRatings })})`
                : t('landing.reviews.ratingSub')
              }
            </p>
          </div>
        </div>

        {loading && (
          <div className="reviews-status">{t('landing.reviews.loading')}</div>
        )}

        {error && <div className="reviews-status error">{error}</div>}

        {!loading && !error && reviews.length > 0 && (
          <>
            <div className="reviews-carousel-wrapper">
              <div className="reviews-carousel">
                <div className="reviews-track">
                  {[...reviews, ...reviews].map((review, index) => (
                    <div key={index} className="review-card">
                      <div className="reviewer">
                        <strong>{review.authorAttribution?.displayName}</strong>
                        <span>{review.relativePublishTimeDescription}</span>
                      </div>
                      <div className="review-rating">
                        {'★'.repeat(review.rating || 5).padEnd(5, '☆')}
                      </div>
                      <p>{review.text?.text}</p>
                      {review.authorAttribution?.uri && (
                        <a
                          href={review.authorAttribution.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t('landing.reviews.viewOnGoogle')}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="reviews-cta">
              <Button
                className="primary-button"
                radius="md"
                onClick={() => {
                  const currentLanguage = i18n.language;
                  const url = currentLanguage === 'de'
                    ? 'https://newhealthsociety.com/de/kostenlose-erstberatung/?utm_source=landing_page&utm_medium=cta_button&utm_campaign=paid_ads'
                    : 'https://newhealthsociety.com/free-initial-consultation/?utm_source=landing_page&utm_medium=cta_button&utm_campaign=paid_ads';

                  window.top!.location.href = url;
                }}
              >
                {t('landing.reviews.cta')}
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GoogleReviewsSection;

