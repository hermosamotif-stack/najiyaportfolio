import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminUpload from "@/components/admin/AdminUpload";

export type Project = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string | null;
  created_at: string;
};

type Tab = "dashboard" | "upload";

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchProjects = useCallback(async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load projects");
      return;
    }
    setProjects(data || []);
  }, []);

  useEffect(() => {
    if (session) fetchProjects();
  }, [session, fetchProjects]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#001247" }}>
        <p style={{ color: "#DDDDDD" }}>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#001247", color: "#DDDDDD" }}>
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3" style={{ background: "#000e38", borderBottom: "1px solid #DDDDDD22" }}>
        <span className="text-xs font-bold tracking-widest uppercase">STUDIO.</span>
        <div className="flex gap-4 text-xs">
          <button onClick={() => setActiveTab("dashboard")} style={{ opacity: activeTab === "dashboard" ? 1 : 0.5 }}>Dashboard</button>
          <button onClick={() => setActiveTab("upload")} style={{ opacity: activeTab === "upload" ? 1 : 0.5 }}>Upload</button>
          <button onClick={handleLogout} style={{ opacity: 0.5 }}>Logout</button>
        </div>
      </div>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto min-h-screen pt-16 md:pt-10">
        {activeTab === "dashboard" && (
          <AdminDashboard projects={projects} onDelete={async (id) => {
            const { error } = await supabase.from("projects").delete().eq("id", id);
            if (error) { toast.error("Delete failed"); return; }
            toast.success("Project deleted");
            fetchProjects();
          }} onEdit={async (id, updates) => {
            const { error } = await supabase.from("projects").update(updates).eq("id", id);
            if (error) { toast.error("Update failed"); return; }
            toast.success("Project updated");
            fetchProjects();
          }} />
        )}
        {activeTab === "upload" && (
          <AdminUpload onSuccess={() => { fetchProjects(); setActiveTab("dashboard"); }} />
        )}
      </main>
    </div>
  );
};

export default Admin;
