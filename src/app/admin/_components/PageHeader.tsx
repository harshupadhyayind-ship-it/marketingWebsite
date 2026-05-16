"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function PageHeader({
  title,
  subtitle,
  back,
  action,
}: {
  title: string;
  subtitle?: string;
  back?: { href: string; label: string };
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6 md:mb-8">
      <div>
        {back && (
          <Link
            href={back.href}
            className="inline-flex items-center gap-1.5 text-sm text-[#0A0A0F]/40 hover:text-[#E63327] mb-3 transition-colors font-mono"
          >
            <ArrowLeft size={13} />
            {back.label}
          </Link>
        )}
        <h1 className="text-xl md:text-2xl font-bold text-[#0A0A0F] tracking-tight">{title}</h1>
        {subtitle && <p className="text-[#0A0A0F]/45 text-sm mt-1">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
