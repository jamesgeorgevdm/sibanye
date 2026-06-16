'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { INTRO_COMPLETE_EVENT, INTRO_STORAGE_KEY } from '../constants/intro'

export default function IntroSplash() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (pathname !== '/') return
    if (localStorage.getItem(INTRO_STORAGE_KEY) === 'true') return

    setShow(true)
    setVisible(false)

    const fadeInTimer = setTimeout(() => setVisible(true), 50)
    const fadeOutTimer = setTimeout(() => {
      // Reveal page content underneath while splash fades out
      window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT))
      setVisible(false)
    }, 2500)
    const hideTimer = setTimeout(() => {
      localStorage.setItem(INTRO_STORAGE_KEY, 'true')
      setShow(false)
    }, 3500)

    return () => {
      clearTimeout(fadeInTimer)
      clearTimeout(fadeOutTimer)
      clearTimeout(hideTimer)
    }
  }, [pathname])

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      <img
        src="/images/logo_big.png"
        alt="Sibanye Centre For Special Needs"
        width={384}
        height={384}
        className={`h-48 w-48 md:h-64 md:w-64 object-contain transition-all duration-700 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      />
    </div>
  )
}
