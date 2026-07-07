import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyConsider from "./components/WhyConsider";
import HowItWorks from "./components/HowItWorks";
import Faq from "./components/Faq";
import TrustDisclaimer from "./components/TrustDisclaimer";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyConsider />
      <HowItWorks />
      <Faq />
      <TrustDisclaimer />
      <Footer />
    </main>
  );
}