'use client'

// Sticky secondary nav for the About page — sits just below the main navbar
// and highlights which section is currently in view as you scroll.
//
// Each section must have an id matching the entries in the `sections` array below.
// IntersectionObserver watches each section with a rootMargin that triggers the
// highlight when the section's top edge crosses ~30% of the viewport.
// Smooth-scroll on click accounts for the combined height of both navbars (112px).

import { useEffect, useRef, useState } from 'react'

const sections = [
  { id: 'origin',     label: 'Origin & Mission' },
  { id: 'serve',      label: 'Who We Serve' },
  { id: 'activities', label: 'What We Do' },
  { id: 'approach',   label: 'Our Approach' },
  { id: 'community',  label: 'Community & Values' },
  { id: 'numbers',    label: 'By the Numbers' },
]

export default function AboutNav() {
  const [active, setActive] = useState<string>(sections[0].id)
  const navRef = useRef<HTMLElement>(null)
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
        {
          // Trigger when the top of a section crosses the top ~30% of the viewport
          rootMargin: '-10% 0px -65% 0px',
          threshold: 0,
        },
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Keep the active pill scrolled into view inside the nav bar
  useEffect(() => {
    activeLinkRef.current?.scrollIntoView({ inline: 'nearest', block: 'nearest' })
  }, [active])

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    // 64px main nav + 48px this nav = 112px total offset
    const top = el.getBoundingClientRect().top + window.scrollY - 112
    window.scrollTo({ top, behavior: 'smooth' })
    setActive(id)
  }

  return (
    <nav
      ref={navRef}
      aria-label="About page sections"
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
