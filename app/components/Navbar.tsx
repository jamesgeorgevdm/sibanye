'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface NavLink {
  label: string
  href: string
}

const NavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

const Navbar = () => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-sky-700 text-white shadow-md">
      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <div className="w-full pl-6 pr-4 h-16 flex items-center justify-between">

        {/* Left group: logo + desktop links */}
        <div className="flex items-center gap-12">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2 md:gap-3 min-w-0 hover:opacity-90 transition"
          >
            <Image
              src="/images/logo_small.jpg"
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 md:h-10 md:w-10 object-contain shrink-0"
            />
            <span className="font-bold text-sm sm:text-base md:text-xl tracking-tight leading-tight">
              Sibanye Centre For Special Needs
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NavLinks.map(link => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition duration-200 ${
                    isActive
                      ? 'text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1'
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] shrink-0"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* ── Mobile dropdown ─────────────────────────────────────────────────── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 border-t border-sky-600' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col px-4 py-3 gap-1 bg-sky-700">
          {NavLinks.map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`py-2.5 px-3 rounded-lg text-base font-medium transition duration-200 ${
                  isActive
                    ? 'bg-sky-600 text-yellow-400'
                    : 'text-blue-100 hover:bg-sky-600 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
