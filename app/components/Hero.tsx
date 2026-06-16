import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative -mt-16 min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div
        className="absolute inset-0 bg-green-100/55"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-6 pt-16 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-sky-800">
          Sibanye Centre For Special Needs
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-sky-700 font-light mb-10 max-w-2xl mx-auto">
          Empowering lives and supporting unique abilities.
        </p>

        <Link
          href="/about"
          className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-sm hover:bg-green-800 transition duration-200 shadow-sm"
        >
          Learn More About Us
        </Link>
      </div>
    </section>
  )
}
