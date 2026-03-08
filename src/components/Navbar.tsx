import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-display font-bold text-xl tracking-tight">
          STUDIO<span className="text-accent">.</span>
        </span>

        <div className="flex items-center gap-8">
          <a href="#portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Work
          </a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <Link
            to="/admin"
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Admin"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
