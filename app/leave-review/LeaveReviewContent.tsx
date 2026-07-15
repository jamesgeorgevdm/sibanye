'use client'

// Token-gated review submission flow — three states:
//   null  — token is being validated against the database (shows spinner)
//   false — token is missing, used, or expired (shows error card)
//   true  — token is valid (shows LeaveReviewForm)
//
// Once the review is submitted, /api/reviews marks the token as used so the
// same link can't be used twice. The token itself is passed through to the
// POST body and validated server-side again.
//
// StarPicker supports half-star values (0.5 increments) via mouse-position detection.
// The Field component at the bottom is just a label+input wrapper to cut down on repetition.

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// ─── Star Picker ─────────────────────────────────────────────────────────────

const StarPicker = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered !== null ? hovered : value;

  return (
    <div
      className="flex gap-2"
      role="group"
      aria-label="Star rating"
      onMouseLeave={() => setHovered(null)}
    >
      {[1, 2, 3, 4, 5].map(star => {
        const isFull = display >= star;
        const isHalf = !isFull && display >= star - 0.5;
        return (
          <span
            key={star}
            role="button"
            tabIndex={0}
            aria-label={`${star} stars`}
            className={`relative text-4xl leading-none cursor-pointer select-none transition-transform duration-150 hover:scale-110 ${
              isFull ? 'text-yellow-400' : isHalf ? 'star-half text-yellow-200' : 'text-yellow-200'
            }`}
            onMouseMove={e => {
              const { left, width } = e.currentTarget.getBoundingClientRect();
              setHovered(e.clientX - left < width / 2 ? star - 0.5 : star);
            }}
            onClick={e => {
              const { left, width } = e.currentTarget.getBoundingClientRect();
              onChange(e.clientX - left < width / 2 ? star - 0.5 : star);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') onChange(star);
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-sky-600 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Review Form ──────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  years_enrolled: string;
  rating: number;
  review: string;
};

function LeaveReviewForm({ token }: { token: string }) {
  const [form, setForm] = useState<FormState>({
    name: '',
    years_enrolled: '',
    rating: 0,
    review: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0) {
      setSubmitError('Please select a star rating.');
      return;
    }
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, token }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Could not submit your review. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
        <p className="text-gray-500 max-w-xs mx-auto text-sm">
          Your review has been received. We really appreciate you taking the time.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Field label="Your Name" required>
        <input
          type="text"
          required
          placeholder="e.g. The Smith Family"
          className="input"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
      </Field>

      <Field label="Years Enrolled at Sibanye">
        <input
          type="number"
          min={1}
          max={30}
          placeholder="e.g. 3"
          className="input"
          value={form.years_enrolled}
          onChange={e => setForm(f => ({ ...f, years_enrolled: e.target.value }))}
        />
        <p className="text-xs text-gray-400 mt-1">Optional</p>
      </Field>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating <span className="text-sky-600">*</span>
        </label>
        <StarPicker
          value={form.rating}
          onChange={rating => setForm(f => ({ ...f, rating }))}
        />
      </div>

      <Field label="Your Review" required>
        <textarea
          required
          rows={5}
          placeholder="Tell us about your experience…"
          className="input resize-none"
          value={form.review}
          onChange={e => setForm(f => ({ ...f, review: e.target.value }))}
        />
      </Field>

      {submitError && (
        <p
          role="alert"
          className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3"
        >
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 px-6 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-semibold rounded-xl transition-colors text-base cursor-pointer"
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Submitting…
          </span>
        ) : (
          'Submit Review'
        )}
      </button>
    </form>
  );
}

// ─── Page Content ─────────────────────────────────────────────────────────────

export default function LeaveReviewContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [tokenError, setTokenError] = useState('');

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setTokenError(
        'No review link found. Please use the personalised link that was sent to you.'
      );
      return;
    }

    fetch(`/api/validate-token?token=${encodeURIComponent(token)}`)
      .then(res => res.json())
      .then(data => {
        setTokenValid(!!data.valid);
        if (!data.valid) {
          setTokenError(data.error || 'This link is invalid or has already been used.');
        }
      })
      .catch(() => {
        setTokenValid(false);
        setTokenError(
          'Could not verify your link. Please check your connection and try again.'
        );
      });
  }, [token]);

  return (
    <div className="max-w-lg mx-auto px-6 py-14">
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">

        {/* Verifying */}
        {tokenValid === null && (
          <div className="py-16 text-center">
            <div className="inline-block w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-sm mt-4">Verifying your link…</p>
          </div>
        )}

        {/* Invalid token */}
        {tokenValid === false && (
          <div className="py-12 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Link Unavailable</h2>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">{tokenError}</p>
          </div>
        )}

        {/* Valid token — show form */}
        {tokenValid === true && token && <LeaveReviewForm token={token} />}
      </div>
    </div>
  );
}
