import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-gray-300 border-t border-gray-800 mt-auto">
      <div className="w-full pl-6 pr-4 py-4 md:py-6">
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          
          {/* Section Left: School Identity */}
          <div className="max-w-xl">
            <h3 className="text-white font-semibold text-base mb-1">
              Sibanye Centre For Special Needs
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              A Special Needs Centre for children and young adults mainly on the Autism Spectrum and other learning disabilities. 
              When you enter this loving space, consider yourself one of the members of an extraordinary family.
            </p>
          </div>

          {/* Section Right: Contact Details */}
          <div className="text-left md:text-right shrink-0">
            <h3 className="text-white font-medium text-xs uppercase tracking-wider mb-1">
              Contact Office
            </h3>
            <p className="text-xs text-gray-400 leading-normal">
              17 3rd Avenue, Newton Park, Gqeberha, 6070 <br />
              <span className="md:block">Email: info@school.edu</span> 
              <span className="hidden md:inline"> • </span>
              <span>Phone: +27 (0)41 065 0012</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-gray-800 mt-4 pt-4 text-center text-[11px] text-gray-500">
          <p>&copy; {currentYear} Sibanye Centre For Special Needs. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}