"use client";

import { useState, useEffect, useCallback } from "react";
import { PhoneCall, Menu, X, BadgeCheck } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Benefits", href: "#why-consider", id: "why-consider" },
  { label: "How It Works", href: "#how-it-works", id: "how-it-works" },
  { label: "FAQs", href: "#faq", id: "faq" },
];

const NAV_OFFSET = 96;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${NAV_OFFSET}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();

      const el = document.getElementById(id);
      if (!el) return;

      const top =
        el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

      window.scrollTo({
        top,
        behavior: "smooth",
      });

      setOpen(false);
      history.replaceState(null, "", `#${id}`);
    },
    []
  );

  return (
    <header className="sticky top-0 z-50">
      {/* Trust Strip */}
      <div className="bg-navy-dark text-gray-300 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">


          <span className="sm:hidden">No Obligation</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
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

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-2">
            {links.map((l) => {
              const isActive = active === l.id;

              return (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-navy bg-gold/15"
                      : "text-navy/70 hover:text-navy hover:bg-gray-100"
                  }`}
                >
                  {l.label}

                  <span
                    className={`absolute left-4 right-4 -bottom-0.5 h-0.5 bg-gold rounded-full transition-transform origin-left duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
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
              onClick={(e) => handleNavClick(e, "eligibility-form")}
              className="bg-gold hover:bg-gold-light transition-colors text-navy font-bold text-sm px-5 py-2.5 rounded-full shadow-md shadow-gold/30"
            >
              Check Eligibility
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-navy"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
            {links.map((l) => {
              const isActive = active === l.id;

              return (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.id)}
                  className={`block text-sm font-semibold py-2 px-3 rounded-lg ${
                    isActive ? "text-navy bg-gold/15" : "text-navy"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}

            <a
              href="#eligibility-form"
              onClick={(e) => handleNavClick(e, "eligibility-form")}
              className="block text-center bg-gold text-navy font-bold text-sm px-5 py-3 rounded-full mt-2"
            >
              Check Eligibility
            </a>
          </div>
        )}
      </div>
    </header>
  );
}