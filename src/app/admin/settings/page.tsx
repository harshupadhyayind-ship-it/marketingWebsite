"use client";

import { useEffect, useState } from "react";
import { Toast, type ToastState } from "../_components/Toast";
import { PageHeader } from "../_components/PageHeader";
import { Plus, Trash2, Save } from "lucide-react";

type Settings = {
  company: { name: string; tagline: string; email: string; phone: string; location: string; year: string };
  social: { instagram: string; linkedin: string; twitter: string };
  marquee: string[];
};

export default function SettingsEditor() {
  const [data, setData] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    fetch("/api/admin/data/settings").then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setToast(res.ok ? { message: "Settings saved!", type: "success" } : { message: "Save failed", type: "error" });
    } catch { setToast({ message: "Save failed", type: "error" }); }
    finally { setSaving(false); }
  };

  const setCompany = (k: keyof Settings["company"], v: string) =>
    setData((d) => d ? { ...d, company: { ...d.company, [k]: v } } : d);

  const setSocial = (k: keyof Settings["social"], v: string) =>
    setData((d) => d ? { ...d, social: { ...d.social, [k]: v } } : d);

  const setMarquee = (i: number, v: string) =>
    setData((d) => { if (!d) return d; const m = [...d.marquee]; m[i] = v; return { ...d, marquee: m }; });

  const addMarquee = () =>
    setData((d) => d ? { ...d, marquee: [...d.marquee, "New Item"] } : d);

  const removeMarquee = (i: number) =>
    setData((d) => d ? { ...d, marquee: d.marquee.filter((_, idx) => idx !== i) } : d);

  if (!data) return <LoadingState />;

  return (
    <div className="p-8 max-w-3xl">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <PageHeader
        title="Site Settings"
        subtitle="Company info, social links, and marquee text."
        action={<SaveBtn saving={saving} onClick={save} />}
      />

      {/* Company Info */}
      <Section title="Company Information">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Name">
            <Input value={data.company.name} onChange={(v) => setCompany("name", v)} />
          </Field>
          <Field label="Tagline">
            <Input value={data.company.tagline} onChange={(v) => setCompany("tagline", v)} />
          </Field>
          <Field label="Email">
            <Input value={data.company.email} onChange={(v) => setCompany("email", v)} />
          </Field>
          <Field label="Phone">
            <Input value={data.company.phone} onChange={(v) => setCompany("phone", v)} />
          </Field>
          <Field label="Location">
            <Input value={data.company.location} onChange={(v) => setCompany("location", v)} />
          </Field>
          <Field label="Year (shown in footer)">
            <Input value={data.company.year} onChange={(v) => setCompany("year", v)} />
          </Field>
        </div>
      </Section>

      {/* Social Links */}
      <Section title="Social Links">
        <Field label="Instagram URL">
          <Input value={data.social.instagram} onChange={(v) => setSocial("instagram", v)} />
        </Field>
        <Field label="LinkedIn URL">
          <Input value={data.social.linkedin} onChange={(v) => setSocial("linkedin", v)} />
        </Field>
        <Field label="Twitter / X URL">
          <Input value={data.social.twitter} onChange={(v) => setSocial("twitter", v)} />
        </Field>
      </Section>

      {/* Marquee Items */}
      <Section
        title="Marquee Strip Items"
        action={
          <button onClick={addMarquee} className="flex items-center gap-1.5 text-xs text-[#E63327] font-mono hover:underline">
            <Plus size={12} /> Add Item
          </button>
        }
      >
        <div className="space-y-2">
          {data.marquee.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={item}
                onChange={(e) => setMarquee(i, e.target.value)}
                className={inputCls + " flex-1"}
              />
              <button onClick={() => removeMarquee(i)} className="p-2 text-[#0A0A0F]/25 hover:text-red-500 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#0A0A0F]/35 mt-3 font-mono">These items scroll across the marquee strips on the site.</p>
      </Section>

      <SaveBtn saving={saving} onClick={save} />
    </div>
  );
}

const inputCls = "w-full border border-[#0A0A0F]/10 rounded-lg px-3 py-2 text-sm text-[#0A0A0F] bg-white focus:outline-none focus:border-[#E63327]/50 transition-colors";

function Input({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />;
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
