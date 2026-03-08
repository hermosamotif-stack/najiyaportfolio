import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Plus, Trash2, Lock, Eye, EyeOff,
  LogOut, FolderOpen, Tag, X, Check
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
  const [showForm, setShowForm] = useState(false);
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
    setShowForm(false);
    toast.success("Project added!");
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

  const categories = [...new Set(projects.map((p) => p.category))];

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

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 glass-strong border-b border-border/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg font-display font-bold leading-tight">
                STUDIO<span className="text-accent">.</span> Admin
              </h1>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10"
        >
          <div className="glass rounded-xl px-5 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold">{projects.length}</p>
              <p className="text-xs text-muted-foreground">Projects</p>
            </div>
          </div>
          <div className="glass rounded-xl px-5 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Tag className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold">{categories.length}</p>
              <p className="text-xs text-muted-foreground">Categories</p>
            </div>
          </div>
          <div className="hidden md:flex glass rounded-xl px-5 py-4 items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-display font-semibold">Portfolio Live</p>
              <p className="text-xs text-muted-foreground">All systems online</p>
            </div>
          </div>
        </motion.div>

        {/* Action bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-xl font-display font-semibold">Projects</h2>
          <Button
            onClick={() => setShowForm(!showForm)}
            className={showForm ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : "bg-accent text-accent-foreground hover:bg-accent/80"}
          >
            {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            {showForm ? "Cancel" : "New Project"}
          </Button>
        </motion.div>

        {/* Collapsible Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="glass rounded-xl p-6 mb-8 overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Title *</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Project name"
                    className="bg-input/50 border-border"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Category *</label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Branding"
                    className="bg-input/50 border-border"
                  />
                </div>
              </div>
              <div className="space-y-1.5 mb-5">
                <label className="text-xs font-medium text-muted-foreground">Image URL *</label>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="bg-input/50 border-border"
                />
              </div>
              {imageUrl && (
                <div className="mb-5 rounded-lg overflow-hidden border border-border/30 max-w-xs">
                  <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover" />
                </div>
              )}
              <div className="space-y-1.5 mb-6">
                <label className="text-xs font-medium text-muted-foreground">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description..."
                  className="bg-input/50 border-border resize-none"
                  rows={3}
                />
              </div>
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/80">
                <Check className="w-4 h-4 mr-2" />
                Save Project
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Project cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="space-y-3"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.02 * i }}
              className="glass rounded-xl p-4 flex items-center gap-4 group hover:glow-box transition-all duration-300"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-sm truncate">{project.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{project.description || "No description"}</p>
              </div>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider bg-secondary/60 px-3 py-1 rounded-full text-muted-foreground flex-shrink-0">
                {project.category}
              </span>
              {deleteConfirm === project.id ? (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => handleDelete(project.id)} className="text-xs text-destructive font-medium hover:underline">Delete</button>
                  <button onClick={() => setDeleteConfirm(null)} className="text-xs text-muted-foreground hover:underline">Cancel</button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(project.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ))}

          {projects.length === 0 && (
            <div className="glass rounded-xl p-16 text-center">
              <FolderOpen className="w-10 h-10 mx-auto mb-4 text-muted-foreground/30" />
              <p className="font-display font-medium text-muted-foreground">No projects yet</p>
              <p className="text-sm text-muted-foreground/60 mt-1">Click "New Project" to add your first one.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
