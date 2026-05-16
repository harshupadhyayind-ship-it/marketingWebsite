"use client";

import { useEffect, useState } from "react";
import { Toast, type ToastState } from "../_components/Toast";
import { PageHeader } from "../_components/PageHeader";
import { Plus, Trash2, Save } from "lucide-react";

type AboutData = {
  story: { heading: string; paragraph1: string; paragraph2: string };
  stats: { val: string; label: string }[];
  team: { name: string; role: string; bio: string; initial: string }[];
  milestones: { year: string; event: string }[];
  values: { title: string; desc: string }[];
};

export default function AboutEditor() {
  const [data, setData] = useState<AboutData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    fetch("/api/admin/data/about").then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setToast(res.ok ? { message: "About page saved!", type: "success" } : { message: "Save failed", type: "error" });
    } catch { setToast({ message: "Save failed", type: "error" }); }
    finally { setSaving(false); }
  };

  if (!data) return <LoadingState />;

  return (
    <div className="p-8 max-w-4xl">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <PageHeader
        title="About Page"
        subtitle="Story, team members, milestones and values."
        action={<SaveBtn saving={saving} onClick={save} />}
      />

      {/* Story */}
      <Section title="Our Story">
        <Field label="Section Heading">
          <Input value={data.story.heading} onChange={(v) => setData((d) => d ? { ...d, story: { ...d.story, heading: v } } : d)} />
        </Field>
        <Field label="Paragraph 1 (large text)">
          <Textarea value={data.story.paragraph1} onChange={(v) => setData((d) => d ? { ...d, story: { ...d.story, paragraph1: v } } : d)} rows={3} />
        </Field>
        <Field label="Paragraph 2 (smaller text)">
          <Textarea value={data.story.paragraph2} onChange={(v) => setData((d) => d ? { ...d, story: { ...d.story, paragraph2: v } } : d)} rows={3} />
        </Field>
      </Section>

      {/* Stats */}
      <Section title="Stats Bar" action={
        <button onClick={() => setData((d) => d ? { ...d, stats: [...d.stats, { val: "0+", label: "New Stat" }] } : d)}
          className="flex items-center gap-1.5 text-xs text-[#E63327] font-mono hover:underline">
          <Plus size={12} /> Add
        </button>
      }>
        <div className="grid grid-cols-2 gap-3">
          {data.stats.map((s, i) => (
            <div key={i} className="flex gap-2 items-center bg-[#F7F7F8] rounded-xl p-3">
              <input
                value={s.val}
                onChange={(e) => setData((d) => { if (!d) return d; const stats = [...d.stats]; stats[i] = { ...stats[i], val: e.target.value }; return { ...d, stats }; })}
                className={`${inputCls} w-20 flex-shrink-0 font-bold text-[#E63327]`}
                placeholder="120+"
              />
              <input
                value={s.label}
                onChange={(e) => setData((d) => { if (!d) return d; const stats = [...d.stats]; stats[i] = { ...stats[i], label: e.target.value }; return { ...d, stats }; })}
                className={`${inputCls} flex-1`}
                placeholder="Label"
              />
              <button onClick={() => setData((d) => d ? { ...d, stats: d.stats.filter((_, idx) => idx !== i) } : d)}
                className="p-1.5 text-[#0A0A0F]/25 hover:text-red-500 transition-colors flex-shrink-0">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section title="Team Members" action={
        <button onClick={() => setData((d) => d ? { ...d, team: [...d.team, { name: "", role: "", bio: "", initial: "?" }] } : d)}
          className="flex items-center gap-1.5 text-xs text-[#E63327] font-mono hover:underline">
          <Plus size={12} /> Add Member
        </button>
      }>
        <div className="space-y-4">
          {data.team.map((m, i) => (
            <div key={i} className="bg-[#F7F7F8] rounded-xl p-4 space-y-3">
              <div className="flex gap-3">
                <div className="w-12">
                  <label className="label-xs">Initial</label>
                  <input
                    value={m.initial}
                    maxLength={1}
                    onChange={(e) => setData((d) => { if (!d) return d; const team = [...d.team]; team[i] = { ...team[i], initial: e.target.value }; return { ...d, team }; })}
                    className={`${inputCls} text-center font-bold text-[#E63327]`}
                  />
                </div>
                <div className="flex-1">
                  <label className="label-xs">Full Name</label>
                  <input
                    value={m.name}
                    onChange={(e) => setData((d) => { if (!d) return d; const team = [...d.team]; team[i] = { ...team[i], name: e.target.value }; return { ...d, team }; })}
                    className={inputCls}
                  />
                </div>
                <div className="flex-1">
                  <label className="label-xs">Role / Title</label>
                  <input
                    value={m.role}
                    onChange={(e) => setData((d) => { if (!d) return d; const team = [...d.team]; team[i] = { ...team[i], role: e.target.value }; return { ...d, team }; })}
                    className={inputCls}
                  />
                </div>
                <button onClick={() => setData((d) => d ? { ...d, team: d.team.filter((_, idx) => idx !== i) } : d)}
                  className="self-end p-2 text-[#0A0A0F]/25 hover:text-red-500 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
              <div>
                <label className="label-xs">Bio</label>
                <textarea
                  value={m.bio}
                  rows={2}
                  onChange={(e) => setData((d) => { if (!d) return d; const team = [...d.team]; team[i] = { ...team[i], bio: e.target.value }; return { ...d, team }; })}
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Milestones */}
      <Section title="Company Milestones" action={
        <button onClick={() => setData((d) => d ? { ...d, milestones: [...d.milestones, { year: "2025", event: "" }] } : d)}
          className="flex items-center gap-1.5 text-xs text-[#E63327] font-mono hover:underline">
          <Plus size={12} /> Add
        </button>
      }>
        <div className="space-y-2">
          {data.milestones.map((m, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={m.year}
                onChange={(e) => setData((d) => { if (!d) return d; const milestones = [...d.milestones]; milestones[i] = { ...milestones[i], year: e.target.value }; return { ...d, milestones }; })}
                className={`${inputCls} w-20 flex-shrink-0 font-mono`}
                placeholder="2024"
              />
              <input
                value={m.event}
                onChange={(e) => setData((d) => { if (!d) return d; const milestones = [...d.milestones]; milestones[i] = { ...milestones[i], event: e.target.value }; return { ...d, milestones }; })}
                className={`${inputCls} flex-1`}
                placeholder="Milestone description"
              />
              <button onClick={() => setData((d) => d ? { ...d, milestones: d.milestones.filter((_, idx) => idx !== i) } : d)}
                className="p-2 text-[#0A0A0F]/25 hover:text-red-500 transition-colors flex-shrink-0">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section title="Our Values" action={
        <button onClick={() => setData((d) => d ? { ...d, values: [...d.values, { title: "", desc: "" }] } : d)}
          className="flex items-center gap-1.5 text-xs text-[#E63327] font-mono hover:underline">
          <Plus size={12} /> Add Value
        </button>
      }>
        <div className="grid grid-cols-2 gap-3">
          {data.values.map((v, i) => (
            <div key={i} className="bg-[#F7F7F8] rounded-xl p-4 space-y-2">
              <div className="flex gap-2">
                <input
                  value={v.title}
                  onChange={(e) => setData((d) => { if (!d) return d; const values = [...d.values]; values[i] = { ...values[i], title: e.target.value }; return { ...d, values }; })}
                  className={`${inputCls} flex-1 font-semibold`}
                  placeholder="Value title"
                />
                <button onClick={() => setData((d) => d ? { ...d, values: d.values.filter((_, idx) => idx !== i) } : d)}
                  className="p-1.5 text-[#0A0A0F]/25 hover:text-red-500 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
              <textarea
                value={v.desc}
                rows={2}
                onChange={(e) => setData((d) => { if (!d) return d; const values = [...d.values]; values[i] = { ...values[i], desc: e.target.value }; return { ...d, values }; })}
                className={`${inputCls} resize-none`}
                placeholder="Description"
              />
            </div>
          ))}
        </div>
      </Section>

      <SaveBtn saving={saving} onClick={save} />
    </div>
  );
}

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
    <div className="bg-white rounded-2xl border border-[#0A0A0F]/06 p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-[#0A0A0F]">{title}</h2>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SaveBtn({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={saving} className="flex items-center gap-2 bg-[#E63327] hover:bg-[#FF5349] disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
      <Save size={14} />
      {saving ? "Saving…" : "Save Changes"}
    </button>
  );
}

function LoadingState() {
  return (
    <div className="p-8 flex items-center gap-3 text-[#0A0A0F]/40">
      <div className="w-4 h-4 border-2 border-[#E63327]/30 border-t-[#E63327] rounded-full animate-spin" />
      Loading…
    </div>
  );
}
