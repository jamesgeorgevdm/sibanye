import GallerySlideshow from '../components/GallerySlideshow'
import GalleryVideoShowcase from '../components/GalleryVideoShowcase'
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
        <PuzzleBorder scope="viewport" className="!top-0" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-14 md:py-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Our Gallery
          </h1>
          <p className="text-lg sm:text-xl text-sky-100 font-light max-w-2xl mx-auto">
            A glimpse into the joyful moments we share every day.
          </p>
        </div>
      </section>

      {galleryAlbums.map((album, i) => (
        <GallerySlideshow key={album.id} album={album} variant={i % 2 === 0 ? 'light' : 'muted'} />
      ))}

      <GalleryVideoShowcase showcase={videoShowcase} variant="light" />
    </div>
  )
}
