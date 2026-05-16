"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Inbox, Trash2, Mail, Building2, DollarSign, Calendar, RefreshCw, Loader2 } from "lucide-react";
import { Toast, type ToastState } from "../_components/Toast";
import { PageHeader } from "../_components/PageHeader";

type Lead = {
  _id: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
  status: "new" | "contacted" | "converted" | "archived";
  createdAt: string;
};

type Counts = { all: number; new: number; contacted: number; converted: number; archived: number };

const STATUS_CONFIG = {
  new:       { label: "New",       color: "#E63327", bg: "rgba(230,51,39,0.1)"  },
  contacted: { label: "Contacted", color: "#D97706", bg: "rgba(217,119,6,0.1)"  },
  converted: { label: "Converted", color: "#059669", bg: "rgba(5,150,105,0.1)"  },
  archived:  { label: "Archived",  color: "#6B7280", bg: "rgba(107,114,128,0.1)" },
};

const ALL_STATUSES = Object.keys(STATUS_CONFIG) as Lead["status"][];

// ── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status, onChange }: { status: Lead["status"]; onChange: (s: Lead["status"]) => void }) {
  const [open, setOpen] = useState(false);
  const cfg = STATUS_CONFIG[status];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium cursor-pointer"
        style={{ background: cfg.bg, color: cfg.color }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
        {cfg.label}
        <span className="opacity-60 ml-0.5">▾</span>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 z-20 bg-white rounded-xl border border-[#0A0A0F]/08 shadow-lg overflow-hidden min-w-[130px]">
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => { onChange(s); setOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-mono hover:bg-[#F7F7F8] transition-colors text-left"
              style={{ color: STATUS_CONFIG[s].color }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: STATUS_CONFIG[s].color }} />
              {STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Lead card ─────────────────────────────────────────────────────────────────
function LeadCard({ lead, onStatusChange, onDelete }: {
  lead: Lead;
  onStatusChange: (id: string, status: Lead["status"]) => void;
  onDelete: (id: string) => void;
}) {
  const date = new Date(lead.createdAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
  const time = new Date(lead.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-2xl border border-[#0A0A0F]/06 overflow-hidden hover:shadow-sm transition-shadow">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 flex items-center justify-between gap-3 border-b border-[#0A0A0F]/06">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-[#E63327]/10 flex items-center justify-center flex-shrink-0 font-bold text-[#E63327] text-sm">
            {lead.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-[#0A0A0F] truncate">{lead.name}</div>
            <a href={`mailto:${lead.email}`} className="text-xs text-[#0A0A0F]/45 hover:text-[#E63327] transition-colors font-mono truncate block">
              {lead.email}
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <StatusBadge status={lead.status} onChange={(s) => onStatusChange(lead._id, s)} />
          <button
            onClick={() => onDelete(lead._id)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#0A0A0F]/25 hover:text-[#E63327] hover:bg-[#E63327]/06 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Meta row */}
      <div className="px-4 md:px-6 py-3 flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 border-b border-[#0A0A0F]/06 bg-[#F7F7F8]/50">
        {lead.company && (
          <div className="flex items-center gap-1.5 text-xs text-[#0A0A0F]/50">
            <Building2 size={11} /> {lead.company}
          </div>
        )}
        {lead.budget && (
          <div className="flex items-center gap-1.5 text-xs text-[#0A0A0F]/50">
            <DollarSign size={11} /> {lead.budget}
          </div>
        )}
        <div className="flex items-center gap-1.5 text-xs text-[#0A0A0F]/40">
          <Calendar size={11} /> {date} · {time}
        </div>
      </div>

      {/* Message */}
      <div className="px-4 md:px-6 py-4">
        <p className="text-sm text-[#0A0A0F]/65 leading-relaxed whitespace-pre-wrap">{lead.message}</p>
      </div>

      {/* Actions */}
      <div className="px-4 md:px-6 pb-4">
        <a
          href={`mailto:${lead.email}?subject=Re: Your enquiry to BRANDD-AID`}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E63327] hover:underline"
        >
          <Mail size={11} /> Reply via email
        </a>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function LeadsPage() {
  const [leads, setLeads]       = useState<Lead[]>([]);
  const [counts, setCounts]     = useState<Counts>({ all: 0, new: 0, contacted: 0, converted: 0, archived: 0 });
  const [filter, setFilter]     = useState<Lead["status"] | "all">("all");
  const [page, setPage]         = useState(1);
  const [hasMore, setHasMore]   = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [toast, setToast]       = useState<ToastState>(null);
  const sentinelRef             = useRef<HTMLDivElement>(null);
  const filterRef               = useRef(filter);
  filterRef.current = filter;

  // Fetch one page of leads
  const fetchPage = useCallback(async (pageNum: number, status: Lead["status"] | "all", replace: boolean) => {
    if (pageNum === 1) setInitialLoad(true); else setLoadingMore(true);
    try {
      const res = await fetch(`/api/admin/leads?page=${pageNum}&status=${status}`);
      const data = await res.json();
      setLeads((prev) => replace ? data.leads : [...prev, ...data.leads]);
      setHasMore(data.hasMore);
      setPage(pageNum);
    } finally {
      setInitialLoad(false);
      setLoadingMore(false);
    }
  }, []);

  // Fetch counts separately (always unfiltered)
  const fetchCounts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/leads?counts=1");
      const data = await res.json();
      setCounts(data);
    } catch { /* silent */ }
  }, []);

  // Initial load + counts
  useEffect(() => {
    fetchPage(1, filter, true);
    fetchCounts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-fetch when filter changes
  useEffect(() => {
    fetchPage(1, filter, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // IntersectionObserver — fires when sentinel enters viewport
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && !initialLoad) {
          setHasMore((more) => {
            if (more) {
              setPage((p) => {
                const next = p + 1;
                fetchPage(next, filterRef.current, false);
                return next;
              });
            }
            return more;
          });
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadingMore, initialLoad, fetchPage]);

  const handleStatusChange = async (id: string, status: Lead["status"]) => {
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
    const res = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) fetchCounts();
    setToast(res.ok
      ? { message: "Status updated", type: "success" }
      : { message: "Update failed", type: "error" }
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    setLeads((prev) => prev.filter((l) => l._id !== id));
    const res = await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchCounts();
    setToast(res.ok
      ? { message: "Lead deleted", type: "success" }
      : { message: "Delete failed", type: "error" }
    );
  };

  const handleRefresh = () => {
    fetchPage(1, filter, true);
    fetchCounts();
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <PageHeader
        title="Contact Leads"
        subtitle="All enquiries submitted through the contact form."
        action={
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 text-sm text-[#0A0A0F]/50 hover:text-[#0A0A0F] transition-colors font-mono"
          >
            <RefreshCw size={13} className={initialLoad ? "animate-spin" : ""} />
            Refresh
          </button>
        }
      />

      {/* Summary counts */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 md:gap-3 mb-6 md:mb-8">
        {(["all", "new", "contacted", "converted", "archived"] as const).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-xl border px-3 md:px-4 py-3 text-left transition-all ${
              filter === key
                ? "bg-[#E63327] border-[#E63327] text-white"
                : "bg-white border-[#0A0A0F]/06 text-[#0A0A0F] hover:border-[#E63327]/30"
            }`}
          >
            <div className="text-xl md:text-2xl font-bold leading-none mb-1">{counts[key]}</div>
            <div className={`text-[10px] md:text-xs font-mono capitalize ${filter === key ? "text-white/70" : "text-[#0A0A0F]/40"}`}>
              {key === "all" ? "Total" : key}
            </div>
          </button>
        ))}
      </div>

      {/* Lead list */}
      {initialLoad ? (
        <div className="flex items-center gap-3 text-[#0A0A0F]/40 py-20 justify-center">
          <div className="w-5 h-5 border-2 border-[#E63327]/30 border-t-[#E63327] rounded-full animate-spin" />
          Loading leads…
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center py-24 text-[#0A0A0F]/30">
          <Inbox size={40} className="mx-auto mb-4 opacity-30" />
          <p className="font-mono text-sm">No leads yet.</p>
          <p className="text-xs mt-1">They&apos;ll appear here when someone submits the contact form.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {leads.map((lead) => (
              <LeadCard
                key={lead._id}
                lead={lead}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Sentinel — triggers next page load when visible */}
          <div ref={sentinelRef} className="h-1" />

          {/* Loading more indicator */}
          {loadingMore && (
            <div className="flex items-center justify-center gap-2 py-8 text-[#0A0A0F]/40 text-sm">
              <Loader2 size={16} className="animate-spin text-[#E63327]" />
              Loading more…
            </div>
          )}

          {/* End of list */}
          {!hasMore && leads.length > 0 && (
            <p className="text-center text-xs font-mono text-[#0A0A0F]/25 py-8">
              — {leads.length} lead{leads.length !== 1 ? "s" : ""} total —
            </p>
          )}
        </>
      )}
    </div>
  );
}
