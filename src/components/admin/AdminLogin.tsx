import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    }
    setSubmitting(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "#001247" }}
    >
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-6"
        style={{ color: "#DDDDDD" }}
      >
        <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
        <p className="text-sm opacity-60">Sign in to manage your portfolio</p>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider opacity-60">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            className="w-full px-3 py-2 text-sm outline-none"
            style={{
              background: "transparent",
              border: "1px solid #DDDDDD",
              color: "#DDDDDD",
            }}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider opacity-60">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 text-sm outline-none"
            style={{
              background: "transparent",
              border: "1px solid #DDDDDD",
              color: "#DDDDDD",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 text-sm font-bold uppercase tracking-wider transition-colors"
          style={{
            background: "#DDDDDD",
            color: "#001247",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#BBBBBB";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#DDDDDD";
          }}
        >
          {submitting ? "Signing in..." : "Sign In"}
        </button>

        <Link
          to="/"
          className="block text-center text-xs opacity-50 hover:opacity-100 transition-opacity"
          style={{ color: "#DDDDDD" }}
        >
          ← Back to portfolio
        </Link>
      </form>
    </div>
  );
};

export default AdminLogin;
