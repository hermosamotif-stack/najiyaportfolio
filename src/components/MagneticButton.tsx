import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const MagneticButton = ({ children, className = "", onClick }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({ x: (e.clientX - cx) * 0.3, y: (e.clientY - cy) * 0.3 });
  };

  const handleLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
