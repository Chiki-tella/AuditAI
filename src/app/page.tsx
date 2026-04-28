import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesBento from "@/components/FeaturesBento";
import ProblemSolution from "@/components/ProblemSolution";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 selection:text-white">
      <Header />
      <HeroSection />
      <ProblemSolution />
      <FeaturesBento />
      <PricingSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
