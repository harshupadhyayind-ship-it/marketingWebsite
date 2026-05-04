"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "services", href: "/services" },
  { label: "work", href: "/work" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "instagram", href: "https://instagram.com" },
  { label: "linkedin", href: "https://linkedin.com" },
  { label: "twitter", href: "https://twitter.com" },
];

// Hover background colours — light palette for cream panel
const BG_MAP: Record<string, string> = {
  services: "#9CAF88",   // sage green
  work:     "#D4CAB8",   // warm stone
  about:    "#B8C9A8",   // soft sage
  contact:  "#E8E0D0",   // pale cream
  instagram:"#C4B89A",   // golden
  linkedin: "#D4CAB8",
  twitter:  "#B8C9A8",
};

const DRAWER_WIDTH = "20rem"; // 320px

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (open) window.scrollTo({ top: 0, behavior: "instant" });
    document.body.classList.toggle("nav-open", open);
    return () => { document.body.classList.remove("nav-open"); };
  }, [open]);

  // Close on scroll attempt (overflow:hidden blocks scroll, so listen to wheel/touch)
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("wheel", close, { passive: true });
    window.addEventListener("touchmove", close, { passive: true });
    return () => {
      window.removeEventListener("wheel", close);
      window.removeEventListener("touchmove", close);
    };
  }, [open]);

  // Close via custom event dispatched from the × inside the dark card
  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("navClose", handler);
    return () => window.removeEventListener("navClose", handler);
  }, []);

  const activeBg = hovered ? BG_MAP[hovered] : "#F5F1E8";

  return (
    <>
      {/* ── Corner trigger (always visible) ── */}
      <div
        className="fixed top-0 right-0 z-50 flex flex-col items-end px-6 pt-5 select-none"
        style={{ mixBlendMode: "normal" }}
      >
        <button
          onClick={() => setOpen(true)}
          className="flex items-baseline gap-1.5 group"
          aria-label="Open menu"
        >
          <span className="text-[#9CAF88]/70 text-[10px] font-mono leading-none">(08)</span>
          <span className="text-white font-bold text-4xl leading-none tracking-tight group-hover:text-[#9CAF88] transition-colors duration-200">
            menu
          </span>
        </button>

        <Link href="/contact" className="flex items-baseline gap-1.5 group mt-0.5">
          <span className="text-[#9CAF88]/70 text-[10px] font-mono leading-none">(01)</span>
          <span className="text-white/60 text-sm font-medium leading-snug group-hover:text-white transition-colors duration-200">
            contact
          </span>
        </Link>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-baseline gap-1.5 group mt-0.5"
        >
          <span className="text-[#9CAF88]/70 text-[10px] font-mono leading-none">(01)</span>
          <span className="text-white/60 text-sm font-medium leading-snug group-hover:text-white transition-colors duration-200">
            instagram
          </span>
        </a>
      </div>


      {/* ── Left drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 bottom-0 z-50 overflow-hidden"
            style={{ width: DRAWER_WIDTH }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0"
              animate={{ backgroundColor: activeBg }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Panel content */}
            <div className="relative z-10 h-full flex flex-col px-8 py-8">
              {/* Logo — top */}
              <Link href="/" onClick={() => setOpen(false)}>
                <span className="font-heading font-bold text-sm tracking-tight text-[#0D0B08]/80">
                  Chrono<span className="text-[#9CAF88]">Growth</span>
                </span>
              </Link>

              {/* Nav links — vertically centered */}
              <nav className="flex flex-col gap-0 flex-1 justify-center">
                {NAV_LINKS.map((link, i) => (
                  <NavItem
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    active={pathname === link.href}
                    onHover={setHovered}
                    onClick={() => setOpen(false)}
                    delay={i * 0.04}
                  />
                ))}

                <div className="my-4 border-t border-[#0D0B08]/10" />

                {SOCIAL_LINKS.map((link, i) => (
                  <NavItem
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    external
                    small
                    onHover={setHovered}
                    onClick={() => setOpen(false)}
                    delay={(NAV_LINKS.length + i) * 0.04}
                  />
                ))}
              </nav>

              {/* Footer — bottom */}
              <p className="text-[#0D0B08]/30 text-[10px] font-mono uppercase tracking-widest">
                Mumbai · India · 2025
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}

function NavItem({
  label, href, active, external, small, onHover, onClick, delay = 0,
}: {
  label: string;
  href: string;
  active?: boolean;
  external?: boolean;
  small?: boolean;
  onHover: (v: string | null) => void;
  onClick: () => void;
  delay?: number;
}) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center justify-between py-0.5 border-b border-[#0D0B08]/10 group cursor-pointer ${
        small ? "py-1" : "py-1.5"
      }`}
      onHoverStart={() => onHover(label)}
      onHoverEnd={() => onHover(null)}
    >
      <motion.span
        className={`font-bold leading-tight tracking-tight text-[#0D0B08] ${
          small ? "text-xl" : "text-[2.25rem]"
        } ${active ? "text-[#9CAF88]" : ""}`}
        whileHover={{ x: 8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {label}
      </motion.span>
      <motion.span
        className="text-[#0D0B08]/30 text-xs font-mono"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        →
      </motion.span>
    </motion.div>
  );

  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>{inner}</a>;
  }
  return <Link href={href} onClick={onClick}>{inner}</Link>;
}
