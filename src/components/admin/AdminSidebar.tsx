import { motion } from "framer-motion";
import {
  LayoutDashboard, Upload, FolderOpen, LogOut, ChevronLeft,
  Settings, Menu
} from "lucide-react";
import { Link } from "react-router-dom";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "upload", label: "Upload", icon: Upload },
  { id: "projects", label: "Projects", icon: FolderOpen },
];

const AdminSidebar = ({ activeTab, onTabChange, onLogout, collapsed, onToggleCollapse }: AdminSidebarProps) => {
  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/30 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-lg">
          STUDIO<span className="text-accent">.</span>
        </Link>
        <button onClick={onToggleCollapse} className="text-muted-foreground hover:text-foreground transition-colors">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile overlay */}
      {!collapsed && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/60 backdrop-blur-sm" onClick={onToggleCollapse} />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: collapsed ? -280 : 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed top-0 left-0 bottom-0 z-50 w-[220px] glass-strong border-r border-border/30 flex flex-col
          lg:translate-x-0 lg:relative lg:z-auto"
        style={{ willChange: "transform" }}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-4 flex items-center justify-between">
          <Link to="/" className="font-display font-bold text-lg tracking-tight">
            STUDIO<span className="text-accent">.</span>
          </Link>
          <button
            onClick={onToggleCollapse}
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <p className="px-5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Command Center</p>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                if (window.innerWidth < 1024) onToggleCollapse();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                activeTab === item.id
                  ? "neon-active text-accent font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                  style={{ boxShadow: "0 0 8px 2px hsla(220, 80%, 50%, 0.6)" }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 space-y-1 border-t border-border/20">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
