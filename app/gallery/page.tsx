// Gallery page — renders one GallerySlideshow per album, followed by the video showcase.
// Albums alternate between light and muted backgrounds for visual separation.
// All content (images and videos) is sourced from app/data/gallery.ts.

import GallerySlideshow from '../components/GallerySlideshow'
import GalleryVideoShowcase from '../components/GalleryVideoShowcase'
import GalleryNav from '../components/GalleryNav'
import PuzzleBorder from '../components/PuzzleBorder'
import { galleryAlbums, videoShowcase } from '../data/gallery'

export const metadata = {
  title: 'Gallery | Sibanye Centre For Special Needs',
  description: 'Photos from life at Sibanye and our events and celebrations.',
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
