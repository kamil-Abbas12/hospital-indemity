import Image from "next/image";
import { Banknote } from "lucide-react";
import EligibilityForm from "./EligibilityForm";

export default function Hero() {
  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid lg:grid-cols-2 gap-10 items-start">
        {/* Left: copy + cover image */}
        <div>
          <h1 className="font-display font-semibold text-navy text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight">
            Protect Yourself From Unexpected{" "}
            <span className="text-teal">Hospital Costs</span>
          </h1>

          <p className="mt-4 text-lg text-gray-700 font-medium">
            Get cash benefits when you&apos;re hospitalized.
          </p>

          <p className="mt-3 text-gray-600 leading-relaxed max-w-xl">
            Hospital Indemnity Insurance can help cover deductibles, copays,
            and other out-of-pocket expenses so you can focus on what matters
            most — your recovery.
          </p>

          <div className="relative mt-6 rounded-xl overflow-hidden shadow-lg h-72 sm:h-96 w-full">
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
              alt="Smiling senior patient resting comfortably in a hospital bed"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="mt-6 bg-ivory border border-gray-200 rounded-xl p-4 flex items-center gap-4 max-w-md">
            <div className="bg-teal text-white rounded-full p-3 shrink-0">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-navy text-sm">CASH BENEFITS</p>
              <p className="text-sm text-gray-600">
                Paid directly to you. Use it how you need it most!
              </p>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="lg:sticky lg:top-8">
          <EligibilityForm />
        </div>
      </div>
    </section>
  );
}