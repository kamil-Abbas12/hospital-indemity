import { Banknote, FileText, Home, ShieldCheck, Headset } from "lucide-react";

const items = [
  {
    icon: Banknote,
    title: "Cash Benefits",
    desc: "Paid directly to you if you're hospitalized — no restrictions on how it's used",
  },
  {
    icon: FileText,
    title: "Cover Expenses",
    desc: "Helps offset deductibles, copays, and out-of-pocket medical costs",
  },
  {
    icon: Home,
    title: "Use It Your Way",
    desc: "Apply benefits toward rent, groceries, transportation, bills, and more",
  },
  {
    icon: ShieldCheck,
    title: "Affordable Plans",
    desc: "Hospital indemnity plans priced to fit a range of needs and budgets",
  },
  {
    icon: Headset,
    title: "Quick & Easy",
    desc: "Speak with a licensed insurance specialist at no cost, no pressure",
  },
];

export default function WhyConsider() {
  return (
    <section id="why-consider" className="bg-ivory py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-teal font-bold text-xs tracking-widest uppercase">
          Why It Matters
        </span>
        <h2 className="font-display font-semibold text-navy text-2xl sm:text-3xl mt-2">
          Why Consider Hospital Indemnity Insurance?
        </h2>
        <div className="w-16 h-1 bg-gold mx-auto mt-4 mb-12 rounded-full" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-navy/5 group-hover:bg-gold flex items-center justify-center mb-4 mx-auto transition-colors duration-300">
                <Icon className="w-6 h-6 text-navy" strokeWidth={1.8} />
              </div>
              <p className="font-bold text-navy text-sm">{title}</p>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}