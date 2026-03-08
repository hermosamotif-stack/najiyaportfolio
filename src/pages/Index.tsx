import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PortfolioGallery from "@/components/PortfolioGallery";
import AboutSection from "@/components/AboutSection";
import CursorTrail from "@/components/CursorTrail";
import MorphingBlobs from "@/components/MorphingBlobs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CursorTrail />
      <MorphingBlobs />
      <Navbar />
      <HeroSection />
      <PortfolioGallery />
      <AboutSection />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display font-bold text-lg">
            STUDIO<span className="text-accent">.</span>
          </span>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
