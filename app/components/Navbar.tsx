"use client";

import { useState } from "react";
import { ShieldPlus, PhoneCall, Menu, X, BadgeCheck } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Benefits", href: "#why-consider" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQs", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top trust strip */}
      <div className="bg-navy-dark text-gray-300 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-1.5">
            <BadgeCheck className="w-3.5 h-3.5 text-gold" />
            <span>Licensed specialists &bull; A+ rated carriers &bull; 100% free quotes</span>
          </div>
          <span className="sm:hidden">100% Free &bull; No Obligation</span>
          <a href="tel:+18005551234" className="font-semibold text-white hover:text-gold transition-colors">
            (800) 555-1234
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
           <Image
  src="/logo.png"
  alt="TopDog Leads Hospital Indemnity CPA logo"
  width={340}
  height={86}
  className="h-12 w-auto sm:h-14"
  priority
/>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-semibold text-navy/70 hover:text-navy transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+18005551234"
              className="flex items-center gap-2 text-navy border border-gray-200 rounded-full px-4 py-2 hover:border-teal transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-teal" />
              <span className="text-sm font-semibold">Call Now</span>
            </a>
            <a
              href="#eligibility-form"
              className="bg-gold hover:bg-gold-light transition-colors text-navy font-bold text-sm px-5 py-2.5 rounded-full shadow-md shadow-gold/30"
            >
              Check Eligibility
            </a>
          </div>

          <button
            className="lg:hidden text-navy"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-semibold text-navy py-2"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#eligibility-form"
              onClick={() => setOpen(false)}
              className="block text-center bg-gold text-navy font-bold text-sm px-5 py-3 rounded-full"
            >
              Check Eligibility
            </a>
          </div>
        )}
      </div>
    </header>
  );
}