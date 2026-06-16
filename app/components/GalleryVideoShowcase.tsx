'use client'

import { useCallback, useState } from 'react'
import type { VideoShowcase } from '../data/gallery'
import PuzzleBorder, { PUZZLE_CARD_INSET } from './PuzzleBorder'

type GalleryVideoShowcaseProps = {
  showcase: VideoShowcase
  variant?: 'light' | 'muted'
}

export default function GalleryVideoShowcase({
  showcase,
  variant = 'muted',
}: GalleryVideoShowcaseProps) {
  const [index, setIndex] = useState(0)
  const count = showcase.videos.length

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return
      setIndex((next + count) % count)
    },
    [count]
  )

  const bgClass = variant === 'muted' ? 'bg-gray-50' : 'bg-white'
  const current = count > 0 ? showcase.videos[index] : null

  return (
    <section className={`${bgClass} py-12 md:py-16 border-t border-gray-200`}>
      <div className="w-full max-w-4xl mx-auto px-6">
        <header className="mb-8 md:mb-10">
          <div className="w-12 h-1 bg-sky-700 mb-4 mx-auto md:mx-0" aria-hidden="true" />
          <h2 className="text-2xl sm:text-3xl font-bold text-sky-800 tracking-tight mb-2 text-center md:text-left">
            {showcase.title}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-light max-w-2xl text-center md:text-left">
            {showcase.description}
          </p>
        </header>

        <div className={`relative w-full ${PUZZLE_CARD_INSET}`}>
          <PuzzleBorder scope="card" />
          <div className="relative z-10 aspect-video w-full overflow-hidden border border-gray-200/80 bg-gray-900 shadow-sm">
            {current ? (
              <video
                key={current.src}
                src={current.src}
                controls
                playsInline
                preload="metadata"
                poster={current.poster}
                className="w-full h-full object-contain bg-black"
                aria-label={current.title}
              >
                <track kind="captions" />
              </video>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400 px-6 text-center">
                <span className="text-4xl opacity-60" aria-hidden="true">
                  ▶
                </span>
                <p className="text-sm sm:text-base">Videos coming soon</p>
              </div>
            )}
          </div>
        </div>

        {count > 0 && (
          <>
            <p className="text-center md:text-left text-sky-800 font-medium mt-4">
              {current?.title}
            </p>

            <div className="flex items-center justify-between mt-5 gap-4">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                className="text-sky-700 font-medium px-4 py-2 border border-sky-700/30 rounded-sm hover:bg-sky-50 transition duration-200"
                aria-label={`Previous video in ${showcase.title}`}
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
                aria-label={`Next video in ${showcase.title}`}
              >
                Next
              </button>
            </div>

            {count > 1 && (
              <ul
                className="flex flex-wrap justify-center md:justify-start gap-2 mt-6"
                aria-label={`${showcase.title} video list`}
              >
                {showcase.videos.map((video, i) => {
                  const isActive = i === index
                  return (
                    <li key={video.src}>
                      <button
                        type="button"
                        onClick={() => setIndex(i)}
                        className={`px-4 py-2 text-sm font-medium rounded-sm border transition duration-200 ${
                          isActive
                            ? 'border-sky-700 bg-sky-50 text-sky-800'
                            : 'border-gray-200 text-gray-600 hover:border-sky-700/30 hover:bg-sky-50/50'
                        }`}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        {video.title}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  )
}
