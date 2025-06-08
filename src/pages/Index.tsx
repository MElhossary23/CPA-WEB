
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeatureSection } from "@/components/FeatureSection";
import { NetworkSection } from "@/components/NetworkSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Smooth scroll to section when URL hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 100,
            behavior: "smooth",
          });
        }
      }
    };

    // Initial check for hash in URL
    if (window.location.hash) {
      setTimeout(handleHashChange, 100);
    }

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Clean up
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <FeatureSection />
        <NetworkSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
