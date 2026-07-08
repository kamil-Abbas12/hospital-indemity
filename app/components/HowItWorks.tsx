import { ClipboardPen, PhoneCall, Users } from "lucide-react";

const steps = [
  { icon: ClipboardPen, num: "01", title: "Submit", desc: "your information on this quick, secure form." },
  { icon: PhoneCall, num: "02", title: "Speak", desc: "with a licensed insurance specialist, free of charge." },
  { icon: Users, num: "03", title: "Review", desc: "your options and choose the plan that's right for you." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center mb-12">
        <span className="text-gold font-bold text-xs tracking-widest uppercase">
          Simple Process
        </span>
        <h2 className="font-display font-semibold text-navy text-2xl sm:text-3xl mt-2">
          How It Works
        </h2>
      </div>

      <div className="relative bg-navy rounded-3xl px-6 sm:px-12 py-14 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-52 h-52 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-teal/20 rounded-full blur-3xl" />

        <div className="relative grid sm:grid-cols-3 gap-10 sm:gap-6">
          {steps.map(({ icon: Icon, num, title, desc }, i) => (
            <div key={num} className="relative text-center sm:text-left">
              {i < steps.length - 1 && (
                <span className="hidden sm:block absolute top-8 left-[calc(100%-1rem)] w-[calc(100%-2rem)] border-t-2 border-dashed border-gold/30" />
              )}
              <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-5">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg">
                    <Icon className="w-7 h-7 text-navy" strokeWidth={1.8} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold text-navy text-[11px] font-bold flex items-center justify-center">
                    {num}
                  </span>
                </div>
                <div>
                  <p className="text-white font-display font-semibold text-xl">{title}</p>
                  <p className="text-gray-300 text-sm mt-1 max-w-[220px]">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}