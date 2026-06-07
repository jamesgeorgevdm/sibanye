'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'sibanye-intro-seen'

export default function IntroSplash() {
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      return
    }

    setShow(true)

    const fadeInTimer = setTimeout(() => setVisible(true), 50)
    const fadeOutTimer = setTimeout(() => setVisible(false), 2500)
    const hideTimer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, 'true')
      setShow(false)
    }, 3500)

    return () => {
      clearTimeout(fadeInTimer)
      clearTimeout(fadeOutTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-blue-900 transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      {/* Plain img — bypasses Next.js optimizer, which was flattening this PNG to white at 256px */}
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
