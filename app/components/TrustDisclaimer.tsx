import { ShieldCheck, BadgeCheck, Lock, ThumbsUp } from "lucide-react";

const trust = [
  { icon: ShieldCheck, label: "Licensed Insurance Specialists" },
  { icon: BadgeCheck, label: "Multiple Top-Rated Insurance Carriers" },
  { icon: Lock, label: "Your Information Is Secure" },
  { icon: ThumbsUp, label: "No Cost & No Obligation" },
];

export default function TrustDisclaimer() {
  return (
    <div>
      <div className="bg-ivory border-y border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="w-6 h-6 text-navy shrink-0" strokeWidth={1.8} />
              <span className="text-sm text-navy font-medium leading-snug">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-navy-dark text-gray-300 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs leading-relaxed max-w-3xl">
            By clicking &quot;Check My Eligibility,&quot; you agree to be
            contacted by a licensed insurance agent by phone, text message, or
            email regarding available insurance options. Your consent is not a
            condition of purchase. Message and data rates may apply. You may
            revoke consent at any time.
            <br className="hidden sm:block" />
            This website is a lead generation service and is not affiliated
            with or endorsed by any government agency. Insurance products are
            offered by licensed insurance agents. Availability and benefits
            vary by carrier and state.
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <ShieldCheck className="w-6 h-6 text-gold" />
            <div className="leading-tight">
              <p className="text-xs">NO OBLIGATION</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}