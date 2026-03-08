import { useState, useRef, type DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon, Check, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addProject, getProjects, type Project } from "@/lib/projects";
import { toast } from "sonner";

interface UploadPanelProps {
  onProjectAdded: (projects: Project[]) => void;
}

const categories = ["Branding", "Multimedia", "Social Media", "UI/UX", "Motion", "Web Design"];

const UploadPanel = ({ onProjectAdded }: UploadPanelProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      toast.success("Image loaded!");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      toast.success("Image loaded!");
    }
  };

  const handleSubmit = () => {
    if (!title || !imageUrl || !category) {
      toast.error("Please fill Title, Category, and add an Image.");
      return;
    }
    addProject({ title, description, imageUrl, category, clientName, status: "published" });
    onProjectAdded(getProjects());
    setTitle("");
    setDescription("");
    setImageUrl("");
    setCategory("");
    setClientName("");
    setShowPreview(false);
    toast.success("Project Published Successfully!", {
      description: `"${title}" is now live on your portfolio.`,
    });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageUrl("");
    setCategory("");
    setClientName("");
    setShowPreview(false);
  };

  const hasContent = title || imageUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold">Upload Project</h2>
          <p className="text-sm text-muted-foreground mt-1">Drag files or fill the form to add work</p>
        </div>
        {hasContent && (
          <Button variant="ghost" size="sm" onClick={resetForm} className="text-muted-foreground">
            <X className="w-4 h-4 mr-1" /> Clear
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Left: Drop zone + form (3 cols) */}
        <div className="lg:col-span-3 space-y-5">
          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-xl border-2 border-dashed cursor-pointer transition-all duration-500 overflow-hidden ${
              isDragging
                ? "border-foreground/40"
                : imageUrl
                ? "border-accent/30"
                : "border-border/50 hover:border-border"
            } ${isDragging ? "drop-zone-glow" : ""}`}
            style={isDragging ? { animation: "dropGlowActive 1.5s ease-in-out infinite" } : {}}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            {imageUrl ? (
              <div className="relative group">
                <img src={imageUrl} alt="Upload" className="w-full h-52 object-cover" />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-sm font-medium">Click to change image</p>
                </div>
              </div>
            ) : (
              <div className="py-16 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    {isDragging ? "Drop your file here" : "Drag & drop your image"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">or click to browse • PNG, JPG, WebP</p>
                </div>
              </div>
            )}
          </div>

          {/* URL alternative */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Or paste image URL</label>
            <Input
              value={imageUrl.startsWith("blob:") ? "" : imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="bg-input/50 border-border"
            />
          </div>

          {/* Form fields */}
          <div className="glass rounded-xl p-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Project Title *</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Nebula Identity"
                  className="bg-input/50 border-border"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Client Name</label>
                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="bg-input/50 border-border"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Category *</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      category === cat
                        ? "neon-active text-accent"
                        : "glass-subtle text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project... (Markdown supported)"
                className="bg-input/50 border-border resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button onClick={handleSubmit} className="bg-accent text-accent-foreground hover:bg-accent/80 px-6">
              <Check className="w-4 h-4 mr-2" />
              Publish Project
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowPreview(!showPreview)}
              className="text-muted-foreground lg:hidden"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>

        {/* Right: Live Preview (2 cols) */}
        <div className="lg:col-span-2 hidden lg:block">
          <LivePreviewCard
            title={title}
            imageUrl={imageUrl}
            category={category}
            description={description}
          />
        </div>

        {/* Mobile Preview */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden col-span-full overflow-hidden"
            >
              <LivePreviewCard
                title={title}
                imageUrl={imageUrl}
                category={category}
                description={description}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const LivePreviewCard = ({
  title, imageUrl, category, description
}: { title: string; imageUrl: string; category: string; description: string }) => (
  <div className="sticky top-6">
    <p className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-2">
      <Eye className="w-3 h-3" /> Live Preview
    </p>
    <div className="glass rounded-xl overflow-hidden glow-border transition-all duration-500">
      <div className="relative h-48 bg-secondary/30 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-muted-foreground/20" />
          </div>
        )}
        {category && (
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider glass px-2 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg">
          {title || "Project Title"}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
          {description || "Your project description will appear here..."}
        </p>
      </div>
    </div>
    <p className="text-[10px] text-muted-foreground/50 text-center mt-3">
      This is how your project will appear on the public portfolio
    </p>
  </div>
);

export default UploadPanel;
