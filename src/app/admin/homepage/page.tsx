"use client";

import { useEffect, useState } from "react";
import { Toast, type ToastState } from "../_components/Toast";
import { PageHeader } from "../_components/PageHeader";
import { Plus, Trash2, Save } from "lucide-react";

type Stat4 = { value: string; label: string };
type HomepageStat = { value: number; suffix: string; label: string; desc: string };

type HomepageData = {
  hero: { overline: string; line1: string; line2: string; line3: string; subtitle: string };
  stats: HomepageStat[];
  scene0: { label: string; line1: string; line2: string; subtitle: string };
  scene1: { label: string; line1: string; line2: string; line3: string; body: string };
  scene2: { label: string; line1: string; line2: string; line3: string; body: string; services: string[] };
  scene3: { label: string; stats: Stat4[] };
  scene4: { label: string; line1: string; line2: string; body: string; buttonText: string; email: string };
};

export default function HomepageEditor() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    fetch("/api/admin/data/homepage").then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setToast(res.ok ? { message: "Homepage saved!", type: "success" } : { message: "Save failed", type: "error" });
    } catch { setToast({ message: "Save failed", type: "error" }); }
    finally { setSaving(false); }
  };

  const set = <K extends keyof HomepageData>(key: K, val: HomepageData[K]) =>
    setData((d) => d ? { ...d, [key]: val } : d);

  const setScene = <K extends keyof HomepageData>(scene: K, field: string, val: string) =>
    setData((d) => d ? { ...d, [scene]: { ...(d[scene] as object), [field]: val } } : d);

  if (!data) return <LoadingState />;

  return (
    <div className="p-8 max-w-3xl">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <PageHeader
        title="Homepage"
        subtitle="Edit every scene of the scroll experience + stats."
        action={<SaveBtn saving={saving} onClick={save} />}
      />

      {/* ── Scene 0 — Hero ── */}
      <Section title="Scene 1 — Hero" badge="scroll: 0–20%">
        <Field label="Label (small red text above headline)">
          <Input value={data.scene0.label} onChange={(v) => setScene("scene0", "label", v)} />
        </Field>
        <Field label="Line 1 (dark)">
          <Input value={data.scene0.line1} onChange={(v) => setScene("scene0", "line1", v)} />
        </Field>
        <Field label="Line 2 (red gradient)">
          <Input value={data.scene0.line2} onChange={(v) => setScene("scene0", "line2", v)} />
        </Field>
        <Field label="Subtitle">
          <Input value={data.scene0.subtitle} onChange={(v) => setScene("scene0", "subtitle", v)} />
        </Field>
      </Section>

      {/* ── Scene 1 — Signal ── */}
      <Section title="Scene 2 — The Signal" badge="scroll: 20–44%">
        <Field label="Label">
          <Input value={data.scene1.label} onChange={(v) => setScene("scene1", "label", v)} />
        </Field>
        <Field label="Line 1 (dark)">
          <Input value={data.scene1.line1} onChange={(v) => setScene("scene1", "line1", v)} />
        </Field>
        <Field label="Line 2 (red)">
          <Input value={data.scene1.line2} onChange={(v) => setScene("scene1", "line2", v)} />
        </Field>
        <Field label="Line 3 (dark)">
          <Input value={data.scene1.line3} onChange={(v) => setScene("scene1", "line3", v)} />
        </Field>
        <Field label="Body paragraph">
          <Textarea value={data.scene1.body} onChange={(v) => setScene("scene1", "body", v)} />
        </Field>
      </Section>

      {/* ── Scene 2 — Orbit ── */}
      <Section title="Scene 3 — Growth Engine" badge="scroll: 44–64%">
        <Field label="Label">
          <Input value={data.scene2.label} onChange={(v) => setScene("scene2", "label", v)} />
        </Field>
        <Field label="Line 1 (dark)">
          <Input value={data.scene2.line1} onChange={(v) => setScene("scene2", "line1", v)} />
        </Field>
        <Field label="Line 2 (red)">
          <Input value={data.scene2.line2} onChange={(v) => setScene("scene2", "line2", v)} />
        </Field>
        <Field label="Line 3 (dark)">
          <Input value={data.scene2.line3} onChange={(v) => setScene("scene2", "line3", v)} />
        </Field>
        <Field label="Body paragraph">
          <Textarea value={data.scene2.body} onChange={(v) => setScene("scene2", "body", v)} />
        </Field>
        <Field label="Service list">
          <div className="space-y-2">
            {data.scene2.services.map((s, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-[#E63327] font-mono text-xs flex-shrink-0 pt-2.5">0{i + 1}</span>
                <input
                  value={s}
                  onChange={(e) => {
                    const svcs = [...data.scene2.services];
                    svcs[i] = e.target.value;
                    setData((d) => d ? { ...d, scene2: { ...d.scene2, services: svcs } } : d);
                  }}
                  className={inputCls + " flex-1"}
                />
                <button
                  onClick={() => {
                    const svcs = data.scene2.services.filter((_, idx) => idx !== i);
                    setData((d) => d ? { ...d, scene2: { ...d.scene2, services: svcs } } : d);
                  }}
                  className="p-2 text-[#0A0A0F]/25 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const svcs = [...data.scene2.services, "New Service"];
                setData((d) => d ? { ...d, scene2: { ...d.scene2, services: svcs } } : d);
              }}
              className="flex items-center gap-1.5 text-xs text-[#E63327] font-mono hover:underline mt-1"
            >
              <Plus size={12} /> Add service
            </button>
          </div>
        </Field>
      </Section>

      {/* ── Scene 3 — Performance ── */}
      <Section title="Scene 4 — Performance Stats" badge="scroll: 64–84%">
        <Field label="Label">
          <Input value={data.scene3.label} onChange={(v) => setScene("scene3", "label", v)} />
        </Field>
        <Field label="Stats (animated on scroll)">
          <div className="space-y-3">
            {data.scene3.stats.map((stat, i) => (
              <div key={i} className="grid grid-cols-2 gap-3 bg-[#F7F7F8] rounded-xl p-3">
                <div>
                  <label className="text-[10px] font-mono text-[#0A0A0F]/40 uppercase tracking-widest block mb-1">Value</label>
                  <input
                    value={stat.value}
                    onChange={(e) => {
                      const stats = [...data.scene3.stats];
                      stats[i] = { ...stats[i], value: e.target.value };
                      setData((d) => d ? { ...d, scene3: { ...d.scene3, stats } } : d);
                    }}
                    className={inputCls}
                    placeholder="e.g. 4×, ₹2.8Cr, 340%"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] font-mono text-[#0A0A0F]/40 uppercase tracking-widest block mb-1">Label</label>
                    <input
                      value={stat.label}
                      onChange={(e) => {
                        const stats = [...data.scene3.stats];
                        stats[i] = { ...stats[i], label: e.target.value };
                        setData((d) => d ? { ...d, scene3: { ...d.scene3, stats } } : d);
                      }}
                      className={inputCls}
                    />
                  </div>
                  <button
                    onClick={() => {
                      const stats = data.scene3.stats.filter((_, idx) => idx !== i);
                      setData((d) => d ? { ...d, scene3: { ...d.scene3, stats } } : d);
                    }}
                    className="p-2 text-[#0A0A0F]/25 hover:text-red-500 transition-colors self-end mb-0.5"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const stats = [...data.scene3.stats, { value: "0", label: "New Stat" }];
                setData((d) => d ? { ...d, scene3: { ...d.scene3, stats } } : d);
              }}
              className="flex items-center gap-1.5 text-xs text-[#E63327] font-mono hover:underline"
            >
              <Plus size={12} /> Add stat
            </button>
          </div>
        </Field>
      </Section>

      {/* ── Scene 4 — CTA ── */}
      <Section title="Scene 5 — CTA" badge="scroll: 84–100%">
        <Field label="Label">
          <Input value={data.scene4.label} onChange={(v) => setScene("scene4", "label", v)} />
        </Field>
        <Field label="Line 1 (dark)">
          <Input value={data.scene4.line1} onChange={(v) => setScene("scene4", "line1", v)} />
        </Field>
        <Field label="Line 2 (red)">
          <Input value={data.scene4.line2} onChange={(v) => setScene("scene4", "line2", v)} />
        </Field>
        <Field label="Body paragraph">
          <Textarea value={data.scene4.body} onChange={(v) => setScene("scene4", "body", v)} />
        </Field>
        <Field label="Button text">
          <Input value={data.scene4.buttonText} onChange={(v) => setScene("scene4", "buttonText", v)} />
        </Field>
        <Field label="Email (shown as link)">
          <Input value={data.scene4.email} onChange={(v) => setScene("scene4", "email", v)} />
        </Field>
      </Section>

      {/* ── Hero overline ── */}
      <Section title="Scroll-end Hero (below the 3D section)">
        <Field label="Overline">
          <Input value={data.hero.overline} onChange={(v) => set("hero", { ...data.hero, overline: v })} />
        </Field>
        <Field label="Line 1 (dark)">
          <Input value={data.hero.line1} onChange={(v) => set("hero", { ...data.hero, line1: v })} />
        </Field>
        <Field label="Line 2 (red)">
          <Input value={data.hero.line2} onChange={(v) => set("hero", { ...data.hero, line2: v })} />
        </Field>
        <Field label="Line 3 (dark)">
          <Input value={data.hero.line3} onChange={(v) => set("hero", { ...data.hero, line3: v })} />
        </Field>
        <Field label="Subtitle">
          <Textarea value={data.hero.subtitle} onChange={(v) => set("hero", { ...data.hero, subtitle: v })} rows={2} />
        </Field>
      </Section>

      {/* ── Stats ── */}
      <Section title="Stats Bar" action={
        <button
          onClick={() => set("stats", [...data.stats, { value: 0, suffix: "+", label: "New Stat", desc: "" }])}
          className="flex items-center gap-1.5 text-xs text-[#E63327] font-mono hover:underline"
        >
          <Plus size={12} /> Add
        </button>
      }>
        <div className="space-y-3">
          {data.stats.map((stat, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-start bg-[#F7F7F8] rounded-xl p-3">
              <div className="col-span-3">
                <label className="text-[10px] font-mono text-[#0A0A0F]/40 uppercase block mb-1">Number</label>
                <input type="number" value={stat.value}
                  onChange={(e) => { const s = [...data.stats]; s[i] = { ...s[i], value: Number(e.target.value) }; set("stats", s); }}
                  className={inputCls} />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-mono text-[#0A0A0F]/40 uppercase block mb-1">Suffix</label>
                <input value={stat.suffix}
                  onChange={(e) => { const s = [...data.stats]; s[i] = { ...s[i], suffix: e.target.value }; set("stats", s); }}
                  className={inputCls} />
              </div>
              <div className="col-span-4">
                <label className="text-[10px] font-mono text-[#0A0A0F]/40 uppercase block mb-1">Label</label>
                <input value={stat.label}
                  onChange={(e) => { const s = [...data.stats]; s[i] = { ...s[i], label: e.target.value }; set("stats", s); }}
                  className={inputCls} />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-mono text-[#0A0A0F]/40 uppercase block mb-1">Sub</label>
                <input value={stat.desc}
                  onChange={(e) => { const s = [...data.stats]; s[i] = { ...s[i], desc: e.target.value }; set("stats", s); }}
                  className={inputCls} />
              </div>
              <div className="col-span-1 flex items-end justify-end pb-0.5">
                <button onClick={() => set("stats", data.stats.filter((_, idx) => idx !== i))}
                  className="p-1.5 text-[#0A0A0F]/25 hover:text-red-500 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <SaveBtn saving={saving} onClick={save} />
    </div>
  );
}

// ── Shared UI ────────────────────────────────────────────────────────────────

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

function Section({ title, badge, children, action }: { title: string; badge?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#0A0A0F]/06 p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-[#0A0A0F] text-base">{title}</h2>
          {badge && <span className="text-[9px] font-mono text-[#0A0A0F]/35 bg-[#0A0A0F]/05 px-2 py-0.5 rounded-full uppercase tracking-widest">{badge}</span>}
        </div>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SaveBtn({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={saving}
      className="flex items-center gap-2 bg-[#E63327] hover:bg-[#FF5349] disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
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
