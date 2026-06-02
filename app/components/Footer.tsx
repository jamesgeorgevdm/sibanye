import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Column Left: School Identity */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Sibanye Centre For Special Needs</h3>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
            A Special Needs Centre for children and young adults mainly on the Autism Spectrum and also have other learning disabilities. <br/> 
            When you enter this loving space, consider yourself one of the members of an extraordinary family.
            </p>
          </div>

          {/* Column Right: Contact Details */}
          <div className="md:text-right">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">Contact Office</h3>
            <p className="text-sm text-gray-400 space-y-1">
              <span>17 3rd Avenue, Newton Park</span><br />
              <span>Gqeberha, 6070</span><br />
              <span className="block mt-2">Email: info@school.edu</span>
              <span>Phone: +27 (0)41 065 0012</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
          <p>&copy; {currentYear} Sibanye Centre For Special Needs. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}