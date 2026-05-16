"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderOpen, Briefcase, Users, Home, Settings, ArrowRight, Inbox } from "lucide-react";

const SECTIONS = [
  {
    label: "Leads",
    desc: "Contact form submissions from visitors",
    href: "/admin/leads",
    icon: Inbox,
    color: "#E63327",
  },
  {
    label: "Homepage",
    desc: "Hero headline, subtitle, stats",
    href: "/admin/homepage",
    icon: Home,
    color: "#E63327",
  },
  {
    label: "Projects",
    desc: "Case studies, results, process",
    href: "/admin/projects",
    icon: FolderOpen,
    color: "#E63327",
  },
  {
    label: "Services",
    desc: "Service cards, features, details",
    href: "/admin/services",
    icon: Briefcase,
    color: "#E63327",
  },
  {
    label: "About",
    desc: "Team, values, stats",
    href: "/admin/about",
    icon: Users,
    color: "#E63327",
  },
  {
    label: "Settings",
    desc: "Company info, social links, footer",
    href: "/admin/settings",
    icon: Settings,
    color: "#E63327",
  },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ projects: 0, services: 0, team: 0 });

  useEffect(() => {
    const load = async () => {
      const [pRes, sRes, aRes] = await Promise.all([
        fetch("/api/admin/data/projects"),
        fetch("/api/admin/data/services"),
        fetch("/api/admin/data/about"),
      ]);
      const [projects, services, about] = await Promise.all([
        pRes.json(),
        sRes.json(),
        aRes.json(),
      ]);
      setCounts({
        projects: Array.isArray(projects) ? projects.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        team: about?.team ? about.team.length : 0,
      });
    };
    load();
  }, []);

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-2">
          Admin Panel
        </p>
        <h1 className="text-3xl font-bold text-[#0A0A0F] tracking-tight">Dashboard</h1>
        <p className="text-[#0A0A0F]/45 mt-1">Manage all content on the BRANDD-AID website.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "Projects", val: counts.projects },
          { label: "Services", val: counts.services },
          { label: "Team Members", val: counts.team },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[#0A0A0F]/06 px-6 py-5">
            <div className="text-3xl font-bold text-[#0A0A0F] mb-1">{s.val}</div>
            <div className="text-[#0A0A0F]/45 text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <h2 className="text-sm font-semibold text-[#0A0A0F]/50 uppercase tracking-widest mb-4 font-mono">
        Edit Content
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {SECTIONS.map(({ label, desc, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group bg-white rounded-xl border border-[#0A0A0F]/06 px-6 py-5 flex items-center justify-between hover:border-[#E63327]/30 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 bg-[#E63327]/08 rounded-lg flex items-center justify-center group-hover:bg-[#E63327]/15 transition-colors">
                <Icon size={16} className="text-[#E63327]" />
              </div>
              <div>
                <div className="font-semibold text-[#0A0A0F]">{label}</div>
                <div className="text-sm text-[#0A0A0F]/45">{desc}</div>
              </div>
            </div>
            <ArrowRight size={16} className="text-[#0A0A0F]/25 group-hover:text-[#E63327] group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>

      {/* View site link */}
      <div className="mt-8 pt-6 border-t border-[#0A0A0F]/06">
        <a
          href="/"
          target="_blank"
          className="text-sm text-[#0A0A0F]/40 hover:text-[#E63327] transition-colors font-mono"
        >
          ↗ View live website
        </a>
      </div>
    </div>
  );
}
