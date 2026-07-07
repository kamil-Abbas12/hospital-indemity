"use client";

import { useState } from "react";
import { User, Phone, Mail, MapPin, Calendar, Clock, Lock } from "lucide-react";

export default function EligibilityForm() {
  const [hasInsurance, setHasInsurance] = useState<"yes" | "no" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Wire this up to your lead API / CRM endpoint
    console.log("Form submitted");
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-navy px-6 py-5">
        <p className="font-display text-white text-xl sm:text-2xl font-semibold">
          Get Your Free
        </p>
        <p className="font-display text-gold text-xl sm:text-2xl font-bold">
          Eligibility Check
        </p>
        <p className="text-gray-300 text-sm mt-1">
          See if you qualify for affordable Hospital Indemnity Insurance.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <InputField icon={<User className="w-4 h-4" />} placeholder="First Name*" required />
          <InputField icon={<User className="w-4 h-4" />} placeholder="Last Name*" required />
        </div>

        <InputField icon={<Phone className="w-4 h-4" />} placeholder="Phone Number*" type="tel" required />
        <InputField icon={<Mail className="w-4 h-4" />} placeholder="Email Address (Optional)" type="email" />
        <InputField icon={<MapPin className="w-4 h-4" />} placeholder="ZIP Code*" required />
        <InputField icon={<Calendar className="w-4 h-4" />} placeholder="Date of Birth*" type="text" onFocus={(e) => (e.target.type = "date")} required />

        <div>
          <p className="text-sm text-navy font-medium mb-2">
            Do you currently have health insurance?
          </p>
          <div className="flex gap-3">
            {(["yes", "no"] as const).map((val) => (
              <button
                type="button"
                key={val}
                onClick={() => setHasInsurance(val)}
                className={`flex-1 flex items-center justify-between px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  hasInsurance === val
                    ? "border-teal bg-teal/5 text-navy"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {val === "yes" ? "Yes" : "No"}
                <span
                  className={`w-3.5 h-3.5 rounded-full border ${
                    hasInsurance === val ? "border-teal bg-teal" : "border-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <select className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-teal/40">
            <option>Preferred Time to Receive a Call</option>
            <option>Morning (8am - 12pm)</option>
            <option>Afternoon (12pm - 4pm)</option>
            <option>Evening (4pm - 8pm)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gold hover:bg-gold-light transition-colors text-navy font-bold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          CHECK MY ELIGIBILITY <span aria-hidden>&rarr;</span>
        </button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500 pt-1">
          <Lock className="w-3.5 h-3.5" /> Your information is safe and secure.
        </p>
      </form>
    </div>
  );
}

function InputField({
  icon,
  placeholder,
  type = "text",
  required = false,
  onFocus,
}: {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  required?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative">
      <span className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">
        {icon}
      </span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        onFocus={onFocus}
        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40"
      />
    </div>
  );
}