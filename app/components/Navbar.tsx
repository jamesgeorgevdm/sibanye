import React from 'react'
import Link from 'next/link'

// Define the type for the navigation links
interface NavLink {
    label: string
    href: string
}

// NavLinks array for mapping
const NavLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },

]

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* School Logo */}
        <Link href="/" className="font-bold text-xl tracking-tight hover:text-blue-200 transition">
          Sibanye Centre For Special Needs
        </Link>
        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
            {NavLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-blue-200 transition">
                    {link.label}
                </Link>
            ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar