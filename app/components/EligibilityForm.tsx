"use client";

import { useEffect, useState } from "react";
import { Phone, MapPin, PhoneCall, Lock, Loader2 } from "lucide-react";

// Strips non-digit characters and caps length — used for Caller ID and Zip
function sanitizeDigits(e: React.FormEvent<HTMLInputElement>, maxLen: number) {
  const target = e.target as HTMLInputElement;
  target.value = target.value.replace(/\D/g, "").slice(0, maxLen);
}

// Forces uppercase letters only, capped at 2 characters — used for State
function sanitizeState(e: React.FormEvent<HTMLInputElement>) {
  const target = e.target as HTMLInputElement;
  target.value = target.value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2);
}

// Pulled out of useEffect so handleSubmit can call it directly too —
// this guarantees the freshest possible token capture at submit time.
// Returns true if a Jornaya token was successfully captured this call.
function captureTrackingTokens(): boolean {
  const leadidToken = document.querySelector<HTMLInputElement>(
    "#leadid_token, input[name='universal_leadid']"
  );
  const hidLeadid = document.getElementById("Hidleadid") as HTMLInputElement | null;
  const hidTrusted = document.getElementById("hidTrusted") as HTMLInputElement | null;
  const trustedToken = document.querySelector<HTMLInputElement>(
    "input[name^='xxTrustedFormCertUrl'], input[id^='xxTrustedFormCertUrl']"
  );

  let jornayaReady = false;

  if (leadidToken && hidLeadid && leadidToken.value) {
    hidLeadid.value = leadidToken.value;
    jornayaReady = true;
  }
  if (trustedToken && hidTrusted && trustedToken.value) {
    hidTrusted.value = trustedToken.value;
  }

  return jornayaReady;
}

type SubmitResult = {
  success: boolean;
  error?: string;
  bidAmount?: number;
  dialNumber?: string | null;
};

export default function EligibilityForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [exposeCallerId, setExposeCallerId] = useState(true);
  const [jornayaReady, setJornayaReady] = useState(false);

  useEffect(() => {
    const poll = () => {
      const ready = captureTrackingTokens();
      if (ready) setJornayaReady(true);
    };

    poll(); // check immediately on mount
    const polling = window.setInterval(poll, 500); // fast poll, no timeout bypass

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

    return () => {
      window.clearInterval(polling);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Final safety check — capture right now in case state hasn't
    // re-rendered yet. Strictly block if no real token exists yet —
    // no fallback bypass.
    const readyNow = captureTrackingTokens();
    if (!jornayaReady && !readyNow) {
      setFormError("Still verifying your session — please wait a moment.");
      return;
    }
    if (readyNow) setJornayaReady(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const callerId = String(formData.get("callerId") ?? "");
    const state = String(formData.get("state") ?? "");
    const zip = String(formData.get("zip") ?? "");

    if (!/^\d{10}$/.test(callerId)) {
      setFormError("Caller ID must be exactly 10 digits.");
      return;
    }
    if (!/^[A-Z]{2}$/.test(state)) {
      setFormError("State must be a 2-letter abbreviation (e.g. TX, NY).");
      return;
    }
    if (!/^\d{5}$/.test(zip)) {
      setFormError("ZIP code must be exactly 5 digits.");
      return;
    }

    setFormError("");
    setResult(null);
    setIsSubmitting(true);

    const hidLeadid = form.querySelector<HTMLInputElement>("#Hidleadid");
    const hidTrusted = form.querySelector<HTMLInputElement>("#hidTrusted");

    const payload = {
      callerId,
      state,
      zip,
      exposeCallerId,
      jornayaId: hidLeadid?.value ?? "",
      trustedFormUrl: hidTrusted?.value ?? "",
    };

    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: SubmitResult = await res.json();
      setResult(data);

      if (!data.success) {
        setFormError(data.error || "No match found for this call.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-navy px-6 py-5">
        <p className="font-display text-white text-xl sm:text-2xl font-semibold">
          Connect a
        </p>
        <p className="font-display text-gold text-xl sm:text-2xl font-bold">
          Call
        </p>
        <p className="text-gray-300 text-sm mt-1">
          Enter caller details to find a live buyer and connect the call.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-3" noValidate>
        <input id="leadid_token" name="universal_leadid" type="hidden" defaultValue="" />
        <input id="Hidleadid" name="Hidleadid" type="hidden" defaultValue="" />
        <input id="hidTrusted" name="hidTrusted" type="hidden" defaultValue="" />
        <input id="xxTrustedFormToken_0" name="xxTrustedFormToken_0" type="hidden" defaultValue="" />

        <InputField
          icon={<Phone className="w-4 h-4" />}
          name="callerId"
          placeholder="Caller ID* (10 digits)"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          onInput={(e) => sanitizeDigits(e, 10)}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <InputField
            icon={<MapPin className="w-4 h-4" />}
            name="state"
            placeholder="State* (e.g. TX)"
            maxLength={2}
            onInput={sanitizeState}
            required
          />
          <InputField
            icon={<MapPin className="w-4 h-4" />}
            name="zip"
            placeholder="ZIP Code* (5 digits)"
            inputMode="numeric"
            maxLength={5}
            onInput={(e) => sanitizeDigits(e, 5)}
            required
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-navy font-medium">
          <input
            type="checkbox"
            checked={exposeCallerId}
            onChange={(e) => setExposeCallerId(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-teal focus:ring-teal/40"
          />
          Expose Caller ID
        </label>

        {formError && <p className="text-red-600 text-xs -mt-1">{formError}</p>}

        <button
          id="btnSubmit"
          type="submit"
          disabled={isSubmitting || !jornayaReady}
          className="w-full bg-gold hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-navy font-bold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            "Finding a buyer..."
          ) : !jornayaReady ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Preparing form...
            </>
          ) : (
            "FIND A BUYER"
          )}
        </button>

        {!jornayaReady && !isSubmitting && (
          <p className="text-center text-xs text-gray-400">
            Verifying your session — this usually only takes a second or two.
          </p>
        )}

        {result?.success && (
          <a
            href={result.dialNumber ? `tel:${result.dialNumber}` : undefined}
            aria-disabled={!result.dialNumber}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-colors ${
              result.dialNumber
                ? "bg-teal hover:bg-teal/90 text-white"
                : "bg-gray-200 text-gray-400 pointer-events-none"
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            {result.dialNumber ? `Connect Call (${result.dialNumber})` : "No dial number returned"}
          </a>
        )}

        {result?.success && typeof result.bidAmount === "number" && (
          <p className="text-center text-xs text-gray-500">
            Bid: ${result.bidAmount.toFixed(2)}
          </p>
        )}

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