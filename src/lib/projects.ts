export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

const STORAGE_KEY = "portfolio_projects";

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Nebula Brand Identity",
    description: "Complete brand identity system for a tech startup",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
    category: "Branding",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Quantum UI Kit",
    description: "Modern UI component library with dark theme",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=500&fit=crop",
    category: "UI/UX",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Aurora Packaging",
    description: "Premium packaging design for luxury skincare",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=350&fit=crop",
    category: "Packaging",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Cipher Magazine",
    description: "Editorial layout for a digital culture magazine",
    imageUrl: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=600&h=450&fit=crop",
    category: "Editorial",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Vertex Motion Graphics",
    description: "Animated brand intro for a gaming company",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    category: "Motion",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Prism Web Experience",
    description: "Immersive web design for an art exhibition",
    imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=500&fit=crop",
    category: "Web Design",
    createdAt: new Date().toISOString(),
  },
];

export function getProjects(): Project[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
    return defaultProjects;
  }
  return JSON.parse(stored);
}

export function addProject(project: Omit<Project, "id" | "createdAt">): Project {
  const projects = getProjects();
  const newProject: Project = {
    ...project,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  projects.unshift(newProject);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return newProject;
}

export function deleteProject(id: string): void {
  const projects = getProjects().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}
