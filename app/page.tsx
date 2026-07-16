// Home page — the Hero component handles everything visible here
// (full-bleed image, headline, CTAs, and the Reviews carousel below the fold).

import type { Metadata } from 'next'
import Hero from './components/Hero'

export const metadata: Metadata = {
  title: 'Sibanye Centre For Special Needs | Special Needs School in Gqeberha',
  description:
    'Sibanye Centre For Special Needs is a special-needs day school and care centre in Newton Park, Gqeberha (Port Elizabeth), supporting children and young adults with autism, ADHD, Down syndrome and other learning disabilities.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: '/',
    siteName: 'Sibanye Centre For Special Needs',
    title: 'Sibanye Centre For Special Needs | Special Needs School in Gqeberha',
    description:
      'A special-needs day school and care centre in Newton Park, Gqeberha, supporting children and young adults with autism, ADHD, Down syndrome and other learning disabilities.',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1024,
        height: 683,
        alt: 'Sibanye Centre For Special Needs in Newton Park, Gqeberha',
      },
    ],
  },
}

export default function Home() {
  return <Hero />
}
