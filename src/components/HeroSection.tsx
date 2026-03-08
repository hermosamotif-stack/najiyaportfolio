import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import MagneticButton from "./MagneticButton";

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.4, delay: 0.05 + i * 0.02, ease: [0.215, 0.61, 0.355, 1] as const },
  }),
};

const AnimatedText = ({ text, className }: { text: string; className?: string }) => (
  <span className={className}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        custom={i}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        className="inline-block"
        style={{ whiteSpace: char === " " ? "pre" : undefined }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

const HeroSection = () => {
  const scrollToWork = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Animated ambient glows */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-glow/10 blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px] pointer-events-none"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] rounded-full bg-glow/5 blur-[100px] pointer-events-none"
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 20, -10, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6"
        >
          Senior Graphic Designer
        </motion.p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight glow-text">
          <AnimatedText text="Crafting Digital" />
          <br />
          <motion.span
            className="gradient-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          >
            Experiences
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Transforming bold ideas into stunning visual identities.
          <br className="hidden md:block" />
          Branding · UI/UX · Motion · Editorial
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.5, type: "spring", stiffness: 200 }}
          className="mt-12 inline-block"
        >
          <MagneticButton>
            <button
              onClick={scrollToWork}
              className="glass glow-box px-8 py-4 rounded-full font-display font-medium tracking-wide text-foreground hover:bg-accent/20 transition-all duration-300 inline-flex items-center gap-3 group"
            >
              View Work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Grid lines decoration */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
      >
        <div className="h-full w-full" style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
