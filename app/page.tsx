// Home page — the Hero component handles everything visible here
// (full-bleed image, headline, CTAs, and the Reviews carousel below the fold).

import type { Metadata } from 'next'
import Hero from './components/Hero'

export const metadata: Metadata = {
  title: 'Sibanye Centre For Special Needs | Special Needs School in Gqeberha',
  description:
    'Sibanye Centre For Special Needs is a special-needs day school and care centre in Newton Park, Gqeberha (Port Elizabeth), supporting children and young adults with autism, ADHD, Down syndrome and other learning disabilities.',
}

export default function Home() {
  return <Hero />
}
