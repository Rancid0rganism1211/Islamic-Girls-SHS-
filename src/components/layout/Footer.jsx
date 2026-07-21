import React from "react";
import { Link } from "react-router-dom";
import { SCHOOL_IMAGES, SCHOOL_INFO } from "@/lib/schoolImages";

export default function Footer() {
  return (
    <footer className="site-footer no-print bg-heritage-green text-heritage-cream">
      {/* Golden Thread */}
      <div className="golden-thread" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 rounded-lg overflow-hidden bg-heritage-cream flex items-center">
                <img src={SCHOOL_IMAGES.logo} alt="IGSHS Logo" className="h-12 w-auto object-contain" />
              </div>
              <div>
                <p className="font-heading text-lg font-semibold">IGSHS Suhum</p>
                <p className="text-heritage-gold text-xs">Est. 1999 · True Knowledge &amp; Character</p>
              </div>
            </div>
            <p className="text-sm text-heritage-cream/70 leading-relaxed">
              Empowering the next generation of Muslimah leaders through quality education, strong values, and academic excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-heritage-gold text-sm font-semibold mb-4 tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", path: "/about" },
                { label: "Academics", path: "/academics" },
                { label: "Admissions", path: "/admissions" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-heritage-cream/70 hover:text-heritage-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-heading text-heritage-gold text-sm font-semibold mb-4 tracking-wider uppercase">Programs</h4>
            <ul className="space-y-2.5">
              {["General Science", "Business", "Home Economics", "General Arts", "Visual Art"].map((p) => (
                <li key={p}>
                  <Link to="/academics" className="text-sm text-heritage-cream/70 hover:text-heritage-gold transition-colors">
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-heritage-gold text-sm font-semibold mb-4 tracking-wider uppercase">Contact Us</h4>
            <ul className="space-y-2.5 text-sm text-heritage-cream/70">
              <li className="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                P.O. Box 45, Suhum, Eastern Region, Ghana
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <a href={`tel:${SCHOOL_INFO.phone.replace(/\s/g, "")}`} className="hover:text-heritage-gold transition-colors">{SCHOOL_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/>
                </svg>
                <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-heritage-gold transition-colors">{SCHOOL_INFO.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                  <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/><line x1="2" y1="12" x2="22" y2="12"/>
                </svg>
                <span className="text-heritage-cream/70">GPS: {SCHOOL_INFO.gps}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="golden-thread mt-10 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-heritage-cream/50">
          <p>&copy; {new Date().getFullYear()} Islamic Girls Senior High School, Suhum. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-heritage-gold transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-heritage-gold transition-colors">Terms of Use</Link>
            <Link to="/login" className="hover:text-heritage-gold transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}