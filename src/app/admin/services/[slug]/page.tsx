"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Toast, type ToastState } from "../../_components/Toast";
import { PageHeader } from "../../_components/PageHeader";
import { Plus, Trash2, Save } from "lucide-react";

type Service = {
  num: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  slug: string;
  deliveryTime: string;
  features: string[];
};

const blank: Service = {
  num: "",
  title: "",
  tagline: "",
  description: "",
  tags: [],
  slug: "",
  deliveryTime: "",
  features: [],
};

export default function ServiceEditor() {
  const { slug } = useParams<{ slug: string }>();
  const isNew = slug === "new";
  const router = useRouter();

  const [allServices, setAllServices] = useState<Service[]>([]);
  const [form, setForm] = useState<Service>(blank);
  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    fetch("/api/admin/data/services")
      .then((r) => r.json())
      .then((services: Service[]) => {
        setAllServices(services);
        if (!isNew) {
          const found = services.find((s) => s.slug === slug);
          if (found) setForm(found);
        }
        setLoading(false);
      });
  }, [slug, isNew]);

  const set = (k: keyof Service, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const addTag = () => {
    if (!tagInput.trim()) return;
    set("tags", [...form.tags, tagInput.trim()]);
    setTagInput("");
  };

  const removeTag = (i: number) => set("tags", form.tags.filter((_, idx) => idx !== i));

  const addFeature = () => {
    if (!featureInput.trim()) return;
    set("features", [...form.features, featureInput.trim()]);
    setFeatureInput("");
  };

  const removeFeature = (i: number) => set("features", form.features.filter((_, idx) => idx !== i));

  const save = async () => {
    if (!form.title || !form.slug) {
      setToast({ message: "Title and slug are required", type: "error" });
      return;
    }
    setSaving(true);
    let updated: Service[];
    if (isNew) {
      updated = [...allServices, form];
    } else {
      updated = allServices.map((s) => (s.slug === slug ? form : s));
    }
    try {
      const res = await fetch("/api/admin/data/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setToast({ message: "Service saved!", type: "success" });
        if (isNew) setTimeout(() => router.push("/admin/services"), 800);
      } else {
        setToast({ message: "Save failed", type: "error" });
      }
    } catch {
      setToast({ message: "Save failed", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="p-8 flex items-center gap-3 text-[#0A0A0F]/40">
      <div className="w-4 h-4 border-2 border-[#E63327]/30 border-t-[#E63327] rounded-full animate-spin" />
      Loading…
    </div>
  );

  return (
    <div className="p-8 max-w-3xl">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <PageHeader
        title={isNew ? "New Service" : `Edit: ${form.title}`}
        back={{ href: "/admin/services", label: "All Services" }}
        action={<SaveBtn saving={saving} onClick={save} />}
      />

      <Section title="Basic Info">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Number (e.g. 01)">
            <Input value={form.num} onChange={(v) => set("num", v)} placeholder="01" />
          </Field>
          <Field label="Slug (URL key)">
            <Input value={form.slug} onChange={(v) => set("slug", v.toLowerCase().replace(/\s+/g, "-"))} placeholder="brand-strategy" />
          </Field>
        </div>
        <Field label="Title">
          <Input value={form.title} onChange={(v) => set("title", v)} placeholder="Brand Strategy" />
        </Field>
        <Field label="Tagline (one-liner)">
          <Input value={form.tagline} onChange={(v) => set("tagline", v)} placeholder="Position your brand to lead." />
        </Field>
        <Field label="Delivery Time">
          <Input value={form.deliveryTime} onChange={(v) => set("deliveryTime", v)} placeholder="3–4 weeks" />
        </Field>
      </Section>

      <Section title="Description">
        <Textarea value={form.description} onChange={(v) => set("description", v)} rows={5} />
      </Section>

      <Section title="Tags (shown in service list)">
        <div className="flex flex-wrap gap-2 mb-3">
          {form.tags.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 bg-[#E63327]/08 text-[#E63327] text-xs font-mono px-2.5 py-1 rounded-full">
              {t}
              <button onClick={() => removeTag(i)} className="hover:text-red-600">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            className={inputCls + " flex-1"}
            placeholder="Add tag and press Enter"
          />
          <button onClick={addTag} className="px-3 py-2 bg-[#E63327]/08 text-[#E63327] rounded-lg text-sm font-mono hover:bg-[#E63327]/15 transition-colors">
            <Plus size={14} />
          </button>
        </div>
      </Section>

      <Section title="Features / Deliverables">
        <div className="space-y-2 mb-3">
          {form.features.map((f, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="text-[#E63327] font-mono text-xs w-4 flex-shrink-0">—</span>
              <input
                value={f}
                onChange={(e) => {
                  const features = [...form.features];
                  features[i] = e.target.value;
                  set("features", features);
                }}
                className={`${inputCls} flex-1`}
              />
              <button onClick={() => removeFeature(i)} className="p-1.5 text-[#0A0A0F]/25 hover:text-red-500 transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
            className={`${inputCls} flex-1`}
            placeholder="Add a feature/deliverable and press Enter"
          />
          <button onClick={addFeature} className="px-3 py-2 bg-[#E63327]/08 text-[#E63327] rounded-lg text-sm font-mono hover:bg-[#E63327]/15 transition-colors">
            <Plus size={14} />
          </button>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#0A0A0F]/06 p-6 mb-5">
      <h2 className="font-semibold text-[#0A0A0F] mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SaveBtn({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={saving} className="flex items-center gap-2 bg-[#E63327] hover:bg-[#FF5349] disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
      <Save size={14} />
      {saving ? "Saving…" : "Save Service"}
    </button>
  );
}
