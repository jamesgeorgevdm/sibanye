// Site-wide footer — school identity on the left, contact details on the right.
// Sits inside SiteShell so it only appears once the intro animation has finished.
// Contact details come from app/lib/business.ts so the NAP stays consistent
// with the Contact page and the JSON-LD structured data.

import { business, addressLine } from "../lib/business";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-sky-700 text-gray-300 border-t border-white mt-auto">
      <div className="w-full pl-6 pr-4 py-4 md:py-6">
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          
          {/* Section Left: School Identity */}
          <div className="max-w-xl">
            <h3 className="text-white font-semibold text-base mb-1">
              Sibanye Centre For Special Needs
            </h3>
            <p className="text-xs text-white leading-relaxed">
              A Special Needs Centre for children and young adults mainly on the Autism Spectrum and other learning disabilities. 
              When you enter this loving space, consider yourself one of the members of an extraordinary family.
            </p>
          </div>

          {/* Section Right: Contact Details */}
          <address className="text-left md:text-right shrink-0 not-italic">
            <h3 className="text-white font-medium text-xs uppercase tracking-wider mb-1">
              Contact Office
            </h3>
            <p className="text-xs text-white leading-normal">
              {addressLine} <br />
              <span className="md:block">
                Email:{" "}
                <a href={`mailto:${business.email}`} className="underline hover:text-yellow-300">
                  {business.email}
                </a>
              </span>
              <span className="hidden md:inline"> • </span>
              <span>
                Phone:{" "}
                {business.phones.map((phone, i) => (
                  <span key={phone.href}>
                    {i > 0 && <br />}
                    <a href={phone.href} className="underline hover:text-yellow-300">
                      {phone.display}
                    </a>{" "}
                    ({phone.label})
                  </span>
                ))}
              </span>
            </p>
          </address>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-white mt-4 pt-4 text-center text-[11px] text-white">
          <p>&copy; {currentYear} Sibanye Centre For Special Needs. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}