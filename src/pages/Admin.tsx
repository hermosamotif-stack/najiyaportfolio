import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Lock, Eye, EyeOff } from "lucide-react";
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
    toast.success("Project deleted.");
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12"
        >
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
        </motion.div>

        {/* Add Project Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass rounded-xl p-8 mb-12 space-y-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <Plus className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-display font-semibold">Add New Project</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Project Title *</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Nebula Brand Identity"
                className="bg-input/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Category *</label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Branding, UI/UX, Motion"
                className="bg-input/50 border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Image URL *</label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="bg-input/50 border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief project description..."
              className="bg-input/50 border-border resize-none"
              rows={3}
            />
          </div>

          <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/80">
            Add Project
          </Button>
        </motion.form>

        {/* Project List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-display font-semibold mb-6">
            Existing Projects ({projects.length})
          </h2>
          <div className="space-y-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="glass rounded-xl p-4 flex items-center gap-4"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold truncate">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.category}</p>
                </div>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
