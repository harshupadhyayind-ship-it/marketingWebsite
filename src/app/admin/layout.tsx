"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderOpen, Briefcase, Users, Home, Settings, LogOut, Inbox, Menu, X } from "lucide-react";

const NAV = [
  { label: "Dashboard",  href: "/admin",          icon: LayoutDashboard },
  { label: "Leads",      href: "/admin/leads",     icon: Inbox },
  { label: "Homepage",   href: "/admin/homepage",  icon: Home },
  { label: "Projects",   href: "/admin/projects",  icon: FolderOpen },
  { label: "Services",   href: "/admin/services",  icon: Briefcase },
  { label: "About",      href: "/admin/about",     icon: Users },
  { label: "Settings",   href: "/admin/settings",  icon: Settings },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5">
      {NAV.map(({ label, href, icon: Icon }) => {
        const active = href === "/admin"
          ? pathname === "/admin"
          : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
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
  );
}

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/06">
        <Link href="/admin" onClick={onNavigate} className="flex items-center gap-2.5">
          <Image src="/logo.svg" alt="BRANDD-AID" width={32} height={32} className="rounded-sm flex-shrink-0" />
          <div>
            <div className="font-black text-white text-sm tracking-[0.05em] leading-none">
              BRANDD<span className="text-[#E63327]">-AID</span>
            </div>
            <div className="text-white/30 text-[8px] font-mono uppercase tracking-[0.2em] mt-0.5">CMS</div>
          </div>
        </Link>
      </div>

      <NavLinks pathname={pathname} onNavigate={onNavigate} />

      {/* Footer */}
      <div className="px-3 pb-5 space-y-1 border-t border-white/06 pt-4">
        <Link
          href="/"
          target="_blank"
          onClick={onNavigate}
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
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#F7F7F8]">

      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex w-56 flex-shrink-0 bg-[#0A0A0F] flex-col min-h-screen sticky top-0">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#0A0A0F] flex items-center justify-between px-4 border-b border-white/06">
        <Link href="/admin" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="BRANDD-AID" width={26} height={26} className="rounded-sm flex-shrink-0" />
          <div className="font-black text-white text-sm tracking-[0.05em] leading-none">
            BRANDD<span className="text-[#E63327]">-AID</span>
            <span className="text-white/30 text-[8px] font-mono uppercase tracking-[0.2em] ml-1.5">CMS</span>
          </div>
        </Link>
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 text-white/60 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ── Mobile drawer overlay ── */}
      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-64 bg-[#0A0A0F] flex flex-col transform transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/06">
          <Link href="/admin" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="BRANDD-AID" width={28} height={28} className="rounded-sm" />
            <div className="font-black text-white text-sm tracking-[0.05em] leading-none">
              BRANDD<span className="text-[#E63327]">-AID</span>
              <div className="text-white/30 text-[8px] font-mono uppercase tracking-[0.2em] mt-0.5">CMS</div>
            </div>
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1.5 text-white/40 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <SidebarContent pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-auto md:mt-0 mt-14">
        {children}
      </main>
    </div>
  );
}
