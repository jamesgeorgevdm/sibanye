'use client'
import Link from 'next/link'
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

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-blue-900 text-white shadow-md z-50 w-full block">
      {/* - w-full: Forces the container to span 100% of the screen width.
        - justify-start: Slams all text to the far left.
        - pl-6: Adds a tiny bit of breathing room from the literal glass edge of your monitor.
        - Removed max-w-6xl and mx-auto completely.
      */}
      <div className="w-full pl-6 pr-4 h-16 flex items-center justify-start gap-12">
        
        {/* School Logo */}
        <Link href="/" className="font-bold text-xl tracking-tight hover:text-blue-200 transition shrink-0 block text-left">
          Sibanye Centre For Special Needs
        </Link>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-8 justify-start text-left">
            {NavLinks.map((link) => {
                const isActive = pathname === link.href

                return (
                    <Link 
                        key={link.href} 
                        href={link.href} 
                        className={`transition duration-200 block text-left ${
                            isActive 
                            ? 'text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1' 
                            : 'text-blue-100 hover:text-blue-200'
                        }`}
                    >
                        {link.label}
                    </Link>
                )
            })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar