'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { INTRO_COMPLETE_EVENT, INTRO_STORAGE_KEY } from './constants/intro'

const SESSION_KEY = 'sibanye-page-mounted'

type DisplayMode = 'loading' | 'hidden-for-intro' | 'instant' | 'animate'

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [mode, setMode] = useState<DisplayMode>('loading')

  useEffect(() => {
    const introSeen = localStorage.getItem(INTRO_STORAGE_KEY) === 'true'
    const sessionStarted = !!sessionStorage.getItem(SESSION_KEY)

    // Intro always takes priority — even if sessionStorage exists from a prior visit
    if (pathname === '/' && !introSeen) {
      setMode('hidden-for-intro')

      const onIntroComplete = () => {
        setMode('instant')
        sessionStorage.setItem(SESSION_KEY, '1')
      }

      window.addEventListener(INTRO_COMPLETE_EVENT, onIntroComplete)
      return () => window.removeEventListener(INTRO_COMPLETE_EVENT, onIntroComplete)
    }

    if (sessionStarted) {
      setMode('animate')
      return
    }

    setMode('instant')
    sessionStorage.setItem(SESSION_KEY, '1')
  }, [pathname])

  // Fully hide page content during intro — opacity-0 still paints underneath the splash
  if (mode === 'loading' || mode === 'hidden-for-intro') {
    return <div className="hidden">{children}</div>
  }

  if (mode === 'instant') {
    return <div>{children}</div>
  }

  return <div className="animate-page-fade-in">{children}</div>
}
