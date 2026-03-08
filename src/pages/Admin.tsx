import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Plus, Trash2, Lock, Eye, EyeOff,
  LayoutDashboard, FolderOpen, LogOut, Image, Tag, FileText, TrendingUp
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getProjects, addProject, deleteProject, type Project } from "@/lib/projects";
import { toast } from "sonner";

const ADMIN_PASSWORD = "studio2024";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_auth") === "true";
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "add" | "manage">("overview");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl || !category) {
      toast.error("Please fill in all required fields.");
      return;
    }
    addProject({ title, description, imageUrl, category });
    setProjects(getProjects());
    setTitle("");
    setDescription("");
    setImageUrl("");
    setCategory("");
    toast.success("Project added successfully!");
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
    setProjects(getProjects());
    setDeleteConfirm(null);
    toast.success("Project deleted.");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    toast.success("Logged out.");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      toast.success("Access granted.");
    } else {
      toast.error("Incorrect password.");
    }
    setPassword("");
  };

  // Derive stats
  const categories = [...new Set(projects.map((p) => p.category))];
  const latestProject = projects[0];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleLogin}
          className="glass glow-box rounded-2xl p-10 w-full max-w-md space-y-6 text-center"
        >
          <div className="mx-auto w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-2xl font-display font-bold">Admin Access</h1>
          <p className="text-sm text-muted-foreground">Enter your password to continue</p>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-input/50 border-border pr-10"
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

          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/80">
            Unlock
          </Button>

          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-block mt-2">
            ← Back to portfolio
          </Link>
        </motion.form>
      </div>
    );
  }

  const navItems = [
    { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
    { id: "add" as const, label: "Add Project", icon: Plus },
    { id: "manage" as const, label: "Manage", icon: FolderOpen },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 border-r border-border/50 glass-strong flex flex-col fixed inset-y-0 left-0 z-40 lg:relative"
      >
        <div className="p-6 border-b border-border/30">
          <Link to="/" className="font-display font-bold text-xl tracking-tight inline-block">
            STUDIO<span className="text-accent">.</span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-accent/15 text-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border/30">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 ml-64">
        <div className="p-6 md:p-10 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-3xl font-display font-bold mb-2">Welcome back</h1>
                <p className="text-muted-foreground mb-10">Here's an overview of your portfolio.</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                  {[
                    { label: "Total Projects", value: projects.length, icon: FolderOpen, color: "text-accent" },
                    { label: "Categories", value: categories.length, icon: Tag, color: "text-emerald-400" },
                    { label: "Latest", value: latestProject?.title.slice(0, 12) || "—", icon: TrendingUp, color: "text-amber-400" },
                    { label: "Portfolio", value: "Live", icon: FileText, color: "text-green-400" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="glass rounded-xl p-5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <p className="text-2xl font-display font-bold">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Projects */}
                <h2 className="text-lg font-display font-semibold mb-4">Recent Projects</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.slice(0, 6).map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="glass rounded-xl overflow-hidden group cursor-pointer"
                    >
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="text-[10px] tracking-wider uppercase bg-background/70 backdrop-blur-sm px-2 py-1 rounded-full text-foreground">
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-semibold text-sm truncate">{project.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{project.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ADD PROJECT TAB */}
            {activeTab === "add" && (
              <motion.div
                key="add"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-3xl font-display font-bold mb-2">Add New Project</h1>
                <p className="text-muted-foreground mb-10">Fill out the details below to add a new piece to your portfolio.</p>

                <form onSubmit={handleSubmit} className="glass rounded-xl p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Project Title <span className="text-accent">*</span></label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Nebula Brand Identity"
                        className="bg-input/50 border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category <span className="text-accent">*</span></label>
                      <Input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. Branding, UI/UX, Motion"
                        className="bg-input/50 border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Image URL <span className="text-accent">*</span></label>
                    <Input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="bg-input/50 border-border"
                    />
                    {imageUrl && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 rounded-lg overflow-hidden border border-border/50"
                      >
                        <img src={imageUrl} alt="Preview" className="w-full h-48 object-cover" />
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief project description..."
                      className="bg-input/50 border-border resize-none"
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/80 px-8">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => { setTitle(""); setDescription(""); setImageUrl(""); setCategory(""); }}
                      className="text-muted-foreground"
                    >
                      Clear Form
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* MANAGE TAB */}
            {activeTab === "manage" && (
              <motion.div
                key="manage"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h1 className="text-3xl font-display font-bold mb-2">Manage Projects</h1>
                    <p className="text-muted-foreground">{projects.length} project{projects.length !== 1 ? "s" : ""} in your portfolio</p>
                  </div>
                  <Button
                    onClick={() => setActiveTab("add")}
                    className="bg-accent text-accent-foreground hover:bg-accent/80"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                  </Button>
                </div>

                {/* Table-style list */}
                <div className="glass rounded-xl overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-[64px_1fr_120px_100px_60px] md:grid-cols-[80px_1fr_1fr_120px_60px] gap-4 px-5 py-3 border-b border-border/30 text-xs text-muted-foreground uppercase tracking-wider">
                    <span>Image</span>
                    <span>Title</span>
                    <span className="hidden md:block">Description</span>
                    <span>Category</span>
                    <span className="text-right">Action</span>
                  </div>

                  {/* Rows */}
                  {projects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="grid grid-cols-[64px_1fr_120px_100px_60px] md:grid-cols-[80px_1fr_1fr_120px_60px] gap-4 px-5 py-4 items-center border-b border-border/10 hover:bg-secondary/20 transition-colors"
                    >
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-14 h-10 md:w-16 md:h-12 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="font-display font-semibold text-sm truncate">{project.title}</p>
                      </div>
                      <p className="text-sm text-muted-foreground truncate hidden md:block">{project.description || "—"}</p>
                      <span className="text-xs bg-secondary/50 px-3 py-1 rounded-full text-center truncate">
                        {project.category}
                      </span>
                      <div className="flex justify-end">
                        {deleteConfirm === project.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="text-xs text-destructive hover:underline"
                            >
                              Yes
                            </button>
                            <span className="text-muted-foreground text-xs">/</span>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-xs text-muted-foreground hover:underline"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(project.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            title="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {projects.length === 0 && (
                    <div className="p-12 text-center text-muted-foreground">
                      <Image className="w-10 h-10 mx-auto mb-4 opacity-30" />
                      <p className="font-display font-medium">No projects yet</p>
                      <p className="text-sm mt-1">Add your first project to get started.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Admin;
