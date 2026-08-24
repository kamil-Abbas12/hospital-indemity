import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Hospital Indemnity Insurance",
  description:
    "Read the Terms of Service governing your use of the Hospital Indemnity Insurance website and eligibility form.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://hospitalindemnity.topdoglead.com/terms-of-service",
  },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using this website ("Site"), operated as a lead generation service for Hospital Indemnity Insurance, you agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use this Site.`,
  },
  {
    title: "2. Description of Service",
    body: `This Site is a lead generation platform that connects consumers with licensed insurance agents and carriers offering Hospital Indemnity Insurance and related products. We are not an insurance company and do not underwrite, issue, or administer insurance policies. Submitting your information does not guarantee coverage, approval, or a specific quote.`,
  },
  {
    title: "3. Not Affiliated With Government Agencies",
    body: `This Site is privately owned and operated. It is not affiliated with, endorsed by, or sponsored by any government agency, including Medicare, Medicaid, or the Social Security Administration.`,
  },
  {
    title: "4. Consent to Be Contacted",
    body: `By submitting the eligibility form, you consent to be contacted by us and/or our network of licensed insurance agents by telephone (including through automatic telephone dialing systems and prerecorded or artificial voice messages), text message (SMS), and email regarding insurance products, even if your telephone number is listed on a federal or state Do Not Call registry. Consent is not required as a condition of purchasing any product or service, and message/data rates may apply.`,
  },
  {
    title: "5. Eligibility",
    body: `This Site and the products discussed are intended for individuals who are at least 18 years of age and residents of the United States. By using this Site, you represent that you meet these requirements.`,
  },
  {
    title: "6. No Insurance Advice",
    body: `Information provided on this Site is for general informational purposes only and does not constitute insurance, legal, financial, or medical advice. Plan availability, coverage details, benefit amounts, and pricing vary by carrier, state, and individual eligibility, and should be confirmed directly with a licensed agent or carrier.`,
  },
  {
    title: "7. Intellectual Property",
    body: `All content on this Site, including text, graphics, logos, and design elements, is the property of this Site's owner or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without prior written permission.`,
  },
  {
    title: "8. Third-Party Links & Partners",
    body: `This Site may contain links to third-party websites or connect you with third-party insurance agents and carriers. We do not control and are not responsible for the content, privacy practices, or business practices of these third parties.`,
  },
  {
    title: "9. Disclaimer of Warranties",
    body: `This Site and its content are provided "as is" and "as available" without warranties of any kind, express or implied. We do not guarantee that the Site will be uninterrupted, error-free, or that any particular insurance outcome will result from using this Site.`,
  },
  {
    title: "10. Limitation of Liability",
    body: `To the fullest extent permitted by law, this Site's owner and its affiliates shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of, or inability to use, this Site or any products or services obtained through it.`,
  },
  {
    title: "11. Changes to These Terms",
    body: `We reserve the right to modify these Terms of Service at any time. Changes take effect immediately upon posting to this page. Continued use of the Site after changes are posted constitutes your acceptance of the revised terms.`,
  },
  {
    title: "12. Governing Law",
    body: `These Terms of Service are governed by the laws of the United States and the state in which this Site's operator is based, without regard to conflict of law principles.`,
  },
  {
    title: "13. Contact Us",
    body: `If you have questions about these Terms of Service, please contact us at support@yourdomain.com.`,
  },
];

export default function TermsOfService() {
  return (
    <main>
      <Navbar />
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <span className="text-teal font-bold text-xs tracking-widest uppercase">
            Legal
          </span>
          <h1 className="font-display font-semibold text-navy text-3xl sm:text-4xl mt-2">
            Terms of Service
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