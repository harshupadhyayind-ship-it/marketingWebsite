"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderOpen, Briefcase, Users, Home, Settings, LogOut, Inbox } from "lucide-react";

const NAV = [
  { label: "Dashboard",  href: "/admin",          icon: LayoutDashboard },
  { label: "Leads",      href: "/admin/leads",     icon: Inbox },
  { label: "Homepage",   href: "/admin/homepage",  icon: Home },
  { label: "Projects",   href: "/admin/projects",  icon: FolderOpen },
  { label: "Services",   href: "/admin/services",  icon: Briefcase },
  { label: "About",      href: "/admin/about",     icon: Users },
  { label: "Settings",   href: "/admin/settings",  icon: Settings },
];

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-56 flex-shrink-0 bg-[#0A0A0F] flex flex-col min-h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/06">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Image src="/logo.svg" alt="BRANDD-AID" width={32} height={32} className="rounded-sm flex-shrink-0" />
          <div>
            <div className="font-black text-white text-sm tracking-[0.05em] leading-none">
              BRANDD<span className="text-[#E63327]">-AID</span>
            </div>
            <div className="text-white/30 text-[8px] font-mono uppercase tracking-[0.2em] mt-0.5">CMS</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-[#E63327] text-white"
                  : "text-white/45 hover:text-white hover:bg-white/06"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-5 space-y-1 border-t border-white/06 pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-white/35 hover:text-white/60 transition-colors"
        >
          <Home size={14} />
          View Site
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-white/35 hover:text-[#E63327] transition-colors"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#F7F7F8]">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
