// Single source of truth for the organisation's Name / Address / Phone (NAP).
// Every place that displays contact details — Footer, Contact page, and the
// JSON-LD structured data — reads from here so the information stays byte-for-byte
// consistent across the site (critical for local SEO / Google Business matching).

export const business = {
  name: "Sibanye Centre For Special Needs",
  alternateName: "Sibanye Centre",
  npoNumber: "263-115",
  foundingDate: "2021-02",

  email: "sibanye.specialneeds@gmail.com",

  // Display strings are what users see; hrefs are the machine-dialable versions.
  phones: [
    { label: "Landline", display: "041 065 0012", href: "tel:+27410650012" },
    { label: "School", display: "060 723 0480", href: "tel:+27607230480" },
  ],

  address: {
    street: "17 3rd Avenue",
    suburb: "Newton Park",
    city: "Gqeberha",
    region: "Eastern Cape",
    postalCode: "6070",
    country: "ZA",
  },

  // Coordinates for the centre in Newton Park, Gqeberha.
  geo: { latitude: -33.943162765517705, longitude: 25.57009991334885 },

  // Monday–Friday, 07:00–17:00 (after-care included).
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "17:00",
  },
} as const;

// One-line, single-format address string reused wherever a flat address is shown.
export const addressLine = `${business.address.street}, ${business.address.suburb}, ${business.address.city}, ${business.address.postalCode}`;

// Google Maps embed for the real address (no API key required).
export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${addressLine}, South Africa`
)}&output=embed`;
