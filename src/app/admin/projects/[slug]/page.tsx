"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProjectEditorForm, { type Project } from "../../_components/ProjectEditorForm";

export default function EditProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch("/api/admin/data/projects")
      .then((r) => r.json())
      .then((projects: Project[]) => {
        setAllProjects(projects);
        const found = projects.find((p) => p.slug === slug);
        if (found) setProject(found);
        else setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return (
    <div className="p-8 flex items-center gap-3 text-[#0A0A0F]/40">
      <div className="w-4 h-4 border-2 border-[#E63327]/30 border-t-[#E63327] rounded-full animate-spin" />
      Loading…
    </div>
  );

  if (notFound) return (
    <div className="p-8 text-[#0A0A0F]/50">
      Project <code className="font-mono bg-[#0A0A0F]/05 px-2 py-0.5 rounded">{slug}</code> not found.
    </div>
  );

  return (
    <ProjectEditorForm
      initial={project!}
      allProjects={allProjects}
      isNew={false}
      existingSlug={slug}
    />
  );
}
