import { ShieldPlus, PhoneCall } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldPlus className="w-8 h-8 text-navy" strokeWidth={2.2} />
          <div className="leading-tight">
            <p className="font-display font-semibold text-navy text-lg sm:text-xl">
              Hospital
            </p>
            <p className="text-[11px] sm:text-xs tracking-widest text-gray-500 font-semibold uppercase">
              Indemnity Insurance
            </p>
          </div>
        </div>

        <a
          href="tel:+18005551234"
          className="hidden sm:flex items-center gap-2 text-navy"
        >
          <PhoneCall className="w-5 h-5 text-teal" />
          <span className="text-sm leading-tight">
            Speak with a Licensed Insurance Specialist
            <br />
            <span className="font-bold text-navy">
              100% Free &bull; No Obligation
            </span>
          </span>
        </a>
      </div>
    </header>
  );
}