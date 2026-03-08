import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const particles = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  speed: Math.random() * 0.3 + 0.1,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 4,
}));

const ParallaxBackground = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            x: mouse.x * p.speed * 40,
            y: mouse.y * p.speed * 40,
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.5, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
            opacity: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" },
            scale: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" },
          }}
        />
      ))}

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px]"
        animate={{
          x: ["-10%", "10%", "-10%"],
          y: ["10%", "-5%", "10%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "20%", left: "60%" }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full bg-glow/[0.04] blur-[80px]"
        animate={{
          x: ["5%", "-15%", "5%"],
          y: ["-10%", "10%", "-10%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "20%", left: "20%" }}
      />
    </div>
  );
};

export default ParallaxBackground;
