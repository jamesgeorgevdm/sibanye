import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative -mt-16 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-screen background image — `fill` makes it cover the parent; `object-cover` crops to fit */}
      <Image
        src="/images/hero.svg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Semi-transparent overlay so white text stays readable on any photo */}
      <div
        className="absolute inset-0 bg-blue-900/65"
        aria-hidden="true"
      />

      {/* Foreground content — `z-10` sits above the image and overlay */}
      <div className="relative z-10 text-center text-white px-6 pt-16 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Sibanye Centre For Special Needs
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-blue-100 font-light mb-8 max-w-2xl mx-auto">
          Empowering lives and supporting unique abilities.
        </p>

        <Link
          href="/about"
          className="inline-block bg-yellow-400 text-blue-900 font-semibold px-8 py-3 rounded-md hover:bg-yellow-300 transition duration-200"
        >
          Learn More About Us
        </Link>
      </div>
    </section>
  )
}
