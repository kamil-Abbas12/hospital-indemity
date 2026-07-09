import { ShieldPlus, Phone, Mail, MapPin, Globe, Link, MessageCircle } from "lucide-react";
import Image from "next/image";

const columns = [
  {
    title: "Coverage",
    links: [
      "Hospital Indemnity Insurance",
      "Hospital Cash Benefit Plans",
      "Supplemental Health Insurance",
      "Short-Term Hospital Coverage",
    ],
  },
  {
    title: "Resources",
    links: [
      "How Hospital Indemnity Works",
      "Eligibility Requirements",
      "Compare Insurance Carriers",
      "Frequently Asked Questions",
    ],
  },
  {
    title: "Company",
    links: ["About Us", "Privacy Policy", "Terms of Service", "Contact Us"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
       
           <a href="#" className="flex items-center gap-2.5 mb-4">
  <Image
    src="/logo.png"
    alt="TopDog Leads Hospital Indemnity CPA logo"
    width={160}
    height={64}
    className="h-14 w-auto "
  />
</a>
        
          <p className="text-sm leading-relaxed max-w-sm mb-5">
            Connecting you with licensed insurance specialists to find
            affordable Hospital Indemnity Insurance plans that pay cash
            benefits directly to you.
          </p>
          <div className="space-y-2 text-sm">
            <a href="mailto:support@yourdomain.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4 text-gold" /> support@yourdomain.com
            </a>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" /> Licensed to serve clients nationwide
            </p>
          </div>
          <div className="flex gap-3 mt-5">
            {[Globe, Link, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-navy transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-white font-bold text-sm mb-4">{col.title}</p>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>&copy; {new Date().getFullYear()} Hospital Indemnity Insurance. All rights reserved.</p>
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