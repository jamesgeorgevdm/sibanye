'use client'

// Sticky secondary nav for the Gallery page — same pattern as AboutNav but
// derives its section list automatically from app/data/gallery.ts.
// Adding a new album or renaming an existing one in gallery.ts will update
// this nav without any changes needed here.

import { useEffect, useRef, useState } from 'react'
import { galleryAlbums, videoShowcase } from '../data/gallery'

const sections = [
  ...galleryAlbums.map(({ id, title }) => ({ id, label: title })),
  { id: videoShowcase.id, label: videoShowcase.title },
]

export default function GalleryNav() {
  const [active, setActive] = useState<string>(sections[0].id)
  const activeLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-10% 0px -65% 0px', threshold: 0 },
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    activeLinkRef.current?.scrollIntoView({ inline: 'nearest', block: 'nearest' })
  }, [active])

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 112
    window.scrollTo({ top, behavior: 'smooth' })
    setActive(id)
  }

  return (
    <nav
      aria-label="Gallery sections"
      className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="overflow-x-auto scrollbar-none">
        <ul className="flex items-center justify-center gap-1 px-4 sm:px-6 h-12 min-w-max">
          {sections.map(({ id, label }) => {
            const isActive = active === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  ref={isActive ? activeLinkRef : null}
                  onClick={(e) => handleClick(e, id)}
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-sm transition duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-sky-700 text-white'
                      : 'text-gray-500 hover:text-sky-700 hover:bg-sky-50'
                  }`}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
