// Gallery page — renders one GallerySlideshow per album, followed by the video showcase.
// Albums alternate between light and muted backgrounds for visual separation.
// All content (images and videos) is sourced from app/data/gallery.ts.

import type { Metadata } from 'next'
import GallerySlideshow from '../components/GallerySlideshow'
import GalleryVideoShowcase from '../components/GalleryVideoShowcase'
import GalleryNav from '../components/GalleryNav'
import PuzzleBorder from '../components/PuzzleBorder'
import { galleryAlbums, videoShowcase } from '../data/gallery'

export const metadata: Metadata = {
  title: 'Gallery | Sibanye Centre For Special Needs',
  description: 'Photos from life at Sibanye and our events and celebrations.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: '/gallery',
    siteName: 'Sibanye Centre For Special Needs',
    title: 'Gallery | Sibanye Centre For Special Needs',
    description:
      'See photos from daily life, activities, events and celebrations at Sibanye Centre For Special Needs in Gqeberha.',
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

export default function GalleryPage() {
  return (
    <div className="-mt-16">
      <section className="relative bg-sky-700 text-white pt-16 overflow-hidden">
        <PuzzleBorder scope="viewport" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-14 md:py-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Our Gallery
          </h1>
          <p className="text-lg sm:text-xl text-sky-100 font-light max-w-2xl mx-auto">
            A glimpse into the joyful moments we share every day.
          </p>
        </div>
      </section>

      <GalleryNav />

      {galleryAlbums.map((album, i) => (
        <div key={album.id} id={album.id}>
          <GallerySlideshow album={album} variant={i % 2 === 0 ? 'light' : 'muted'} />
        </div>
      ))}

      <div id={videoShowcase.id}>
        <GalleryVideoShowcase showcase={videoShowcase} variant="light" />
      </div>
    </div>
  )
}
