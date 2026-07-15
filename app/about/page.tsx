// About page — six anchor sections, each with its own id so AboutNav can
// highlight the active one as you scroll. Content is all static (no database).
// To update facts like learner count or founding year, edit the `stats` array below.
// To add or remove activity/value cards, edit `activities` or `coreValues`.

import PuzzleBorder from '../components/PuzzleBorder'
import AboutNav from '../components/AboutNav'

export const metadata = {
  title: 'About | Sibanye Centre For Special Needs',
  description: 'Learn about Sibanye Centre For Special Needs — our mission, story, values and approach.',
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const activities = [
  { label: 'Art', desc: 'Creative expression through painting, drawing, mosaics and more.' },
  { label: 'Music', desc: 'Music therapy and performance to build confidence and coordination.' },
  { label: 'Dance', desc: 'Movement and rhythm to develop motor skills and self-expression.' },
  { label: 'Education', desc: 'Literacy, numeracy and computer skills tailored to each learner.' },
  { label: 'Baking & Gardening', desc: 'Practical life skills through hands-on food and garden activities.' },
  { label: 'Outings & Concerts', desc: 'Educational excursions and performances in the wider community.' },
]

const coreValues = [
  { label: 'Compassion', desc: 'We meet every learner where they are, with patience and care.' },
  { label: 'Inclusion', desc: 'Every learner belongs, regardless of ability level or diagnosis.' },
  { label: 'Growth', desc: 'We celebrate every step forward, big or small.' },
  { label: 'Dignity', desc: 'Learners are respected and celebrated as individuals.' },
  { label: 'Safety', desc: 'A secure, nurturing environment is the foundation of learning.' },
  { label: 'Community', desc: 'Families and staff are one extended Sibanye family.' },
]

const stats = [
  { value: '2021', label: 'Year founded' },
  { value: '30', label: 'Current learners' },
  { value: '263-115', label: 'NPO Number' },
  { value: '7am–5pm', label: 'Office hours' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="-mt-16">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative bg-sky-700 text-white pt-16 overflow-hidden">
        <PuzzleBorder scope="viewport" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-14 md:py-20">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">About Us</h1>
          <p className="text-lg sm:text-xl text-sky-100 font-light max-w-2xl mx-auto">
            Empowering lives and supporting unique abilities since 2021.
          </p>
        </div>
      </section>

      <AboutNav />

      {/* ── 1. Origin & Mission ───────────────────────────────────────────────── */}
      <section id="origin" className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="w-12 h-1 bg-sky-700 mb-4" />
          <h2 className="text-3xl font-bold text-sky-800 mb-2">Our Origin &amp; Mission</h2>
          <p className="text-gray-500 font-light mb-10 max-w-xl">
            Who we are, where we came from, and why we do what we do.
          </p>

          <div className="mb-10">
            <h3 className="text-lg font-bold text-sky-700 mb-3">How It Began</h3>
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              Sibanye Centre for Special Needs was founded in February 2021 as the successor to St Bartz Academy, a beloved centre that closed during the COVID pandemic. Sibanye picked up where St Bartz left off, continuing to serve the children and young adults of Gqeberha who needed it most.
            </p>
            <p className="mt-3 text-sm text-gray-400">NPO Number: 263-115</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="border border-sky-100 rounded-sm p-7 bg-sky-50">
              <h3 className="text-xl font-bold text-sky-800 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Through stimulation, therapy and skills development in a safe and friendly environment, our mission is to teach learners to become independent individuals who can integrate into society and in time, sustain themselves with the skills they have built.
              </p>
            </div>
            <div className="border border-green-100 rounded-sm p-7 bg-green-50">
              <h3 className="text-xl font-bold text-green-800 mb-3">A Place for Family</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                When you enter this loving space, consider yourself one of the members of an extraordinary family. We do not receive government or private funding - our work is sustained by the school fees of our learners, which we try our best to keep as accessible as possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Who We Serve ───────────────────────────────────────────────────── */}
      <section id="serve" className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="w-12 h-1 bg-sky-700 mb-4" />
          <h2 className="text-3xl font-bold text-sky-800 mb-2">Who We Serve</h2>
          <p className="text-gray-500 font-light mb-10 max-w-xl">
            The individuals and families at the heart of everything we do.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-sm p-6">
              <div className="w-10 h-10 bg-sky-100 rounded-sm mb-4" />
              <h3 className="text-base font-bold text-sky-800 mb-2">Ages</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Children and young adults from 6 to 25 years old.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-sm p-6">
              <div className="w-10 h-10 bg-green-100 rounded-sm mb-4" />
              <h3 className="text-base font-bold text-sky-800 mb-2">Needs &amp; Diagnoses</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Autism (any severity), ADHD, Down syndrome, slow learning and other learning disabilities.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-sm p-6">
              <div className="w-10 h-10 bg-yellow-100 rounded-sm mb-4" />
              <h3 className="text-base font-bold text-sky-800 mb-2">Who We Can Help</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We welcome any severity of autism or learning difference. We cater for physically abled learners who can move independently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. What We Do ─────────────────────────────────────────────────────── */}
      <section id="activities" className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="w-12 h-1 bg-sky-700 mb-4" />
          <h2 className="text-3xl font-bold text-sky-800 mb-2">What We Do</h2>
          <p className="text-gray-500 font-light mb-10 max-w-xl">
            A look at the programmes and activities that fill our days.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {activities.map(({ label, desc }) => (
              <div
                key={label}
                className="border border-gray-200 rounded-sm p-6 bg-gray-50 hover:border-sky-200 hover:bg-sky-50 transition duration-200"
              >
                <h3 className="text-base font-bold text-sky-800 mb-2">{label}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-sky-50 border border-sky-100 rounded-sm p-6">
            <p className="text-sm text-sky-800 leading-relaxed">
              <span className="font-semibold">Occupational therapy</span> is available on-site in a private capacity, subject to therapist availability.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Our Approach ───────────────────────────────────────────────────── */}
      <section id="approach" className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="w-12 h-1 bg-sky-700 mb-4" />
          <h2 className="text-3xl font-bold text-sky-800 mb-2">Our Approach</h2>
          <p className="text-gray-500 font-light mb-10 max-w-xl">
            Individual education plans and a structured, caring daily routine.
          </p>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-sm p-6">
              <h3 className="text-base font-bold text-sky-800 mb-4">A Typical Day</h3>
              <ul className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <li><span className="font-medium text-sky-700">Morning</span> — Assembly / morning ring for younger learners</li>
                <li><span className="font-medium text-sky-700">~9:00</span> — Structured work tasks (one-hour lesson)</li>
                <li><span className="font-medium text-sky-700">10:00–10:30</span> — Break</li>
                <li><span className="font-medium text-sky-700">10:30</span> — Continue work tasks / Day-dependent creative activities</li>
                <li><span className="font-medium text-sky-700">12:00–12:45</span> — Lunch break</li>
                <li><span className="font-medium text-sky-700">12:45</span> — Class continues</li>
                <li><span className="font-medium text-sky-700">14:00</span> — End of day (Fri: 13:30)</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-sm p-6">
              <h3 className="text-base font-bold text-sky-800 mb-4">How We Teach</h3>
              <ul className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <li>Individual education plans tailored to each learner</li>
                <li>Verbal and non-verbal classes to support all needs</li>
                <li>Younger learners: literacy, numeracy, basic life skills</li>
                <li>Young adults: life skills, money management, social skills</li>
                <li>Creative activities: art, music, baking, gardening, etc.</li>
                <li>Full-time and part-time staff</li>
                <li>After-care available until 17:00</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Community & Values ─────────────────────────────────────────────── */}
      <section id="community" className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="w-12 h-1 bg-sky-700 mb-4" />
          <h2 className="text-3xl font-bold text-sky-800 mb-2">Community &amp; Values</h2>
          <p className="text-gray-500 font-light mb-10 max-w-xl">
            The principles that guide every interaction at Sibanye.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map(({ label, desc }) => (
              <div
                key={label}
                className="border border-gray-200 rounded-sm p-6 bg-gray-50 hover:border-sky-200 hover:bg-sky-50 transition duration-200"
              >
                <h3 className="text-base font-bold text-sky-800 mb-2">{label}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. By the Numbers ─────────────────────────────────────────────────── */}
      <section id="numbers" className="bg-sky-700 py-16 px-6 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="w-12 h-1 bg-yellow-400 mb-4" />
          <h2 className="text-3xl font-bold mb-10">By the Numbers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">{value}</div>
                <div className="text-sky-100 font-light text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
