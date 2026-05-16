"use client";

import { useEffect, useState } from "react";
import { Toast, type ToastState } from "../_components/Toast";
import { PageHeader } from "../_components/PageHeader";
import { Plus, Trash2, Save } from "lucide-react";

type SectionTextBlock = {
  label: string;
  heading1: string;
  heading2: string;
  subtitle?: string;
};

type ContactSectionText = SectionTextBlock & { responseTime: string };

type Settings = {
  company: { name: string; tagline: string; email: string; phone: string; location: string; year: string };
  social: { instagram: string; linkedin: string; twitter: string };
  contactSection: ContactSectionText;
  workSection: SectionTextBlock;
  servicesSection: SectionTextBlock;
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

  const setContact = (k: keyof ContactSectionText, v: string) =>
    setData((d) => d ? { ...d, contactSection: { ...d.contactSection, [k]: v } } : d);

  const setWork = (k: keyof SectionTextBlock, v: string) =>
    setData((d) => d ? { ...d, workSection: { ...d.workSection, [k]: v } } : d);

  const setServices = (k: keyof SectionTextBlock, v: string) =>
    setData((d) => d ? { ...d, servicesSection: { ...d.servicesSection, [k]: v } } : d);

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
        subtitle="Company info, social links, section text, and marquee."
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

      {/* Contact Section Text */}
      <Section title="Contact Section Text">
        <p className="text-xs text-[#0A0A0F]/35 font-mono -mt-1 mb-2">Controls the &quot;Get In Touch&quot; section heading and response time.</p>
        <Field label="Label (small uppercase text)">
          <Input value={data.contactSection.label} onChange={(v) => setContact("label", v)} />
        </Field>
        <Field label="Heading Line 1">
          <Input value={data.contactSection.heading1} onChange={(v) => setContact("heading1", v)} />
        </Field>
        <Field label="Heading Line 2 (shown in red)">
          <Input value={data.contactSection.heading2} onChange={(v) => setContact("heading2", v)} />
        </Field>
        <Field label="Response Time Text">
          <Input value={data.contactSection.responseTime} onChange={(v) => setContact("responseTime", v)} />
        </Field>
      </Section>

      {/* Work Section Text */}
      <Section title="Work Section Text">
        <p className="text-xs text-[#0A0A0F]/35 font-mono -mt-1 mb-2">Controls the &quot;Selected Work&quot; section heading and subtitle.</p>
        <Field label="Label (small uppercase text)">
          <Input value={data.workSection.label} onChange={(v) => setWork("label", v)} />
        </Field>
        <Field label="Heading Line 1">
          <Input value={data.workSection.heading1} onChange={(v) => setWork("heading1", v)} />
        </Field>
        <Field label="Heading Line 2 (shown in red)">
          <Input value={data.workSection.heading2} onChange={(v) => setWork("heading2", v)} />
        </Field>
        <Field label="Subtitle (appended after project count)">
          <Input value={data.workSection.subtitle ?? ""} onChange={(v) => setWork("subtitle", v)} />
        </Field>
      </Section>

      {/* Services Section Text */}
      <Section title="Services Section Text">
        <p className="text-xs text-[#0A0A0F]/35 font-mono -mt-1 mb-2">Controls the &quot;What We Do&quot; section heading and subtitle.</p>
        <Field label="Label (small uppercase text)">
          <Input value={data.servicesSection.label} onChange={(v) => setServices("label", v)} />
        </Field>
        <Field label="Heading Line 1">
          <Input value={data.servicesSection.heading1} onChange={(v) => setServices("heading1", v)} />
        </Field>
        <Field label="Heading Line 2 (shown in red)">
          <Input value={data.servicesSection.heading2} onChange={(v) => setServices("heading2", v)} />
        </Field>
        <Field label="Subtitle">
          <Input value={data.servicesSection.subtitle ?? ""} onChange={(v) => setServices("subtitle", v)} />
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
