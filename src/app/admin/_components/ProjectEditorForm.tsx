"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toast, type ToastState } from "./Toast";
import { PageHeader } from "./PageHeader";
import { Plus, Trash2, Save } from "lucide-react";

export type ResultRow = { metric: string; value: string };
export type ProcessStep = { step: string; title: string; desc: string };

export type Project = {
  slug: string; title: string; client: string; category: string; year: string;
  result: string; color: string; tags: string[]; description: string;
  challenge: string; solution: string; results: ResultRow[];
  services: string[]; process: ProcessStep[];
};

export const blankProject: Project = {
  slug: "", title: "", client: "", category: "", year: new Date().getFullYear().toString(),
  result: "", color: "#E63327", tags: [], description: "", challenge: "", solution: "",
  results: [], services: [], process: [],
};

export default function ProjectEditorForm({
  initial,
  allProjects,
  isNew,
  existingSlug,
}: {
  initial: Project;
  allProjects: Project[];
  isNew: boolean;
  existingSlug: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState<Project>(initial);
  const [tagInput, setTagInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const set = (k: keyof Project, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const addTag = () => { if (!tagInput.trim()) return; set("tags", [...form.tags, tagInput.trim()]); setTagInput(""); };
  const removeTag = (i: number) => set("tags", form.tags.filter((_, idx) => idx !== i));

  const addService = () => { if (!serviceInput.trim()) return; set("services", [...form.services, serviceInput.trim()]); setServiceInput(""); };
  const removeService = (i: number) => set("services", form.services.filter((_, idx) => idx !== i));

  const addResult = () => set("results", [...form.results, { metric: "", value: "" }]);
  const setResult = (i: number, k: keyof ResultRow, v: string) => {
    const results = [...form.results]; results[i] = { ...results[i], [k]: v }; set("results", results);
  };
  const removeResult = (i: number) => set("results", form.results.filter((_, idx) => idx !== i));

  const addStep = () => {
    const next = String(form.process.length + 1).padStart(2, "0");
    set("process", [...form.process, { step: next, title: "", desc: "" }]);
  };
  const setStep = (i: number, k: keyof ProcessStep, v: string) => {
    const process = [...form.process]; process[i] = { ...process[i], [k]: v }; set("process", process);
  };
  const removeStep = (i: number) => set("process", form.process.filter((_, idx) => idx !== i));

  const save = async () => {
    if (!form.title || !form.slug) { setToast({ message: "Title and slug are required", type: "error" }); return; }
    setSaving(true);
    const updated = isNew
      ? [...allProjects, form]
      : allProjects.map((p) => (p.slug === existingSlug ? form : p));
    try {
      const res = await fetch("/api/admin/data/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setToast({ message: "Project saved!", type: "success" });
        if (isNew) setTimeout(() => router.push("/admin/projects"), 900);
      } else {
        setToast({ message: "Save failed", type: "error" });
      }
    } catch { setToast({ message: "Save failed", type: "error" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="p-8 max-w-4xl">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <PageHeader
        title={isNew ? "New Project" : `Edit: ${form.client || form.title}`}
        back={{ href: "/admin/projects", label: "All Projects" }}
        action={<SaveBtn saving={saving} onClick={save} />}
      />

      <Section title="Project Info">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Client Name"><Input value={form.client} onChange={(v) => set("client", v)} placeholder="Verdant Wellness" /></Field>
          <Field label="Project Title"><Input value={form.title} onChange={(v) => set("title", v)} placeholder="Verdant Wellness — Brand Overhaul" /></Field>
          <Field label="Slug (URL path)"><Input value={form.slug} onChange={(v) => set("slug", v.toLowerCase().replace(/\s+/g, "-"))} placeholder="verdant-rebrand" /></Field>
          <Field label="Category"><Input value={form.category} onChange={(v) => set("category", v)} placeholder="Brand Strategy + Web" /></Field>
          <Field label="Year"><Input value={form.year} onChange={(v) => set("year", v)} placeholder="2024" /></Field>
          <Field label="Result Badge"><Input value={form.result} onChange={(v) => set("result", v)} placeholder="+340% organic traffic" /></Field>
        </div>
        <Field label="Banner Color">
          <div className="flex items-center gap-3">
            <input type="color" value={form.color} onChange={(e) => set("color", e.target.value)} className="w-10 h-10 rounded-lg border border-[#0A0A0F]/10 cursor-pointer" />
            <Input value={form.color} onChange={(v) => set("color", v)} placeholder="#E63327" />
          </div>
        </Field>
      </Section>

      <Section title="Tags">
        <div className="flex flex-wrap gap-2 mb-3">
          {form.tags.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 bg-[#E63327]/08 text-[#E63327] text-xs font-mono px-2.5 py-1 rounded-full">
              {t}<button onClick={() => removeTag(i)} className="hover:text-red-600">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            className={inputCls + " flex-1"} placeholder="Add tag and press Enter" />
          <Btn onClick={addTag}><Plus size={14} /></Btn>
        </div>
      </Section>

      <Section title="Short Description (work listing)">
        <Textarea value={form.description} onChange={(v) => set("description", v)} rows={3} />
      </Section>

      <Section title="Case Study — Challenge & Solution">
        <Field label="The Challenge"><Textarea value={form.challenge} onChange={(v) => set("challenge", v)} rows={4} /></Field>
        <Field label="Our Solution"><Textarea value={form.solution} onChange={(v) => set("solution", v)} rows={4} /></Field>
      </Section>

      <Section title="Results" action={
        <button onClick={addResult} className="flex items-center gap-1.5 text-xs text-[#E63327] font-mono hover:underline"><Plus size={12} /> Add</button>
      }>
        <div className="grid grid-cols-2 gap-3">
          {form.results.map((r, i) => (
            <div key={i} className="bg-[#F7F7F8] rounded-xl p-3 flex gap-2">
              <div className="flex-1 space-y-2">
                <input value={r.metric} onChange={(e) => setResult(i, "metric", e.target.value)} className={inputCls} placeholder="Metric name" />
                <input value={r.value} onChange={(e) => setResult(i, "value", e.target.value)} className={`${inputCls} font-bold text-[#E63327]`} placeholder="+340%" />
              </div>
              <button onClick={() => removeResult(i)} className="p-1.5 text-[#0A0A0F]/25 hover:text-red-500 self-start"><Trash2 size={13} /></button>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Services Delivered">
        <div className="flex flex-wrap gap-2 mb-3">
          {form.services.map((s, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 bg-[#0A0A0F]/06 text-[#0A0A0F]/60 text-xs font-mono px-2.5 py-1 rounded-full">
              {s}<button onClick={() => removeService(i)} className="hover:text-red-600">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={serviceInput} onChange={(e) => setServiceInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
            className={inputCls + " flex-1"} placeholder="Add service and press Enter" />
          <Btn onClick={addService}><Plus size={14} /></Btn>
        </div>
      </Section>

      <Section title="Our Process" action={
        <button onClick={addStep} className="flex items-center gap-1.5 text-xs text-[#E63327] font-mono hover:underline"><Plus size={12} /> Add Step</button>
      }>
        <div className="space-y-3">
          {form.process.map((p, i) => (
            <div key={i} className="bg-[#F7F7F8] rounded-xl p-4">
              <div className="flex gap-3 mb-3">
                <div className="w-16">
                  <label className="text-xs font-mono text-[#0A0A0F]/40 uppercase tracking-widest mb-1 block">Step</label>
                  <input value={p.step} onChange={(e) => setStep(i, "step", e.target.value)} className={`${inputCls} text-center font-mono`} placeholder="01" />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-mono text-[#0A0A0F]/40 uppercase tracking-widest mb-1 block">Title</label>
                  <input value={p.title} onChange={(e) => setStep(i, "title", e.target.value)} className={`${inputCls} font-semibold`} placeholder="Discovery" />
                </div>
                <button onClick={() => removeStep(i)} className="self-end p-2 text-[#0A0A0F]/25 hover:text-red-500"><Trash2 size={13} /></button>
              </div>
              <textarea value={p.desc} onChange={(e) => setStep(i, "desc", e.target.value)} rows={2}
                className={`${inputCls} resize-none`} placeholder="Step description…" />
            </div>
          ))}
        </div>
      </Section>

      <SaveBtn saving={saving} onClick={save} />
    </div>
  );
}

// ── Local UI helpers ──────────────────────────────────────────────────────────

const inputCls = "w-full border border-[#0A0A0F]/10 rounded-lg px-3 py-2 text-sm text-[#0A0A0F] bg-white focus:outline-none focus:border-[#E63327]/50 transition-colors";

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputCls} />;
}

function Textarea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={`${inputCls} resize-none`} />;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-mono text-[#0A0A0F]/40 uppercase tracking-widest mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Section({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#0A0A0F]/06 p-6 mb-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-[#0A0A0F]">{title}</h2>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Btn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="px-3 py-2 bg-[#E63327]/08 text-[#E63327] rounded-lg text-sm font-mono hover:bg-[#E63327]/15 transition-colors">
      {children}
    </button>
  );
}

function SaveBtn({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={saving} className="flex items-center gap-2 bg-[#E63327] hover:bg-[#FF5349] disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
      <Save size={14} />
      {saving ? "Saving…" : "Save Project"}
    </button>
  );
}
