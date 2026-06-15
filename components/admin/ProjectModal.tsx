// components/admin/ProjectModal.tsx
"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  platform: z.string().min(1, "Platform is required"),
  thumbnailUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  videoUrl: z.string().url("Must be a valid URL").or(z.literal("#")),
  clientName: z.string().min(1, "Client name is required"),
  featured: z.boolean(),
  order: z.number().int().min(0),
});

type FormData = z.infer<typeof schema>;

interface Project {
  id?: string;
  title: string;
  platform: string;
  thumbnailUrl: string;
  videoUrl: string;
  clientName: string;
  featured: boolean;
  order: number;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData & { id?: string }) => void;
  project?: Project | null;
  loading?: boolean;
}

const inputClass =
  "w-full bg-bg border border-border rounded-xl px-4 py-3 font-body text-primary text-sm placeholder:text-secondary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors";
const labelClass = "block font-body font-medium text-secondary text-xs uppercase tracking-wider mb-1.5";
const errorClass = "mt-1 text-red-400 text-xs font-body";

export function ProjectModal({ isOpen, onClose, onSave, project, loading }: ProjectModalProps) {
  const isEdit = !!project?.id;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      platform: "Reel",
      thumbnailUrl: "",
      videoUrl: "#",
      clientName: "",
      featured: false,
      order: 0,
    },
  });

  useEffect(() => {
    if (project) {
      reset(project);
    } else {
      reset({ title: "", platform: "Reel", thumbnailUrl: "", videoUrl: "#", clientName: "", featured: false, order: 0 });
    }
  }, [project, reset]);

  const onSubmit = (data: FormData) => {
    onSave({ ...data, id: project?.id });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit Project" : "Add Project"} size="md">
      <form id="project-form" onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Title */}
          <div className="col-span-2">
            <label className={labelClass}>Project Title</label>
            <input className={cn(inputClass, errors.title && "border-red-500/50")} placeholder="e.g. NovaSkin Brand Reels" {...register("title")} />
            {errors.title && <p className={errorClass}>{errors.title.message}</p>}
          </div>

          {/* Platform */}
          <div>
            <label className={labelClass}>Platform</label>
            <select className={cn(inputClass, "cursor-pointer")} {...register("platform")}>
              {["Reel", "Short", "TikTok", "YouTube"].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Order */}
          <div>
            <label className={labelClass}>Display Order</label>
            <input type="number" min={0} className={inputClass} {...register("order", { valueAsNumber: true })} />
          </div>

          {/* Client */}
          <div className="col-span-2">
            <label className={labelClass}>Client Name</label>
            <input className={cn(inputClass, errors.clientName && "border-red-500/50")} placeholder="e.g. NovaSkin" {...register("clientName")} />
            {errors.clientName && <p className={errorClass}>{errors.clientName.message}</p>}
          </div>

          {/* Thumbnail */}
          <div className="col-span-2">
            <label className={labelClass}>Thumbnail URL</label>
            <input className={cn(inputClass, errors.thumbnailUrl && "border-red-500/50")} placeholder="https://..." {...register("thumbnailUrl")} />
            {errors.thumbnailUrl && <p className={errorClass}>{errors.thumbnailUrl.message}</p>}
          </div>

          {/* Video URL */}
          <div className="col-span-2">
            <label className={labelClass}>Video URL</label>
            <input className={cn(inputClass, errors.videoUrl && "border-red-500/50")} placeholder="https://..." {...register("videoUrl")} />
            {errors.videoUrl && <p className={errorClass}>{errors.videoUrl.message}</p>}
          </div>

          {/* Featured */}
          <div className="col-span-2 flex items-center gap-3">
            <input
              id="project-featured"
              type="checkbox"
              className="w-4 h-4 accent-[#C8FF00] rounded"
              {...register("featured")}
            />
            <label htmlFor="project-featured" className="font-body text-sm text-secondary cursor-pointer">
              Feature this project on the portfolio grid
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-border">
          <Button type="button" variant="ghost" size="md" onClick={onClose}>Cancel</Button>
          <Button id="project-save" type="submit" variant="filled" size="md" loading={loading}>
            {isEdit ? "Save Changes" : "Add Project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
