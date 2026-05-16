"use client";

import { useEffect, useState, useCallback } from "react";
import { Toast, type ToastState } from "../_components/Toast";
import { PageHeader } from "../_components/PageHeader";
import { Plus, Trash2, Save } from "lucide-react";

type HomepageData = {
  hero: { overline: string; line1: string; line2: string; line3: string; subtitle: string };
  stats: { value: number; suffix: string; label: string; desc: string }[];
};

const defaultData: HomepageData = {
  hero: { overline: "", line1: "", line2: "", line3: "", subtitle: "" },
  stats: [],
};

export default function HomepageEditor() {
  const [data, setData] = useState<HomepageData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    fetch("/api/admin/data/homepage")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setToast(res.ok ? { message: "Homepage saved!", type: "success" } : { message: "Save failed", type: "error" });
    } catch {
      setToast({ message: "Save failed", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const setHero = (key: keyof HomepageData["hero"], val: string) =>
    setData((d) => ({ ...d, hero: { ...d.hero, [key]: val } }));

  const setStat = (i: number, key: keyof HomepageData["stats"][0], val: string | number) =>
    setData((d) => {
      const stats = [...d.stats];
      stats[i] = { ...stats[i], [key]: val };
      return { ...d, stats };
    });

  const addStat = () =>
    setData((d) => ({ ...d, stats: [...d.stats, { value: 0, suffix: "+", label: "New Stat", desc: "" }] }));

  const removeStat = (i: number) =>
    setData((d) => ({ ...d, stats: d.stats.filter((_, idx) => idx !== i) }));

  if (loading) return <LoadingState />;

  return (
    <div className="p-8 max-w-3xl">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <PageHeader
        title="Homepage"
        subtitle="Edit the hero headline and stats section."
        action={
          <SaveBtn saving={saving} onClick={save} />
        }
      />

      {/* Hero section */}
      <Section title="Hero Section">
        <Field label="Overline (small text above headline)">
          <Input value={data.hero.overline} onChange={(v) => setHero("overline", v)} />
        </Field>
        <div className="grid grid-cols-1 gap-4">
          <Field label='Headline Line 1 (dark)'>
            <Input value={data.hero.line1} onChange={(v) => setHero("line1", v)} placeholder="We build brands" />
          </Field>
          <Field label="Headline Line 2 (red italic)">
            <Input value={data.hero.line2} onChange={(v) => setHero("line2", v)} placeholder="that command" />
          </Field>
          <Field label="Headline Line 3 (dark)">
            <Input value={data.hero.line3} onChange={(v) => setHero("line3", v)} placeholder="attention." />
          </Field>
        </div>
        <Field label="Subtitle paragraph">
          <Textarea value={data.hero.subtitle} onChange={(v) => setHero("subtitle", v)} rows={2} />
        </Field>
      </Section>

      {/* Stats section */}
      <Section title="Stats Section" action={
        <button onClick={addStat} className="flex items-center gap-1.5 text-xs text-[#E63327] font-mono hover:underline">
          <Plus size={12} /> Add Stat
        </button>
      }>
        <div className="space-y-4">
          {data.stats.map((stat, i) => (
            <div key={i} className="grid grid-cols-12 gap-3 items-start bg-[#F7F7F8] rounded-xl p-4">
              <div className="col-span-3">
                <label className="text-xs font-mono text-[#0A0A0F]/40 uppercase tracking-widest mb-1 block">Number</label>
                <input
                  type="number"
                  value={stat.value}
                  onChange={(e) => setStat(i, "value", Number(e.target.value))}
                  className={inputCls}
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-mono text-[#0A0A0F]/40 uppercase tracking-widest mb-1 block">Suffix</label>
                <input value={stat.suffix} onChange={(e) => setStat(i, "suffix", e.target.value)} className={inputCls} />
              </div>
              <div className="col-span-4">
                <label className="text-xs font-mono text-[#0A0A0F]/40 uppercase tracking-widest mb-1 block">Label</label>
                <input value={stat.label} onChange={(e) => setStat(i, "label", e.target.value)} className={inputCls} />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-mono text-[#0A0A0F]/40 uppercase tracking-widest mb-1 block">Sub-label</label>
                <input value={stat.desc} onChange={(e) => setStat(i, "desc", e.target.value)} className={inputCls} />
              </div>
              <div className="col-span-1 flex items-end justify-end pb-0.5">
                <button onClick={() => removeStat(i)} className="p-1.5 text-[#0A0A0F]/25 hover:text-red-500 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="mt-6">
        <SaveBtn saving={saving} onClick={save} />
      </div>
    </div>
  );
}

// ── Shared UI helpers ────────────────────────────────────────────────────────

const inputCls = "w-full border border-[#0A0A0F]/10 rounded-lg px-3 py-2 text-sm text-[#0A0A0F] bg-white focus:outline-none focus:border-[#E63327]/50 transition-colors";

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputCls}
    />
  );
}

function Textarea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className={`${inputCls} resize-none`}
    />
  );
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
        <h2 className="font-semibold text-[#0A0A0F] text-base">{title}</h2>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SaveBtn({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="flex items-center gap-2 bg-[#E63327] hover:bg-[#FF5349] disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
    >
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
