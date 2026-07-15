'use client'

// Wraps the entire page chrome (Navbar + main + Footer) in an opacity envelope.
// On first visit it stays hidden (opacity-0) until IntroSplash dispatches INTRO_COMPLETE_EVENT,
// then fades in over 700ms in sync with the logo fading out.
// On return visits it becomes fully visible immediately after hydration — no waiting.

import { useEffect, useState, type ReactNode } from 'react'
import { INTRO_COMPLETE_EVENT, INTRO_STORAGE_KEY } from '../constants/intro'
export default function SiteShell({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(INTRO_STORAGE_KEY) === 'true') {
      setVisible(true)
      return
    }

    const onIntroComplete = () => setVisible(true)
    window.addEventListener(INTRO_COMPLETE_EVENT, onIntroComplete)
    return () => window.removeEventListener(INTRO_COMPLETE_EVENT, onIntroComplete)
  }, [])

  return (
    <div
      className={`flex flex-col flex-1 transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  )
}
