// Leave-a-review page — only accessible via a personalised one-time link generated
// by the admin endpoint (/api/admin/generate-token).
//
// LeaveReviewContent is a client component that reads the ?token= query parameter
// and must be wrapped in Suspense because useSearchParams() requires it in Next.js 15+.
// The Suspense fallback shows a spinner while the client bundle loads.

import { Suspense } from 'react';
import type { Metadata } from 'next';
import LeaveReviewContent from './LeaveReviewContent';

export const metadata: Metadata = {
  title: 'Leave a Review | Sibanye Centre For Special Needs',
  description: 'Share your experience with Sibanye Centre For Special Needs.',
  alternates: {
    canonical: '/leave-review',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LeaveReviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-sky-700 py-14 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Leave a Review</h1>
        <p className="text-sky-100 text-lg max-w-xl mx-auto">
          Thank you for taking the time to share your experience with us.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="max-w-lg mx-auto px-6 py-14">
            <div className="bg-white rounded-2xl shadow-md p-8 flex justify-center">
              <div className="inline-block w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        }
      >
        <LeaveReviewContent />
      </Suspense>
    </div>
  );
}
