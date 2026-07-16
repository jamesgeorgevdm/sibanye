// The contact page is a client component ("use client"), so it can't export
// metadata itself. This server-side layout supplies the page's title/description.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Sibanye Centre For Special Needs",
  description:
    "Get in touch with Sibanye Centre For Special Needs in Newton Park, Gqeberha. Call, email or visit us about enrolment, therapy services, volunteering and donations.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "/contact",
    siteName: "Sibanye Centre For Special Needs",
    title: "Contact | Sibanye Centre For Special Needs",
    description:
      "Contact Sibanye Centre For Special Needs in Newton Park, Gqeberha about enrolment, therapy services, volunteering or donations.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1024,
        height: 683,
        alt: "Sibanye Centre For Special Needs in Newton Park, Gqeberha",
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
