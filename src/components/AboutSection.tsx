import { motion } from "framer-motion";
import { Palette, Monitor, Sparkles, Layers, Zap } from "lucide-react";

const skills = [
  { icon: Palette, label: "Branding", desc: "Visual identity systems" },
  { icon: Monitor, label: "UI/UX", desc: "Digital interfaces" },
  { icon: Sparkles, label: "Motion", desc: "Animated graphics" },
  { icon: Layers, label: "Editorial", desc: "Print & layout" },
  { icon: Zap, label: "Multimedia", desc: "Cross-platform" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-3">About</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              5+ Years of
              <br />
              <span className="gradient-text">Creative Vision</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a Senior Graphic Designer specializing in branding, multimedia, and digital experiences.
                With over five years in the industry, I've collaborated with startups, agencies, and global
                brands to build visual identities that resonate.
              </p>
              <p>
                My approach blends minimalist aesthetics with bold experimentation — every pixel
                serves a purpose, every animation tells a story. I believe great design is invisible
                until it makes you feel something.
              </p>
            </div>
          </motion.div>

          {/* Skills bento grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className={`glass rounded-xl p-6 hover:glow-box transition-all duration-300 ${
                  i === 4 ? "col-span-2" : ""
                }`}
              >
                <skill.icon className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-display font-semibold text-lg">{skill.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{skill.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
