"use client";

import { useEffect, useState } from "react";
import { User, Phone, Mail, MapPin, Calendar, Clock, Lock } from "lucide-react";

export default function EligibilityForm() {
  const [hasInsurance, setHasInsurance] = useState<"yes" | "no" | null>(null);

  useEffect(() => {
    const updateFields = () => {
      const leadidToken = document.querySelector<HTMLInputElement>("#leadid_token, input[name='universal_leadid']");
      const hidLeadid = document.getElementById("Hidleadid") as HTMLInputElement | null;
      const hidTrusted = document.getElementById("hidTrusted") as HTMLInputElement | null;
      const trustedToken = document.querySelector<HTMLInputElement>(
        "#xxTrustedFormToken_0, #xxTrustedFormCertUrl, input[name='xxTrustedFormToken_0'], input[name='xxTrustedFormCertUrl']"
      );

      if (leadidToken && hidLeadid && leadidToken.value) {
        hidLeadid.value = leadidToken.value;
      }
      if (trustedToken && hidTrusted && trustedToken.value) {
        hidTrusted.value = trustedToken.value;
      }
    };

    const polling = window.setInterval(updateFields, 5000);
    updateFields();

    const trustedFormField = "xxTrustedFormCertUrl";
    const provideReferrer = false;
    const trustedScript = document.createElement("script");
    trustedScript.type = "text/javascript";
    trustedScript.async = true;
    trustedScript.src =
      "http" +
      (document.location.protocol === "https:" ? "s" : "") +
      "://api.trustedform.com/trustedform.js?provide_referrer=" +
      encodeURIComponent(String(provideReferrer)) +
      "&field=" +
      encodeURIComponent(trustedFormField) +
      "&l=" +
      new Date().getTime() +
      Math.random();
    document.head.appendChild(trustedScript);

    const leadidScript = document.createElement("script");
    leadidScript.id = "LeadiDscript_campaign";
    leadidScript.type = "text/javascript";
    leadidScript.async = true;
    leadidScript.src =
      "//create.lidstatic.com/campaign/372b9fce-b1fd-68e6-0d81-5286de90f4f0.js?snippet_version=2";

    const placeholder = document.getElementById("LeadiDscript");
    if (placeholder?.parentNode) {
      placeholder.parentNode.insertBefore(leadidScript, placeholder);
    } else {
      document.body.appendChild(leadidScript);
    }

    return () => window.clearInterval(polling);
  }, []);

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
        <input id="leadid_token" name="universal_leadid" type="hidden" value="" />
        <input id="Hidleadid" name="Hidleadid" type="hidden" value="" />
        <input id="hidTrusted" name="hidTrusted" type="hidden" value="" />
        <input id="xxTrustedFormToken_0" name="xxTrustedFormToken_0" type="hidden" value="" />

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
          id="btnSubmit"
          type="submit"
          className="w-full bg-gold hover:bg-gold-light transition-colors text-navy font-bold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          CHECK MY ELIGIBILITY <span aria-hidden>&rarr;</span>
        </button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500 pt-1">
          <Lock className="w-3.5 h-3.5" /> Your information is safe and secure.
        </p>
      </form>
      <div id="LeadiDscript" />
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