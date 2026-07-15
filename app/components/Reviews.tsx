'use client'

// Reviews carousel — fetches all published reviews from /api/reviews and
// displays them in a horizontal snap-scroll track with dot navigation.
//
// The `overlay` prop controls two visual variants:
//   overlay={true}  — used on the Hero (glass-style cards over the hero image).
//                     Returns null entirely if there are no reviews yet, so the
//                     hero doesn't have an awkward empty gap.
//   overlay={false} — used standalone on a white/gray background (shows
//                     skeleton placeholders and a "Reviews coming soon" message
//                     while there's nothing to display).
//
// IntersectionObserver keeps track of which card is currently in view
// so the dot indicator stays in sync as you scroll.

import { useState, useEffect, useRef } from 'react';
import type { Review } from '@/app/lib/types';

const StarDisplay = ({ rating }: { rating: number }) => (
  <div className="flex gap-[3px] mb-3" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map(star => {
      const full = rating >= star;
      const half = !full && rating >= star - 0.5;
      return (
        <span
          key={star}
          className={`text-lg leading-none ${
            full ? 'text-yellow-400' : half ? 'star-half text-yellow-200' : 'text-yellow-200'
          }`}
        >
          ★
        </span>
      );
    })}
  </div>
);

const formatYears = (years: number | null) => {
  if (!years) return null;
  return `${years} year${years === 1 ? '' : 's'} at Sibanye`;
};

export default function Reviews({ overlay = false }: { overlay?: boolean }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => { setReviews(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!trackRef.current || reviews.length === 0) return;
    const cards = trackRef.current.querySelectorAll('.review-card');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveIndex(Number((entry.target as HTMLElement).dataset.index));
          }
        });
      },
      { root: trackRef.current, threshold: 0.5 }
    );

    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, [reviews]);

  const scrollToCard = (index: number) => {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll('.review-card');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  // ── Overlay (on-hero) styles ────────────────────────────────────────────────
  const sectionClass = overlay
    ? 'pt-8 pb-14 text-center'
    : 'bg-gray-50 py-16 pb-20 text-center';

  const headingClass = overlay
    ? 'text-2xl sm:text-3xl font-bold text-sky-800 mb-3 drop-shadow-sm'
    : 'text-3xl sm:text-4xl font-bold text-sky-800 mb-4';

  const cardClass = overlay
    ? 'review-card flex-[0_0_270px] md:flex-[0_0_290px] snap-start bg-white/80 backdrop-blur-sm border border-white/60 rounded-xl shadow-md p-5 text-left hover:-translate-y-1 hover:bg-white/90 transition-all duration-300'
    : 'review-card flex-[0_0_290px] md:flex-[0_0_310px] snap-start bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-left hover:-translate-y-1 hover:shadow-md transition-all duration-300';

  const dotActiveClass = overlay
    ? 'bg-sky-700 scale-125'
    : 'bg-sky-700 scale-125';

  const dotInactiveClass = overlay
    ? 'bg-white/50 hover:bg-white/80'
    : 'bg-gray-300 hover:bg-gray-400';

  // ── Loading / empty ─────────────────────────────────────────────────────────
  if (loading || reviews.length === 0) {
    if (overlay) return null;
    return (
      <div className={sectionClass}>
        <div className="mb-8">
          <h2 className={headingClass}>What Families Say</h2>
          <div className="w-14 h-1 mx-auto bg-sky-700 rounded-sm" />
        </div>
        {loading ? (
          <div className="flex gap-5 overflow-hidden px-10 max-w-5xl mx-auto">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex-[0_0_270px] h-36 rounded-xl animate-pulse bg-gray-200" />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-base py-8">Reviews coming soon.</p>
        )}
      </div>
    );
  }

  // ── Reviews carousel ────────────────────────────────────────────────────────
  return (
    <div className={sectionClass}>
      {!overlay && (
        <div className="mb-8">
          <h2 className={headingClass}>What Families Say</h2>
          <div className="w-14 h-1 mx-auto bg-sky-700 rounded-sm" />
        </div>
      )}

      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pt-1 px-10 md:px-12 pb-4 max-w-5xl mx-auto"
      >
        {reviews.map((review, i) => (
          <article key={review.id} data-index={i} className={cardClass}>
            <div className="border-b border-gray-200/70 pb-3 mb-3">
              <span className="font-semibold text-sky-800 block leading-snug">{review.name}</span>
              {review.years_enrolled && (
                <span className="text-xs text-gray-500 mt-0.5 block">{formatYears(review.years_enrolled)}</span>
              )}
            </div>
            <StarDisplay rating={review.rating} />
            <p className="text-sm text-gray-700 leading-relaxed italic">&ldquo;{review.review}&rdquo;</p>
          </article>
        ))}
      </div>

      {reviews.length > 1 && (
        <div className="flex justify-center gap-2 mt-5" role="tablist" aria-label="Review navigation">
          {reviews.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to review ${i + 1}`}
              onClick={() => scrollToCard(i)}
              className={`w-2 h-2 rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${
                i === activeIndex ? dotActiveClass : dotInactiveClass
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
