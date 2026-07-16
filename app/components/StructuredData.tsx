// Emits schema.org JSON-LD so Google can understand Sibanye as a real, local
// educational organisation — feeding the Knowledge Panel and local/Map results.
// Rendered once in the root layout, so it appears on every page.
import { business, addressLine } from "../lib/business";
import { SITE_URL } from "../lib/site";

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "NGO"],
    "@id": `${SITE_URL}/#organization`,
    name: business.name,
    alternateName: business.alternateName,
    url: SITE_URL,
    email: business.email,
    telephone: business.phones[0].display,
    foundingDate: business.foundingDate,
    description:
      "A special-needs day school and care centre in Gqeberha (Port Elizabeth), South Africa, supporting children and young adults with autism, ADHD, Down syndrome and other learning disabilities.",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.street}, ${business.address.suburb}`,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(
      `${addressLine}, South Africa`
    )}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: business.openingHours.days,
        opens: business.openingHours.opens,
        closes: business.openingHours.closes,
      },
    ],
    areaServed: [
      { "@type": "City", name: "Gqeberha" },
      { "@type": "City", name: "Port Elizabeth" },
    ],
    // Verified public profiles. Add a Google Business Profile URL here once created.
    sameAs: [
      "https://www.facebook.com/p/Sibanye-Centre-for-Special-Needs-100080692590235/",
    ],
    identifier: {
      "@type": "PropertyValue",
      name: "NPO Number",
      value: business.npoNumber,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
