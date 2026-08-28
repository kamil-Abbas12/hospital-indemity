import Link from "next/link";
import {
  Mail,
  MapPin,
  Globe,
  Link as LinkIcon,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";

const columns = [
  {
    title: "Coverage",
    links: [
      { label: "Hospital Indemnity Insurance", href: "#" },
      { label: "Hospital Cash Benefit Plans", href: "#" },
      { label: "Supplemental Health Insurance", href: "#" },
      { label: "Short-Term Hospital Coverage", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "How Hospital Indemnity Works", href: "#how-it-works" },
      { label: "Eligibility Requirements", href: "#why-consider" },
      { label: "Compare Insurance Carriers", href: "#" },
      { label: "Frequently Asked Questions", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Contact Us", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        
        <div className="col-span-2">
<Link href="/" className="flex items-center gap-2.5 mb-4">
            <Image
              src="/logo.png"
              alt="TopDog Leads Hospital Indemnity CPA logo"
              width={160}
              height={64}
              className="h-14 w-auto"
            />
          </Link>

          <p className="text-sm leading-relaxed max-w-sm mb-5">
            Connecting you with licensed insurance specialists to find
            affordable Hospital Indemnity Insurance plans that pay cash
            benefits directly to you.
          </p>

          <div className="space-y-2 text-sm">
            <a
              href="mailto:support@topdoglead.com.com"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-gold" />
              support@topdoglead.com.com
            </a>

            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" />
              Licensed to serve clients nationwide
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-5">
            {[Globe, LinkIcon, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label={`Social link ${i + 1}`}
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-navy transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-white font-bold text-sm mb-4">
              {col.title}
            </p>

            <ul className="space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>
            &copy; {new Date().getFullYear()} Hospital Indemnity Insurance.
            All rights reserved.
          </p>

          <p className="text-center sm:text-right max-w-xl">
            This is a lead generation website and is not affiliated with any
            government agency. Insurance products are offered by licensed
            agents; availability and benefits vary by carrier and state.
          </p>
        </div>
      </div>
    </footer>
  );
}