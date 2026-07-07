import { Banknote, FileText, Home, ShieldCheck, Headset } from "lucide-react";

const items = [
  {
    icon: Banknote,
    title: "Cash Benefits",
    desc: "Paid directly to you if you're hospitalized",
  },
  {
    icon: FileText,
    title: "Cover Expenses",
    desc: "Helps with deductibles, copays, and out-of-pocket costs",
  },
  {
    icon: Home,
    title: "Use It Your Way",
    desc: "Use benefits for rent, groceries, transportation, bills, and more",
  },
  {
    icon: ShieldCheck,
    title: "Affordable Plans",
    desc: "Plans available to fit a variety of needs and budgets",
  },
  {
    icon: Headset,
    title: "Quick & Easy",
    desc: "Speak with a licensed insurance specialist at no cost to you",
  },
];

export default function WhyConsider() {
  return (
    <section className="bg-ivory py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display font-semibold text-navy text-2xl sm:text-3xl">
          Why Consider Hospital Indemnity Insurance?
        </h2>
        <div className="w-16 h-1 bg-gold mx-auto mt-3 mb-10 rounded-full" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-navy/10 flex items-center justify-center mb-4 bg-white">
                <Icon className="w-7 h-7 text-navy" strokeWidth={1.8} />
              </div>
              <p className="font-bold text-navy text-sm">{title}</p>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}