import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, EyeOff, Eye, MoreVertical, Search } from "lucide-react";
import { updateProject, deleteProject, getProjects, type Project } from "@/lib/projects";
import { toast } from "sonner";

interface ProjectFeedProps {
  projects: Project[];
  onProjectsChange: (projects: Project[]) => void;
}

const ProjectFeed = ({ projects, onProjectsChange }: ProjectFeedProps) => {
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleVisibility = (project: Project) => {
    const newStatus = project.status === "hidden" ? "published" : "hidden";
    updateProject(project.id, { status: newStatus });
    onProjectsChange(getProjects());
    toast.success(newStatus === "hidden" ? "Project hidden from portfolio" : "Project visible again");
    setOpenMenu(null);
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
    onProjectsChange(getProjects());
    setDeleteConfirm(null);
    setOpenMenu(null);
    toast.success("Project deleted permanently.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold">Projects</h2>
          <p className="text-sm text-muted-foreground mt-1">{projects.length} total • {filtered.length} shown</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-input/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className={`glass rounded-xl p-3 flex items-center gap-4 group hover:glow-border transition-all duration-300 ${
                project.status === "hidden" ? "opacity-50" : ""
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {project.status === "draft" && (
                  <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                    <span className="text-[8px] font-bold uppercase tracking-wider">Draft</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-sm truncate">{project.title}</h3>
                  {project.status === "hidden" && (
                    <EyeOff className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{project.category}</span>
                  {project.clientName && (
                    <>
                      <span className="text-border">•</span>
                      <span className="text-[10px] text-muted-foreground">{project.clientName}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Views */}
              <div className="hidden sm:block text-right flex-shrink-0 mr-2">
                <p className="text-sm font-display font-semibold">{project.views}</p>
                <p className="text-[10px] text-muted-foreground">views</p>
              </div>

              {/* Actions */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setOpenMenu(openMenu === project.id ? null : project.id)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all opacity-50 group-hover:opacity-100"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {openMenu === project.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute right-0 top-10 z-20 glass-strong rounded-lg py-1 w-40 shadow-xl"
                    >
                      <button
                        onClick={() => handleToggleVisibility(project)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-colors"
                      >
                        {project.status === "hidden" ? (
                          <><Eye className="w-3.5 h-3.5" /> Show</>
                        ) : (
                          <><EyeOff className="w-3.5 h-3.5" /> Hide</>
                        )}
                      </button>
                      {deleteConfirm === project.id ? (
                        <div className="px-3 py-2 space-y-2">
                          <p className="text-xs text-destructive font-medium">Delete forever?</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="text-xs bg-destructive/20 text-destructive px-3 py-1 rounded-md hover:bg-destructive/30 transition-colors"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-xs text-muted-foreground px-3 py-1 rounded-md hover:bg-secondary/30 transition-colors"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(project.id)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="glass rounded-xl p-16 text-center">
            <Search className="w-8 h-8 mx-auto mb-3 text-muted-foreground/20" />
            <p className="font-display font-medium text-muted-foreground">No projects found</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectFeed;
