import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import useTextScramble from "@/hooks/useTextScramble";

const HeroSection = () => {
  const title1 = useTextScramble("Crafting Digital", 400);
  const title2 = useTextScramble("Experiences", 800);
  const subtitle = useTextScramble("Senior Graphic Designer", 100);

  const scrollToWork = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-glow/10 blur-[120px] animate-pulse-glow pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6 font-mono"
        >
          {subtitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight glow-text"
        >
          {title1}
          <br />
          <span className="gradient-text">{title2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Transforming bold ideas into stunning visual identities.
          <br className="hidden md:block" />
          Branding · UI/UX · Motion · Editorial
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-12"
        >
          <button
            onClick={scrollToWork}
            className="glass glow-box px-8 py-4 rounded-full font-display font-medium tracking-wide text-foreground hover:bg-accent/20 transition-all duration-300 inline-flex items-center gap-3 group relative overflow-hidden"
          >
            <span className="relative z-10">View Work</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform relative z-10" />
            <motion.span
              className="absolute inset-0 bg-accent/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </motion.div>
      </div>

      {/* Grid lines decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="h-full w-full" style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} />
      </div>
    </section>
  );
};

export default HeroSection;
