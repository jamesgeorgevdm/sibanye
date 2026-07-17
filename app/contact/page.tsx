"use client";

// Contact page — info cards on the left, a form on the right.
// On submit the form POSTs to /api/contact which sends an email via Nodemailer/Gmail.
// Field and InfoCard are small helper components defined at the bottom of this file
// to keep the JSX clean without needing separate files for one-off presentational pieces.

import { useState, FormEvent } from "react";
import { business, mapEmbedSrc } from "../lib/business";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  hpField: string; // honeypot — must stay empty; hidden from real users
};

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    hpField: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          hpField: "",
        });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-sky-700 py-14 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Contact Us
        </h1>
        <p className="text-sky-100 text-lg max-w-xl mx-auto">
          We&apos;d love to hear from you. Reach out and our team will get back
          to you as soon as possible.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info Cards */}
        <div className="flex flex-col gap-6">
          <InfoCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            title="Address"
            lines={[
              business.address.street,
              business.address.suburb,
              `${business.address.city}, ${business.address.postalCode}`,
            ]}
          />
          <InfoCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
            title="Phone"
            lines={business.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="hover:text-sky-700 hover:underline"
              >
                {phone.display} ({phone.label})
              </a>
            ))}
          />
          <InfoCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            title="Email"
            lines={[
              <a
                key="email"
                href={`mailto:${business.email}`}
                className="hover:text-sky-700 hover:underline break-all"
              >
                {business.email}
              </a>,
            ]}
          />
          <InfoCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Office Hours"
            lines={["Monday – Friday", "7:00 AM – 5:00 PM", "After-care included"]}
          />
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8 md:p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Send us a message
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Fill in the form below and we&apos;ll be in touch.
          </p>

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h3>
              <p className="text-gray-500 max-w-sm">
                Thank you for reaching out. We&apos;ll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 px-6 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot: hidden from users, off-screen and not tabbable.
                  Bots that auto-fill fields will trip this and get silently dropped.
                  The field is deliberately NOT named "company"/"organization" etc,
                  and carries data-*-ignore attributes, so browsers and password
                  managers won't autofill it and trip up real visitors. */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <label htmlFor="hp-field">Leave this field empty</label>
                <input
                  type="text"
                  id="hp-field"
                  name="hpField"
                  value={form.hpField}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  data-lpignore="true"
                  data-1p-ignore
                  data-form-type="other"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full Name" required>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="Jane Smith"
                    className="input"
                  />
                </Field>
                <Field label="Email Address" required>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    maxLength={254}
                    placeholder="jane@example.com"
                    className="input"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Phone Number">
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength={40}
                    placeholder="+27 (0)41 000 0000"
                    className="input"
                  />
                </Field>
                <Field label="Subject">
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Select a topic…</option>
                    <option>General Enquiry</option>
                    <option>Admission / Enrolment</option>
                    <option>Therapy Services</option>
                    <option>Volunteering / Donations</option>
                    <option>Other</option>
                  </select>
                </Field>
              </div>

              <Field label="Message" required>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  maxLength={5000}
                  rows={5}
                  placeholder="Write your message here…"
                  className="input resize-none"
                />
              </Field>

              {status === "error" && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 px-6 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-semibold rounded-xl transition-colors text-base cursor-pointer"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Map embed */}
      <div className="w-full h-72 bg-gray-200">
        <iframe
          title="Map showing Sibanye Centre For Special Needs in Newton Park, Gqeberha"
          src={mapEmbedSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-sky-600 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function InfoCard({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: React.ReactNode[];
}) {
  return (
    <div className="flex items-start gap-4 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="w-10 h-10 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
          {title}
        </p>
        {lines.map((line, i) => (
          <p key={i} className="text-sm text-gray-700 leading-snug">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
