import { Link } from "react-router-dom";

type Tab = "dashboard" | "upload";

interface AdminSidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onLogout: () => void;
}

const navItems: { label: string; tab: Tab }[] = [
  { label: "Dashboard", tab: "dashboard" },
  { label: "Upload Work", tab: "upload" },
];

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }: AdminSidebarProps) => {
  return (
    <aside
      className="w-52 shrink-0 border-r flex flex-col justify-between min-h-screen hidden md:flex"
      style={{ borderColor: "#DDDDDD22", background: "#000e38" }}
    >
      <div>
        <div className="px-6 py-8">
          <Link to="/" className="text-sm font-bold tracking-widest uppercase" style={{ color: "#DDDDDD" }}>
            STUDIO<span style={{ color: "#DDDDDD", opacity: 0.4 }}>.</span>
          </Link>
        </div>

        <nav className="px-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className="w-full text-left px-3 py-2 text-sm transition-colors"
              style={{
                color: "#DDDDDD",
                background: activeTab === item.tab ? "#DDDDDD15" : "transparent",
                borderLeft: activeTab === item.tab ? "2px solid #DDDDDD" : "2px solid transparent",
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="px-4 pb-8">
        <button
          onClick={onLogout}
          className="w-full text-left px-3 py-2 text-sm transition-opacity hover:opacity-100"
          style={{ color: "#DDDDDD", opacity: 0.5 }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
