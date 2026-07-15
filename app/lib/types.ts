// Shared TypeScript types that mirror the Neon database schema.
// Review is used by the /api/reviews route and the Reviews component.
// ReviewToken is used by the token-generation and validation API routes.

export type Review = {
  id: string;
  name: string;
  years_enrolled: number | null;
  rating: number;
  review: string;
  created_at: string;
};

export type ReviewToken = {
  id: string;
  token: string;
  event_label: string | null;
  used: boolean;
  expires_at: string;
  created_at: string;
};
