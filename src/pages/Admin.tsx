import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getProjects, type Project } from "@/lib/projects";
import { toast } from "sonner";
import AdminSidebar from "@/components/admin/AdminSidebar";
import StatsCards from "@/components/admin/StatsCards";
import UploadPanel from "@/components/admin/UploadPanel";
import ProjectFeed from "@/components/admin/ProjectFeed";

const ADMIN_PASSWORD = "studio2024";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_auth") === "true";
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      toast.success("Access granted. Welcome back.", {
        description: "Your command center is ready.",
      });
    } else {
      toast.error("Incorrect password.");
    }
    setPassword("");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

        <motion.form
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onSubmit={handleLogin}
          className="glass glow-box rounded-2xl p-10 w-full max-w-md space-y-6 text-center relative z-10"
        >
          <div className="mx-auto w-16 h-16 rounded-2xl glass flex items-center justify-center mb-2 glow-border">
            <Lock className="w-7 h-7 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">Command Center</h1>
            <p className="text-sm text-muted-foreground mt-2">Authenticate to access your dashboard</p>
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="bg-input/50 border-border pr-10 h-11"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/80 h-11 font-medium">
            Unlock Dashboard
          </Button>

          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-block">
            ← Return to portfolio
          </Link>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content */}
      <main className="flex-1 min-w-0 pt-14 lg:pt-0">
        <div className="p-5 md:p-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-3xl font-display font-bold">
                    Welcome back<span className="text-accent">.</span>
                  </h1>
                  <p className="text-muted-foreground text-sm mt-1">
                    Here's what's happening with your portfolio
                  </p>
                </motion.div>

                {/* Stats */}
                <StatsCards projects={projects} />

                {/* Recent activity */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-display font-semibold mb-4">Recent Work</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.slice(0, 3).map((project, i) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 + i * 0.08 }}
                        className="glass rounded-xl overflow-hidden group hover:glow-border transition-all duration-300"
                      >
                        <div className="relative h-32 overflow-hidden">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <h4 className="font-display font-semibold text-sm truncate">{project.title}</h4>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{project.category}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <UploadPanel onProjectAdded={setProjects} />
              </motion.div>
            )}

            {activeTab === "projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectFeed projects={projects} onProjectsChange={setProjects} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Admin;
