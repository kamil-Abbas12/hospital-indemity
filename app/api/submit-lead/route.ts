import { NextRequest, NextResponse } from "next/server";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd8lTKWb3ahBVrvbkBPXDgHU_oG-uVAd7PrCpuPXIZs61qfOw/formResponse";

const RTB_URL =
  "https://rtb.ringba.com/v1/production/a37f503bf0d941eab90f344742ee484b.json";

const ENTRY_IDS = {
  campaign: "entry.542526956",
  firstName: "entry.1862210803",
  lastName: "entry.1549380775",
  address: "entry.219003485",
  city: "entry.297900501",
  state: "entry.110340468",
  zip: "entry.1795686712",
  phone: "entry.1824246880",
  dob: "entry.1079218925",
  jornaya: "entry.374167377",
  email: "entry.44866929",
  trustedLink: "entry.846729564",
  ipAddress: "entry.838952419",
  request: "entry.1488324304",
  response: "entry.522850628",
};

// Converts a validated 10-digit US number to E.164 (+1XXXXXXXXXX)
function toE164(tenDigit: string): string {
  return `+1${tenDigit}`;
}

type RtbResult = {
  ok: boolean;
  bidId?: string;
  bidAmount?: number;
  rejectReason?: string;
  error?: string;
};

async function pingRingbaRtb(
  phone: string,
  state: string,
  zip: string
): Promise<RtbResult> {
  const body = {
    CID: phone, // 10-digit
    CID_E164: toE164(phone), // E.164
    state,
    zipCode: zip,
    exposeCallerId: "yes",
  };

  try {
    const res = await fetch(RTB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return {
      ok: true,
      bidId: data.bidId,
      bidAmount: typeof data.bidAmount === "number" ? data.bidAmount : 0,
      rejectReason: data.rejectReason,
    };
  } catch (err) {
    console.error("RTB ping error:", err);
    return { ok: false, error: "RTB request failed" };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const phone = String(body.phone ?? "");
    const zip = String(body.zip ?? "");
    const state = String(body.state ?? "");
    const jornayaId = String(body.jornayaId ?? "");
    const trustedFormUrl = String(body.trustedFormUrl ?? "");

    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json({ success: false, error: "Invalid phone" }, { status: 400 });
    }
    if (!/^\d{5}$/.test(zip)) {
      return NextResponse.json({ success: false, error: "Invalid zip" }, { status: 400 });
    }
    if (!/^[A-Z]{2}$/.test(state)) {
      return NextResponse.json({ success: false, error: "Invalid state" }, { status: 400 });
    }
    if (!jornayaId || jornayaId.length < 10) {
      return NextResponse.json({ success: false, error: "Missing Jornaya token" }, { status: 400 });
    }
    if (!/^https:\/\/cert\.trustedform\.com\//.test(trustedFormUrl)) {
      return NextResponse.json({ success: false, error: "Missing TrustedForm cert" }, { status: 400 });
    }

    const dob = new Date(String(body.dob ?? ""));
    const now = new Date();
    if (isNaN(dob.getTime()) || dob > now || now.getFullYear() - dob.getFullYear() > 120) {
      return NextResponse.json({ success: false, error: "Invalid DOB" }, { status: 400 });
    }

    const forwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

    // Fire the RTB ping BEFORE writing the lead — if there's no buyer,
    // we reject the lead instead of submitting it.
    const rtbResult = await pingRingbaRtb(phone, state, zip);

    if (!rtbResult.ok) {
      // RTB call itself failed (network/parse error) — treat as reject
      // rather than silently letting an unpriced lead through.
      console.warn("RTB ping failed:", rtbResult.error);
      return NextResponse.json(
        { success: false, error: "Lead could not be processed at this time" },
        { status: 200 }
      );
    }

    console.log("RTB bid result:", {
      bidId: rtbResult.bidId,
      bidAmount: rtbResult.bidAmount,
      rejectReason: rtbResult.rejectReason,
    });

    if (!rtbResult.bidAmount || rtbResult.bidAmount <= 0) {
      // No buyer for this lead — reject rather than submit.
      return NextResponse.json(
        {
          success: false,
          error: "No match found for your information",
          rtb: { bidAmount: rtbResult.bidAmount, rejectReason: rtbResult.rejectReason },
        },
        { status: 200 }
      );
    }

    const payload = new URLSearchParams();
    payload.append(ENTRY_IDS.campaign, "Hospital Indemnity");
    payload.append(ENTRY_IDS.firstName, body.firstName ?? "");
    payload.append(ENTRY_IDS.lastName, body.lastName ?? "");
    payload.append(ENTRY_IDS.address, body.address ?? "");
    payload.append(ENTRY_IDS.city, body.city ?? "");
    payload.append(ENTRY_IDS.state, body.state ?? "");
    payload.append(ENTRY_IDS.zip, body.zip ?? "");
    payload.append(ENTRY_IDS.phone, body.phone ?? "");
    payload.append(ENTRY_IDS.dob, body.dob ?? "");
    payload.append(ENTRY_IDS.email, body.email ?? "");
    payload.append(ENTRY_IDS.jornaya, body.jornayaId ?? "");
    payload.append(ENTRY_IDS.trustedLink, body.trustedFormUrl ?? "");
    payload.append(ENTRY_IDS.ipAddress, ipAddress);
    payload.append(ENTRY_IDS.request, body.hasInsurance ?? "");
    payload.append(ENTRY_IDS.response, body.preferredTime ?? "");

    const res = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
    });

    if (!res.ok) {
      throw new Error(`Google Forms responded with status ${res.status}`);
    }

    return NextResponse.json({
      success: true,
      rtb: { bidAmount: rtbResult.bidAmount, rejectReason: rtbResult.rejectReason },
    });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}