import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesBento from "@/components/FeaturesBento";
import ProblemSolution from "@/components/ProblemSolution";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 selection:text-white">
      <Header />
      <HeroSection />
      <ProblemSolution />
      <FeaturesBento />
      
      {/* Simple Footer */}
      <footer className="border-t border-card-border py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} AuditAI. All rights reserved.</p>
      </footer>
    </main>
  );
}
