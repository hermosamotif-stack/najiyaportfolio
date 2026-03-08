import { motion } from "framer-motion";
import { Palette, Monitor, Sparkles, Layers, Zap } from "lucide-react";

const skills = [
  { icon: Palette, label: "Branding", desc: "Visual identity systems" },
  { icon: Monitor, label: "UI/UX", desc: "Digital interfaces" },
  { icon: Sparkles, label: "Motion", desc: "Animated graphics" },
  { icon: Layers, label: "Editorial", desc: "Print & layout" },
  { icon: Zap, label: "Multimedia", desc: "Cross-platform" },
];

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

const AnimatedWords = ({ text, className }: { text: string; className?: string }) => (
  <span className={className}>
    {text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        custom={i}
        variants={wordVariants}
        className="inline-block mr-[0.3em]"
      >
        {word}
      </motion.span>
    ))}
  </span>
);

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-3"
            >
              About
            </motion.p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              <AnimatedWords text="5+ Years of" />
              <br />
              <span className="gradient-text">
                <AnimatedWords text="Creative Vision" />
              </span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                I'm a Senior Graphic Designer specializing in branding, multimedia, and digital experiences.
                With over five years in the industry, I've collaborated with startups, agencies, and global
                brands to build visual identities that resonate.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                My approach blends minimalist aesthetics with bold experimentation — every pixel
                serves a purpose, every animation tells a story. I believe great design is invisible
                until it makes you feel something.
              </motion.p>
            </div>
          </motion.div>

          {/* Skills bento grid */}
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, type: "spring", stiffness: 150 }}
                whileHover={{ y: -5, boxShadow: "0 0 30px -5px hsla(var(--glow), 0.3)" }}
                className={`glass rounded-xl p-6 transition-all duration-300 ${
                  i === 4 ? "col-span-2" : ""
                }`}
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                >
                  <skill.icon className="w-6 h-6 text-accent mb-3" />
                </motion.div>
                <h3 className="font-display font-semibold text-lg">{skill.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
