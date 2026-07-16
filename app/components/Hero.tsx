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
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6 text-sky-800">
            Sibanye Centre For Special Needs
          </h1>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-sm px-6 py-5 max-w-2xl mx-auto mb-10">
            <p className="text-base sm:text-lg md:text-xl text-sky-700 font-semibold mb-3">
              Empowering lives and supporting unique abilities.
            </p>

            <p className="text-sm sm:text-base text-sky-900">
              A special-needs day school and care centre in Newton Park, Gqeberha
              (Port Elizabeth), supporting children and young adults with autism,
              ADHD, Down syndrome and other learning disabilities.
            </p>
          </div>

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
