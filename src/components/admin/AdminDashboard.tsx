import { useState } from "react";
import type { Project } from "@/pages/Admin";

interface AdminDashboardProps {
  projects: Project[];
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: { title?: string; description?: string; category?: string }) => void;
}

const AdminDashboard = ({ projects, onDelete, onEdit }: AdminDashboardProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const categories = [...new Set(projects.map((p) => p.category))];

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setEditTitle(p.title);
    setEditDesc(p.description || "");
    setEditCategory(p.category);
  };

  const saveEdit = () => {
    if (!editingId) return;
    onEdit(editingId, { title: editTitle, description: editDesc, category: editCategory });
    setEditingId(null);
  };

  return (
    <div>
      {/* Mobile nav */}
      <div className="md:hidden mb-6 text-xs uppercase tracking-wider opacity-50">Dashboard</div>

      <h1 className="text-2xl font-bold tracking-tight mb-1">Dashboard</h1>
      <p className="text-sm opacity-50 mb-8">
        {projects.length} project{projects.length !== 1 ? "s" : ""} · {categories.length} categor{categories.length !== 1 ? "ies" : "y"}
      </p>

      {/* Project list */}
      {projects.length === 0 ? (
        <p className="text-sm opacity-40 py-12 text-center">
          No projects yet. Upload your first work.
        </p>
      ) : (
        <div className="space-y-0">
          {/* Header */}
          <div
            className="hidden sm:grid grid-cols-12 gap-4 px-4 py-2 text-xs uppercase tracking-wider"
            style={{ opacity: 0.4, borderBottom: "1px solid #DDDDDD22" }}
          >
            <div className="col-span-1">#</div>
            <div className="col-span-4">Title</div>
            <div className="col-span-3">Category</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {projects.map((project, i) => (
            <div key={project.id}>
              {editingId === project.id ? (
                <div
                  className="px-4 py-4 space-y-3"
                  style={{ borderBottom: "1px solid #DDDDDD15" }}
                >
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-2 py-1 text-sm outline-none"
                    style={{ background: "transparent", border: "1px solid #DDDDDD44", color: "#DDDDDD" }}
                    placeholder="Title"
                  />
                  <input
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full px-2 py-1 text-sm outline-none"
                    style={{ background: "transparent", border: "1px solid #DDDDDD44", color: "#DDDDDD" }}
                    placeholder="Description"
                  />
                  <input
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-2 py-1 text-sm outline-none"
                    style={{ background: "transparent", border: "1px solid #DDDDDD44", color: "#DDDDDD" }}
                    placeholder="Category"
                  />
                  <div className="flex gap-4 text-sm">
                    <button onClick={saveEdit} className="underline" style={{ color: "#DDDDDD" }}>
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)} className="underline opacity-50" style={{ color: "#DDDDDD" }}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="grid grid-cols-12 gap-4 px-4 py-3 items-center text-sm"
                  style={{ borderBottom: "1px solid #DDDDDD10" }}
                >
                  <div className="col-span-1 opacity-30 hidden sm:block">{i + 1}</div>
                  <div className="col-span-8 sm:col-span-4 flex items-center gap-3">
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt=""
                        className="w-8 h-8 object-cover shrink-0"
                        style={{ border: "1px solid #DDDDDD22" }}
                      />
                    )}
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-xs opacity-40 sm:hidden">{project.category}</p>
                    </div>
                  </div>
                  <div className="col-span-3 opacity-60 hidden sm:block">{project.category}</div>
                  <div className="col-span-2 opacity-40 text-xs hidden sm:block">
                    {new Date(project.created_at).toLocaleDateString()}
                  </div>
                  <div className="col-span-4 sm:col-span-2 text-right space-x-4 text-xs">
                    {deleteConfirm === project.id ? (
                      <>
                        <button
                          onClick={() => { onDelete(project.id); setDeleteConfirm(null); }}
                          className="underline"
                          style={{ color: "#ff6b6b" }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="underline opacity-50"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(project)} className="underline opacity-60 hover:opacity-100">
                          Edit
                        </button>
                        <button onClick={() => setDeleteConfirm(project.id)} className="underline opacity-60 hover:opacity-100">
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
