import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Hospital Indemnity Insurance",
  description:
    "Read the Privacy Policy for Hospital Indemnity Insurance to learn how we collect, use, and protect your personal information.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://hospitalindemnity.topdoglead.com/privacy-policy",
  },
};

const sections = [
  {
    title: "1. Introduction",
    body: `Hospital Indemnity Insurance ("we," "us," or "our") operates this website as a lead generation service connecting consumers with licensed insurance agents. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or submit an inquiry through our eligibility form.`,
  },
  {
    title: "2. Information We Collect",
    body: `We may collect personal information you voluntarily provide, including your name, phone number, email address, date of birth, ZIP code, and other details relevant to matching you with insurance products. We also automatically collect certain technical information, such as your IP address, browser type, device information, and browsing behavior on our site through cookies and similar tracking technologies.`,
  },
  {
    title: "3. How We Use Your Information",
    body: `We use the information you provide to connect you with licensed insurance agents and carriers who can offer you Hospital Indemnity Insurance quotes and information. Your information may also be used to: respond to your inquiries; improve our website and services; send you follow-up communications by phone, text, or email regarding insurance options; and comply with legal obligations.`,
  },
  {
    title: "4. Sharing Your Information",
    body: `By submitting your information through our eligibility form, you consent to having your information shared with our network of licensed insurance agents, carriers, and marketing partners so they may contact you regarding insurance products. We do not sell your personal information to unrelated third parties for their own independent marketing purposes without your consent.`,
  },
  {
    title: "5. TCPA Consent & Communications",
    body: `By submitting the form on this website, you expressly consent to be contacted by us and our network of licensed insurance agents by phone (including autodialed and prerecorded calls), text message, and email, even if your number is on a Do Not Call list. Consent is not a condition of purchasing any product or service. Message and data rates may apply. You may revoke your consent at any time by contacting us.`,
  },
  {
    title: "6. Cookies & Tracking Technologies",
    body: `We use cookies, web beacons, and similar technologies to understand site usage, improve functionality, and support advertising and analytics services, including third-party analytics providers. You can control cookies through your browser settings, though disabling cookies may affect site functionality.`,
  },
  {
    title: "7. Data Security",
    body: `We implement reasonable administrative, technical, and physical safeguards designed to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "8. Your Choices & Rights",
    body: `You may opt out of future communications at any time by replying "STOP" to text messages, using the unsubscribe link in emails, or contacting us directly using the information below. Depending on your state of residence, you may have additional rights regarding your personal information, including the right to request access to or deletion of your data.`,
  },
  {
    title: "9. Children's Privacy",
    body: `This website is not directed at individuals under the age of 18, and we do not knowingly collect personal information from minors.`,
  },
  {
    title: "10. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date. Continued use of the website after changes are posted constitutes acceptance of those changes.`,
  },
  {
    title: "11. Contact Us",
    body: `If you have questions about this Privacy Policy or how your information is handled, please contact us at support@topdoglead.com.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <main>
      <Navbar />
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <span className="text-teal font-bold text-xs tracking-widest uppercase">
            Legal
          </span>
          <h1 className="font-display font-semibold text-navy text-3xl sm:text-4xl mt-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mt-3">
            Effective Date: January 1, 2026
          </p>
          <div className="w-16 h-1 bg-gold mt-6 mb-10 rounded-full" />

          <div className="space-y-9">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-display font-semibold text-navy text-lg sm:text-xl mb-2">
                  {s.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}