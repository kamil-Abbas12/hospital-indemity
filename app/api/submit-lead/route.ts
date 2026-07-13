import { NextRequest, NextResponse } from "next/server";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd8lTKWb3ahBVrvbkBPXDgHU_oG-uVAd7PrCpuPXIZs61qfOw/formResponse";

const ENTRY_IDS = {
  campaign: "entry.542526956",
  firstName: "entry.1862210803",
  lastName: "entry.1549380775",
  address: "entry.219003485",
  // Swapped based on observed sheet output: values sent as "city" were
  // landing in the sheet's State column, and vice versa. If the live
  // form's questions get rebuilt again, re-verify via view-source.
  city: "entry.297900501",
  state: "entry.110340468",
  zip: "entry.1795686712",
  phone: "entry.1824246880",
  dob: "entry.1079218925",
  jornaya: "entry.374167377",
  email: "entry.44866929", // confirmed correct — matches legacy C# tool exactly
  trustedLink: "entry.846729564",
  ipAddress: "entry.838952419",
  request: "entry.1488324304",
  response: "entry.522850628",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Capture real client IP from headers (Vercel/Coolify both set x-forwarded-for)
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

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

    // Google Forms returns 200 even without a real success signal in body,
    // so we treat any non-error HTTP status as a successful write.
    if (!res.ok) {
      throw new Error(`Google Forms responded with status ${res.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}