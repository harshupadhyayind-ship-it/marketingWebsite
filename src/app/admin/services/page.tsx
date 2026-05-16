"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Toast, type ToastState } from "../_components/Toast";
import { PageHeader } from "../_components/PageHeader";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";

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

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    fetch("/api/admin/data/services").then((r) => r.json()).then((d) => {
      setServices(d);
      setLoading(false);
    });
  }, []);

  const remove = async (slug: string) => {
    if (!confirm("Delete this service?")) return;
    const updated = services.filter((s) => s.slug !== slug);
    setServices(updated);
    setSaving(true);
    const res = await fetch("/api/admin/data/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setToast(res.ok ? { message: "Service deleted", type: "success" } : { message: "Error saving", type: "error" });
    setSaving(false);
  };

  if (loading) return (
    <div className="p-4 md:p-8 flex items-center gap-3 text-[#0A0A0F]/40">
      <div className="w-4 h-4 border-2 border-[#E63327]/30 border-t-[#E63327] rounded-full animate-spin" />
      Loading…
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <PageHeader
        title="Services"
        subtitle={`${services.length} services`}
        action={
          <Link
            href="/admin/services/new"
            className="flex items-center gap-2 bg-[#E63327] hover:bg-[#FF5349] text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm"
          >
            <Plus size={14} /> Add Service
          </Link>
        }
      />

      <div className="space-y-3">
        {services.map((s) => (
          <div
            key={s.slug}
            className="bg-white rounded-2xl border border-[#0A0A0F]/06 px-5 py-4 flex items-center gap-4 hover:border-[#0A0A0F]/12 transition-colors"
          >
            <GripVertical size={16} className="text-[#0A0A0F]/20 flex-shrink-0" />
            <div className="w-8 h-8 flex items-center justify-center bg-[#E63327]/08 rounded-lg flex-shrink-0">
              <span className="text-[#E63327] font-mono text-xs font-bold">{s.num}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[#0A0A0F]">{s.title}</div>
              <div className="text-sm text-[#0A0A0F]/45 truncate">{s.tagline}</div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#0A0A0F]/35 font-mono flex-shrink-0 hidden sm:flex">
              {s.deliveryTime}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link
                href={`/admin/services/${s.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#0A0A0F]/10 rounded-lg text-sm text-[#0A0A0F]/60 hover:border-[#E63327]/40 hover:text-[#E63327] transition-all"
              >
                <Pencil size={12} /> Edit
              </Link>
              <button
                onClick={() => remove(s.slug)}
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
