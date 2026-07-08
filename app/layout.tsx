import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hospitalindemnity.topdpglead.com"),
  title: "Hospital Indemnity Insurance | Affordable Hospital Cash Benefit Plans",
  description:
    "Compare affordable Hospital Indemnity Insurance plans and get cash benefits paid directly to you when hospitalized. Free eligibility check, no obligation — licensed specialists standing by.",
  keywords: [
    "hospital indemnity insurance",
    "hospital indemnity plans",
    "affordable hospital insurance",
    "hospital cash benefit insurance",
    "supplemental hospital insurance",
    "hospital stay insurance",
    "indemnity insurance quotes",
  ],
  openGraph: {
    title: "Hospital Indemnity Insurance | Affordable Hospital Cash Benefit Plans",
    description:
      "Get cash benefits when you're hospitalized. Check your eligibility for affordable Hospital Indemnity Insurance in minutes — 100% free, no obligation.",
    url: "https://hospitalindemnity.topdpglead.com",
    siteName: "Top Dog Leads | Hospital Indemnity",
    images: ["/og-image.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hospital Indemnity Insurance | Affordable Hospital Cash Benefit Plans",
    description:
      "Get cash benefits when you're hospitalized. Free eligibility check — 100% free, no obligation.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://hospitalindemnity.topdpglead.com",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "Hospital Indemnity Insurance",
  description:
    "Lead generation service connecting consumers with licensed agents offering Hospital Indemnity Insurance plans.",
  url: "https://hospitalindemnity.com",
  areaServed: "US",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={`${fraunces.variable} ${inter.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}