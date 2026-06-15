// app/admin/projects/page.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProjectModal } from "@/components/admin/ProjectModal";
import { Modal } from "@/components/ui/Modal";

interface Project {
  id: string;
  title: string;
  platform: string;
  thumbnailUrl: string;
  videoUrl: string;
  clientName: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

const toastStyle = { background: "#151515", color: "#F2F2F2", border: "1px solid #1F1F1F", borderRadius: "12px" };

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch {
      toast.error("Failed to load projects", { style: toastStyle });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const handleSave = async (data: { id?: string; title: string; platform: string; thumbnailUrl: string; videoUrl: string; clientName: string; featured: boolean; order: number }) => {
    setSaving(true);
    try {
      const isEdit = !!data.id;
      const res = await fetch("/api/projects", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      await fetchProjects();
      setModalOpen(false);
      setEditProject(null);
      toast.success(isEdit ? "Project updated!" : "Project added!", { style: { ...toastStyle, border: "1px solid #C8FF00" } });
    } catch {
      toast.error("Failed to save project", { style: toastStyle });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await fetch(`/api/projects?id=${deleteId}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
      toast.success("Project deleted", { style: toastStyle });
    } catch {
      toast.error("Failed to delete", { style: toastStyle });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-black text-2xl text-primary">Projects</h1>
          <p className="font-body text-secondary text-sm mt-1">{projects.length} portfolio projects</p>
        </div>
        <Button
          id="add-project-btn"
          variant="filled"
          size="md"
          onClick={() => { setEditProject(null); setModalOpen(true); }}
        >
          <Plus size={16} className="mr-2" /> Add Project
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-surface border border-border rounded-2xl h-48 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface border border-border rounded-2xl p-5 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Badge label={project.platform} />
                    {project.featured && (
                      <Star size={12} className="text-accent fill-accent" />
                    )}
                  </div>
                  <span className="font-body text-secondary text-xs">#{project.order}</span>
                </div>

                <h3 className="font-display font-bold text-primary text-sm mb-1 truncate">
                  {project.title}
                </h3>
                <p className="font-body text-secondary text-xs mb-4">{project.clientName}</p>

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    id={`edit-project-${project.id}`}
                    onClick={() => { setEditProject(project); setModalOpen(true); }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] text-secondary hover:text-primary transition-colors font-body text-xs"
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    id={`delete-project-${project.id}`}
                    onClick={() => setDeleteId(project.id)}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors font-body text-xs"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add/Edit Modal */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditProject(null); }}
        onSave={handleSave}
        project={editProject}
        loading={saving}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Project"
        size="sm"
      >
        <div className="p-6">
          <p className="font-body text-secondary text-sm mb-6">
            Are you sure you want to delete this project? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" size="md" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button
              id="confirm-delete-btn"
              variant="filled"
              size="md"
              className="!bg-red-500 !text-white hover:!bg-red-600 !shadow-none"
              loading={deleting}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
