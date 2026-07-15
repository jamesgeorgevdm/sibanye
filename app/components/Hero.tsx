// Home page hero — full-bleed hero image with a green tint overlay, headline,
// and two CTAs (Learn More + open the chatbot). The Reviews carousel sits
// directly below the hero text in the same section so it shares the background.

import Image from 'next/image'
import Link from 'next/link'
import Reviews from './Reviews'
import OpenChatButton from './OpenChatButton'

export default function Hero() {
  return (
    <section className="relative -mt-16 flex flex-col overflow-hidden">
      {/* Background image — fills the full section height */}
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Green tint overlay */}
      <div className="absolute inset-0 bg-green-100/55" aria-hidden="true" />

      {/* Hero text — centred in the viewport */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center px-6 pt-16 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-sky-800">
            Sibanye Centre For Special Needs
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-sky-700 font-light mb-10 max-w-2xl mx-auto">
            Empowering lives and supporting unique abilities.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/about"
              className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-sm hover:bg-green-800 transition duration-200 shadow-sm"
            >
              Learn More About Us
            </Link>
            <OpenChatButton />
          </div>
        </div>
      </div>

      {/* Reviews — below the hero text, same background */}
      <div className="relative z-10">
        <Reviews overlay />
      </div>
    </section>
  )
}
