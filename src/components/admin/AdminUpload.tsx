import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CATEGORIES = ["Branding", "Multimedia", "Social Media", "UI/UX", "Web Design", "Packaging", "Editorial", "Motion"];

interface AdminUploadProps {
  onSuccess: () => void;
}

const AdminUpload = ({ onSuccess }: AdminUploadProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("image/")) handleFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) {
      toast.error("Title and image are required");
      return;
    }

    setUploading(true);

    // Upload image
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(path, file);

    if (uploadError) {
      toast.error("Image upload failed");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("project-images")
      .getPublicUrl(path);

    // Insert project
    const { error } = await supabase.from("projects").insert({
      title,
      description: description || null,
      category,
      image_url: urlData.publicUrl,
    });

    if (error) {
      toast.error("Failed to save project");
      setUploading(false);
      return;
    }

    toast.success("Published to portfolio!");
    setTitle("");
    setDescription("");
    setCategory(CATEGORIES[0]);
    setFile(null);
    setPreview(null);
    setUploading(false);
    onSuccess();
  };

  return (
    <div>
      <div className="md:hidden mb-6 text-xs uppercase tracking-wider opacity-50">Upload Work</div>

      <h1 className="text-2xl font-bold tracking-tight mb-1">Upload Work</h1>
      <p className="text-sm opacity-50 mb-8">Add a new project to your portfolio</p>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
        {/* Drop zone */}
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className="cursor-pointer flex items-center justify-center transition-colors"
          style={{
            border: `2px dashed ${dragOver ? "#DDDDDD" : "#DDDDDD44"}`,
            minHeight: preview ? "auto" : "200px",
            background: dragOver ? "#DDDDDD08" : "transparent",
          }}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full max-h-64 object-contain" />
          ) : (
            <div className="text-center py-12">
              <p className="text-sm opacity-60">Click or drag an image here</p>
              <p className="text-xs opacity-30 mt-1">JPG, PNG, WEBP</p>
            </div>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />

        {/* Title */}
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider opacity-60">Project Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 text-sm outline-none"
            style={{
              background: "transparent",
              border: "1px solid #DDDDDD33",
              color: "#DDDDDD",
            }}
            placeholder="e.g. Brand Identity for Acme Co"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider opacity-60">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 text-sm outline-none resize-none"
            style={{
              background: "transparent",
              border: "1px solid #DDDDDD33",
              color: "#DDDDDD",
            }}
            placeholder="Brief description of the project..."
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider opacity-60">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 text-sm outline-none appearance-none cursor-pointer"
            style={{
              background: "transparent",
              border: "1px solid #DDDDDD33",
              color: "#DDDDDD",
            }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} style={{ background: "#001247", color: "#DDDDDD" }}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full py-4 text-sm font-bold uppercase tracking-widest transition-colors"
          style={{
            background: uploading ? "#DDDDDD88" : "#DDDDDD",
            color: "#001247",
          }}
          onMouseEnter={(e) => {
            if (!uploading) e.currentTarget.style.background = "#BBBBBB";
          }}
          onMouseLeave={(e) => {
            if (!uploading) e.currentTarget.style.background = "#DDDDDD";
          }}
        >
          {uploading ? "Publishing..." : "Publish to Portfolio"}
        </button>
      </form>
    </div>
  );
};

export default AdminUpload;
