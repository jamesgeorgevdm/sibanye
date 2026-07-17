'use client'

// Image slideshow used for each photo album on the Gallery page.
// Displays one image at a time inside a PuzzleBorder frame, with
// Previous/Next buttons and a row of thumbnail buttons below.
//
// The `variant` prop alternates the section background between white and gray-50
// so adjacent albums are visually separated. The gallery page handles the alternation
// — just pass the album object from app/data/gallery.ts.

import Image from 'next/image'
import { useCallback, useState } from 'react'
import type { GalleryAlbum } from '../data/gallery'
import PuzzleBorder, { PUZZLE_CARD_INSET } from './PuzzleBorder'

type GallerySlideshowProps = {
  album: GalleryAlbum
  variant?: 'light' | 'muted'
}

export default function GallerySlideshow({
  album,
  variant = 'light',
}: GallerySlideshowProps) {
  const [index, setIndex] = useState(0)
  const count = album.images.length

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return
      setIndex((next + count) % count)
    },
    [count]
  )

  if (count === 0) return null

  const current = album.images[index]
  const bgClass = variant === 'muted' ? 'bg-gray-50' : 'bg-white'

  return (
    <section className={`${bgClass} py-12 md:py-16 border-t border-gray-200`}>
      <div className="w-full max-w-xl mx-auto px-6">
        <header className="mb-8 md:mb-10">
          <div className="w-12 h-1 bg-sky-700 mb-4 mx-auto md:mx-0" aria-hidden="true" />
          <h2 className="text-2xl sm:text-3xl font-bold text-sky-800 tracking-tight mb-2 text-center md:text-left">
            {album.title}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-light max-w-2xl text-center md:text-left">
            {album.description}
          </p>
        </header>

        <div className={`relative w-full ${PUZZLE_CARD_INSET}`}>
          <PuzzleBorder scope="card" />
          <div className="relative z-10 aspect-[4/3] w-full overflow-hidden border border-gray-200/80 bg-gray-100 shadow-sm">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              className="object-cover"
              sizes="(max-width: 576px) 100vw, 576px"
              priority={index === 0}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-5 gap-4">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="text-sky-700 font-medium px-4 py-2 border border-sky-700/30 rounded-sm hover:bg-sky-50 transition duration-200"
            aria-label={`Previous image in ${album.title}`}
          >
            Previous
          </button>
          <span className="text-gray-500 text-sm tabular-nums">
            {index + 1} of {count}
          </span>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="text-sky-700 font-medium px-4 py-2 border border-sky-700/30 rounded-sm hover:bg-sky-50 transition duration-200"
            aria-label={`Next image in ${album.title}`}
          >
            Next
          </button>
        </div>

        <ul
          className="flex flex-wrap justify-center md:justify-start gap-2 mt-6"
          aria-label={`${album.title} thumbnails`}
        >
          {album.images.map((image, i) => {
            const isActive = i === index
            return (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`relative w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] overflow-hidden transition duration-200 border-2 ${
                    isActive
                      ? 'border-sky-700 opacity-100'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Show image ${i + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="72px"
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
