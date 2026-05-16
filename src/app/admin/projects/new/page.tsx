"use client";

import { useEffect, useState } from "react";
import ProjectEditorForm, { blankProject, type Project } from "../../_components/ProjectEditorForm";

export default function NewProjectPage() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/data/projects")
      .then((r) => r.json())
      .then((d) => { setAllProjects(d); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="p-8 flex items-center gap-3 text-[#0A0A0F]/40">
      <div className="w-4 h-4 border-2 border-[#E63327]/30 border-t-[#E63327] rounded-full animate-spin" />
      Loading…
    </div>
  );

  return (
    <ProjectEditorForm
      initial={blankProject}
      allProjects={allProjects}
      isNew={true}
      existingSlug=""
    />
  );
}
