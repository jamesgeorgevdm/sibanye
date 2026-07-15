// Site-wide footer — school identity on the left, contact details on the right.
// Sits inside SiteShell so it only appears once the intro animation has finished.

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
          <div className="text-left md:text-right shrink-0">
            <h3 className="text-white font-medium text-xs uppercase tracking-wider mb-1">
              Contact Office
            </h3>
            <p className="text-xs text-white leading-normal">
              17 3rd Avenue, Newton Park, Gqeberha, 6070 <br />
              <span className="md:block">Emal: sibanye.specialneeds@gmail.com</span> 
              <span className="hidden md:inline"> • </span>
              <span>Phone: 041 065 0012 (Landline)
              <br /> 060 723 0480 (School)</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-white mt-4 pt-4 text-center text-[11px] text-white">
          <p>&copy; {currentYear} Sibanye Centre For Special Needs. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}