"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Toast, type ToastState } from "../_components/Toast";
import { PageHeader } from "../_components/PageHeader";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

type Project = { slug: string; title: string; client: string; category: string; year: string; result: string; color: string };

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    fetch("/api/admin/data/projects").then((r) => r.json()).then((d) => {
      setProjects(d);
      setLoading(false);
    });
  }, []);

  const remove = async (slug: string) => {
    if (!confirm(`Delete project "${slug}"? This cannot be undone.`)) return;
    const updated = projects.filter((p) => p.slug !== slug);
    const res = await fetch("/api/admin/data/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      setProjects(updated);
      setToast({ message: "Project deleted", type: "success" });
    } else {
      setToast({ message: "Delete failed", type: "error" });
    }
  };

  if (loading) return (
    <div className="p-8 flex items-center gap-3 text-[#0A0A0F]/40">
      <div className="w-4 h-4 border-2 border-[#E63327]/30 border-t-[#E63327] rounded-full animate-spin" />
      Loading…
    </div>
  );

  return (
    <div className="p-8 max-w-5xl">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <PageHeader
        title="Projects"
        subtitle={`${projects.length} case studies`}
        action={
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 bg-[#E63327] hover:bg-[#FF5349] text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm"
          >
            <Plus size={14} /> New Project
          </Link>
        }
      />

      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p.slug}
            className="bg-white rounded-2xl border border-[#0A0A0F]/06 px-5 py-4 flex items-center gap-4 hover:border-[#0A0A0F]/12 transition-colors"
          >
            {/* Color swatch */}
            <div
              className="w-3 h-12 rounded-full flex-shrink-0"
              style={{ background: p.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[#0A0A0F] truncate">{p.title}</div>
              <div className="text-sm text-[#0A0A0F]/45">{p.client} · {p.category} · {p.year}</div>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-[#0A0A0F]/35 bg-[#E63327]/06 px-3 py-1.5 rounded-full flex-shrink-0">
              {p.result}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link
                href={`/work/${p.slug}`}
                target="_blank"
                className="p-1.5 text-[#0A0A0F]/25 hover:text-[#0A0A0F]/60 transition-colors"
                title="View live"
              >
                <ExternalLink size={14} />
              </Link>
              <Link
                href={`/admin/projects/${p.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#0A0A0F]/10 rounded-lg text-sm text-[#0A0A0F]/60 hover:border-[#E63327]/40 hover:text-[#E63327] transition-all"
              >
                <Pencil size={12} /> Edit
              </Link>
              <button
                onClick={() => remove(p.slug)}
                className="p-1.5 text-[#0A0A0F]/25 hover:text-red-500 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
