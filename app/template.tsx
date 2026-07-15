'use client'

// Next.js template.tsx re-mounts on every client-side navigation (unlike layout.tsx which persists).
// That makes it the right place for per-page transition animations.
//
// Logic: the first page load of a browser session has no fade (the intro splash handles that).
// Every subsequent navigation within the same tab gets a 700ms fade-in.
// We track "has this tab been used" with a sessionStorage flag so refreshing the
// page resets it correctly.

import { useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

const SESSION_KEY = 'sibanye-page-mounted'

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const sessionStarted = !!sessionStorage.getItem(SESSION_KEY)
    setAnimate(sessionStarted)
    sessionStorage.setItem(SESSION_KEY, '1')
  }, [pathname])

  return (
    <div className={animate ? 'animate-page-fade-in' : ''}>
      {children}
    </div>
  )
}
