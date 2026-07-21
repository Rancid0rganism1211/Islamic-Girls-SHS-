import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SCHOOL_IMAGES } from "@/lib/schoolImages";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Academics", path: "/academics" },
  { label: "Admissions", path: "/admissions" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <nav className={`navbar no-print sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-heritage-green/98 shadow-lg backdrop-blur-sm" : "bg-heritage-green"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-14 rounded-lg overflow-hidden bg-heritage-cream shrink-0 flex items-center">
              <img src={SCHOOL_IMAGES.logo} alt="IGSHS Logo" className="h-14 w-auto object-contain" />
            </div>
            <div className="hidden sm:block">
              <p className="font-heading text-heritage-cream text-lg font-semibold leading-tight">IGSHS</p>
              <p className="text-heritage-gold text-xs tracking-wider">Suhum · Est. 1999</p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                  location.pathname === link.path
                    ? "text-heritage-gold bg-white/10"
                    : "text-heritage-cream/80 hover:text-heritage-cream hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admissions#placement"
              className="ml-3 px-5 py-2.5 bg-heritage-gold text-heritage-green text-sm font-semibold rounded-md hover:bg-heritage-gold/90 transition-colors"
            >
              Check Placement
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-heritage-cream"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="px-4 pb-4 space-y-1 bg-heritage-green border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                location.pathname === link.path
                  ? "text-heritage-gold bg-white/10"
                  : "text-heritage-cream/80 hover:text-heritage-cream hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admissions#placement"
            className="block px-4 py-3 bg-heritage-gold text-heritage-green text-sm font-semibold rounded-md text-center mt-2"
          >
            Check Placement
          </Link>
        </div>
      </div>
    </nav>
  );
}