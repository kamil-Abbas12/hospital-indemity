import { NextRequest, NextResponse } from "next/server";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd8lTKWb3ahBVrvbkBPXDgHU_oG-uVAd7PrCpuPXIZs61qfOw/formResponse";

const RTB_URL =
  "https://rtb.ringba.com/v1/production/a37f503bf0d941eab90f344742ee484b.json";

const ENTRY_IDS = {
  campaign: "entry.542526956",
  phone: "entry.1824246880",
  state: "entry.110340468",
  zip: "entry.1795686712",
  jornaya: "entry.374167377",
  trustedLink: "entry.846729564",
  ipAddress: "entry.838952419",
};

// Converts a validated 10-digit US number to E.164 (+1XXXXXXXXXX)
function toE164(tenDigit: string): string {
  return `+1${tenDigit}`;
}

// TEMP: fixed test destination number, used when RTB doesn't return a
// usable dial number. Replace/remove once the real buyer number field
// is confirmed from Ringba, or once this is wired into a real telephony bridge.
const FALLBACK_DIAL_NUMBER = "+18005551234";

// Normalizes any reasonable dial-number shape returned by RTB into E.164.
// Returns null if it can't confidently normalize it — caller decides how to handle that.
function normalizeE164(raw: string | null | undefined): string | null {
  if (!raw) return null;
  if (raw.startsWith("+")) return raw;
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

type RtbResponse = {
  bidId?: string;
  bidAmount?: number;
  rejectReason?: string;
  // NOTE: confirm which of these Ringba actually returns for your campaign —
  // field name varies by RTB target config. Common ones: "number", "targetNumber".
  number?: string;
  targetNumber?: string;
  [key: string]: unknown;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const callerId = String(body.callerId ?? "");
    const state = String(body.state ?? "");
    const zip = String(body.zip ?? "");
    const exposeCallerId = body.exposeCallerId === false ? "no" : "yes";
    const jornayaId = String(body.jornayaId ?? "");
    const trustedFormUrl = String(body.trustedFormUrl ?? "");

    if (!/^\d{10}$/.test(callerId)) {
      return NextResponse.json(
        { success: false, error: "Caller ID must be exactly 10 digits" },
        { status: 400 }
      );
    }
    if (!/^[A-Z]{2}$/.test(state)) {
      return NextResponse.json({ success: false, error: "Invalid state" }, { status: 400 });
    }
    if (!/^\d{5}$/.test(zip)) {
      return NextResponse.json({ success: false, error: "Invalid zip" }, { status: 400 });
    }
    if (!jornayaId || jornayaId.length < 10) {
      return NextResponse.json(
        { success: false, error: "Missing Jornaya token" },
        { status: 400 }
      );
    }
    if (!/^https:\/\/cert\.trustedform\.com\//.test(trustedFormUrl)) {
      return NextResponse.json(
        { success: false, error: "Missing TrustedForm cert" },
        { status: 400 }
      );
    }

    const forwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

    const rtbPayload = {
      CID: callerId,
      CID_E164: toE164(callerId),
      state,
      zipCode: zip,
      exposeCallerId,
    };

    // DEBUG — full outgoing request, for sharing with the Ringba account owner.
    console.log("RTB request payload:", JSON.stringify(rtbPayload));
    console.log("RTB request URL:", RTB_URL);

    const rtbRes = await fetch(RTB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rtbPayload),
    });

    // DEBUG — full response status/headers, for sharing with the Ringba account owner.
    console.log("RTB response status:", rtbRes.status, rtbRes.statusText);
    console.log(
      "RTB response headers:",
      JSON.stringify(Object.fromEntries(rtbRes.headers.entries()))
    );

    if (!rtbRes.ok) {
      console.warn("RTB non-OK response:", rtbRes.status);
      return NextResponse.json(
        {
          success: false,
          error: `RTB request failed with status ${rtbRes.status}`,
          debug: { request: rtbPayload, status: rtbRes.status },
        },
        { status: 200 }
      );
    }

    const rtbData: RtbResponse = await rtbRes.json();

    // DEBUG — full raw response body, for sharing with the Ringba account owner.
    console.log("RTB raw response:", JSON.stringify(rtbData));

    console.log("RTB bid result:", {
      bidId: rtbData.bidId,
      bidAmount: rtbData.bidAmount,
      rejectReason: rtbData.rejectReason,
    });

    if (!rtbData.bidAmount || rtbData.bidAmount <= 0) {
      return NextResponse.json({
        success: false,
        error: rtbData.rejectReason || "No buyer available for this call",
        rtb: { bidAmount: rtbData.bidAmount, rejectReason: rtbData.rejectReason },
      });
    }

    const dialNumber = normalizeE164(rtbData.number ?? rtbData.targetNumber ?? null) ?? FALLBACK_DIAL_NUMBER;

    // Log the compliance-gated call attempt — same pattern as the lead pipeline,
    // just with the fields this form actually collects.
    const formPayload = new URLSearchParams();
    formPayload.append(ENTRY_IDS.campaign, "Call Connect");
    formPayload.append(ENTRY_IDS.phone, callerId);
    formPayload.append(ENTRY_IDS.state, state);
    formPayload.append(ENTRY_IDS.zip, zip);
    formPayload.append(ENTRY_IDS.jornaya, jornayaId);
    formPayload.append(ENTRY_IDS.trustedLink, trustedFormUrl);
    formPayload.append(ENTRY_IDS.ipAddress, ipAddress);

    const formRes = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formPayload.toString(),
    });

    if (!formRes.ok) {
      console.error(`Google Forms responded with status ${formRes.status}`);
      // Don't block the call connect on the logging step — the RTB bid already succeeded.
    }

    return NextResponse.json({
      success: true,
      bidId: rtbData.bidId,
      bidAmount: rtbData.bidAmount,
      dialNumber,
    });
  } catch (err) {
    console.error("RTB submission error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}