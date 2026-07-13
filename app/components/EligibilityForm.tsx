"use client";

import { useEffect, useState } from "react";
import { User, Phone, Mail, MapPin, Home, Building2, Calendar, Clock, Lock } from "lucide-react";

// Strips non-digit characters and caps length — used for Phone and Zip
function sanitizeDigits(e: React.FormEvent<HTMLInputElement>, maxLen: number) {
  const target = e.target as HTMLInputElement;
  target.value = target.value.replace(/\D/g, "").slice(0, maxLen);
}

// Forces uppercase letters only, capped at 2 characters — used for State
function sanitizeState(e: React.FormEvent<HTMLInputElement>) {
  const target = e.target as HTMLInputElement;
  target.value = target.value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2);
}

export default function EligibilityForm() {
  const [hasInsurance, setHasInsurance] = useState<"yes" | "no" | null>(null);
  const [insuranceError, setInsuranceError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const updateFields = () => {
      const leadidToken = document.querySelector<HTMLInputElement>("#leadid_token, input[name='universal_leadid']");
      const hidLeadid = document.getElementById("Hidleadid") as HTMLInputElement | null;
      const hidTrusted = document.getElementById("hidTrusted") as HTMLInputElement | null;

      // TrustedForm creates a hidden input named "xxTrustedFormCertUrl_0"
      // (with a numeric suffix) — using a "starts with" selector so it
      // matches regardless of the suffix TrustedForm assigns.
      const trustedToken = document.querySelector<HTMLInputElement>(
        "input[name^='xxTrustedFormCertUrl'], input[id^='xxTrustedFormCertUrl']"
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!hasInsurance) {
      setInsuranceError(true);
      return;
    }
    setInsuranceError(false);

    // Backstop validation — even though inputs sanitize as you type,
    // this catches anything pasted in or submitted via autofill.
    const phone = String(formData.get("phone") ?? "");
    const zip = String(formData.get("zip") ?? "");
    const state = String(formData.get("state") ?? "");

    if (!/^\d{10}$/.test(phone)) {
      setFormError("Phone number must be exactly 10 digits.");
      return;
    }
    if (!/^\d{5}$/.test(zip)) {
      setFormError("ZIP code must be exactly 5 digits.");
      return;
    }
    if (!/^[A-Z]{2}$/.test(state)) {
      setFormError("State must be a 2-letter abbreviation (e.g. NY, CA).");
      return;
    }
    setFormError("");
    setIsSubmitting(true);

    const hidLeadid = form.querySelector<HTMLInputElement>("#Hidleadid");
    const hidTrusted = form.querySelector<HTMLInputElement>("#hidTrusted");

    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone,
      email: formData.get("email"),
      address: formData.get("address"),
      city: formData.get("city"),
      state,
      zip,
      dob: formData.get("dob"),
      hasInsurance: hasInsurance,
      preferredTime: formData.get("preferredTime"),
      jornayaId: hidLeadid?.value ?? "",
      trustedFormUrl: hidTrusted?.value ?? "",
    };

    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        alert("Thank you! We'll be in touch shortly.");
        form.reset();
        setHasInsurance(null);
      } else {
        alert("Something went wrong. Please try again or call us directly.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
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

      <form onSubmit={handleSubmit} className="p-6 space-y-3" noValidate>
        <input id="leadid_token" name="universal_leadid" type="hidden" value="" />
        <input id="Hidleadid" name="Hidleadid" type="hidden" value="" />
        <input id="hidTrusted" name="hidTrusted" type="hidden" value="" />
        <input id="xxTrustedFormToken_0" name="xxTrustedFormToken_0" type="hidden" value="" />

        <div className="grid grid-cols-2 gap-3">
          <InputField icon={<User className="w-4 h-4" />} name="firstName" placeholder="First Name*" required />
          <InputField icon={<User className="w-4 h-4" />} name="lastName" placeholder="Last Name*" required />
        </div>

        <InputField
          icon={<Phone className="w-4 h-4" />}
          name="phone"
          placeholder="Phone Number* (10 digits)"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          onInput={(e) => sanitizeDigits(e, 10)}
          required
        />

        <InputField icon={<Mail className="w-4 h-4" />} name="email" placeholder="Email Address*" type="email"  />

        <InputField icon={<Home className="w-4 h-4" />} name="address" placeholder="Street Address*" required />

        <div className="grid grid-cols-2 gap-3">
          <InputField icon={<Building2 className="w-4 h-4" />} name="city" placeholder="City*" required />
          <InputField
            icon={<MapPin className="w-4 h-4" />}
            name="state"
            placeholder="State* (e.g. NY)"
            maxLength={2}
            onInput={sanitizeState}
            required
          />
        </div>

        <InputField
          icon={<MapPin className="w-4 h-4" />}
          name="zip"
          placeholder="ZIP Code* (5 digits)"
          inputMode="numeric"
          maxLength={5}
          onInput={(e) => sanitizeDigits(e, 5)}
          required
        />

        <InputField
          icon={<Calendar className="w-4 h-4" />}
          name="dob"
          placeholder="Date of Birth*"
          type="date"
          required
        />

        <div>
          <p className="text-sm text-navy font-medium mb-2">
            Do you currently have health insurance?*
          </p>
          <div className="flex gap-3">
            {(["yes", "no"] as const).map((val) => (
              <button
                type="button"
                key={val}
                onClick={() => {
                  setHasInsurance(val);
                  setInsuranceError(false);
                }}
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
          {insuranceError && (
            <p className="text-red-600 text-xs mt-1.5">
              Please let us know if you currently have health insurance.
            </p>
          )}
        </div>

        <div className="relative">
          <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <select
            name="preferredTime"
            required
            defaultValue=""
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-teal/40"
          >
            <option value="" disabled>
              Preferred Time to Receive a Call*
            </option>
            <option value="Morning (8am - 12pm)">Morning (8am - 12pm)</option>
            <option value="Afternoon (12pm - 4pm)">Afternoon (12pm - 4pm)</option>
            <option value="Evening (4pm - 8pm)">Evening (4pm - 8pm)</option>
          </select>
        </div>

        {formError && (
          <p className="text-red-600 text-xs -mt-1">{formError}</p>
        )}

        <button
          id="btnSubmit"
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gold hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-navy font-bold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              CHECK MY ELIGIBILITY <span aria-hidden>&rarr;</span>
            </>
          )}
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
  name,
  placeholder,
  type = "text",
  required = false,
  maxLength,
  inputMode,
  onFocus,
  onInput,
}: {
  icon: React.ReactNode;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative">
      <span className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">
        {icon}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        onFocus={onFocus}
        onInput={onInput}
        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40"
      />
    </div>
  );
}