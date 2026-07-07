import { ClipboardPen, PhoneCall, Users } from "lucide-react";

const steps = [
  {
    icon: ClipboardPen,
    num: 1,
    title: "Submit",
    desc: "your information on this quick form.",
  },
  {
    icon: PhoneCall,
    num: 2,
    title: "Speak",
    desc: "with a licensed insurance specialist.",
  },
  {
    icon: Users,
    num: 3,
    title: "Review",
    desc: "your options and choose the plan that's right for you.",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="bg-navy rounded-2xl px-6 sm:px-10 py-10">
        <h2 className="font-display font-semibold text-white text-2xl sm:text-3xl text-center mb-10">
          How It Works
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {steps.map(({ icon: Icon, num, title, desc }, i) => (
            <div key={num} className="flex items-center gap-8 w-full sm:w-auto">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <Icon className="w-7 h-7 text-navy" strokeWidth={1.8} />
                  </div>
                  <span className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-teal text-white text-xs font-bold flex items-center justify-center">
                    {num}
                  </span>
                </div>
                <div>
                  <p className="text-gold font-bold text-lg">{title}</p>
                  <p className="text-gray-300 text-sm max-w-[180px]">{desc}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <span className="hidden sm:block text-gold/50 text-xl">
                  &middot;&middot;&middot;&rarr;
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}