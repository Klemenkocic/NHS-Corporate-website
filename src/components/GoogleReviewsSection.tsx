import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation() as { t: TranslationFunction };
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        const response = await fetch(
          `https://places.googleapis.com/v1/places/${placeId}`,
          {
            headers: {
              'X-Goog-Api-Key': apiKey,
              'X-Goog-FieldMask':
                'rating,userRatingCount,reviews.authorAttribution.displayName,reviews.authorAttribution.uri,reviews.rating,reviews.text,reviews.relativePublishTimeDescription'
            },
            signal: controller.signal
          }
        );

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        setReviews(data.reviews || []);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
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
          <p className="eyebrow">{t('landing.reviews.eyebrow')}</p>
          <h2>{t('landing.reviews.title')}</h2>
          <p className="subtitle">{t('landing.reviews.subtitle')}</p>
        </div>

        <div className="reviews-summary">
          <div className="rating-value">
            {Number.isFinite(rating) ? rating.toFixed(1) : '5.0'}
          </div>
          <div>
            <p className="rating-label">{t('landing.reviews.ratingLabel')}</p>
            <p className="rating-sub">{t('landing.reviews.ratingSub')}</p>
          </div>
        </div>

        {loading && (
          <div className="reviews-status">{t('landing.reviews.loading')}</div>
        )}

        {error && <div className="reviews-status error">{error}</div>}

        {!loading && !error && (
          <div className="reviews-grid">
            {reviews.map((review, index) => (
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
        )}
      </div>
    </section>
  );
};

export default GoogleReviewsSection;

