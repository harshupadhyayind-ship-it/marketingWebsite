"use client";

import { usePathname } from "next/navigation";
import SideNav from "@/components/layout/SideNav";
import Footer from "@/components/layout/Footer";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <SideNav />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}
