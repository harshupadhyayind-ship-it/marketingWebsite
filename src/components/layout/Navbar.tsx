"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",     href: "/",        index: "01" },
  { label: "Services", href: "/services", index: "02" },
  { label: "Work",     href: "/work",     index: "03" },
  { label: "About",    href: "/about",    index: "04" },
  { label: "Contact",  href: "/contact",  index: "05" },
];

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn",  href: "https://linkedin.com"  },
  { label: "Twitter",   href: "https://twitter.com"   },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (open) window.scrollTo({ top: 0, behavior: "instant" });
    document.body.classList.toggle("nav-open", open);
    return () => { document.body.classList.remove("nav-open"); };
  }, [open]);

  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("navClose", handler);
    return () => window.removeEventListener("navClose", handler);
  }, []);

  return (
    <>
      {/* ── Trigger ── */}
      <div className="fixed top-0 right-0 z-50 flex flex-col items-end px-6 pt-5 select-none">
        <button
          onClick={() => setOpen(true)}
          className="group flex items-baseline gap-2 cursor-pointer"
          aria-label="Open menu"
        >
          <span className="text-[#E63327]/60 text-[10px] font-mono leading-none">(08)</span>
          <span className="text-[#0A0A0F] font-bold text-4xl leading-none tracking-tight group-hover:text-[#E63327] transition-colors duration-200">
            menu
          </span>
        </button>
        <Link href="/contact" className="flex items-baseline gap-1.5 group mt-0.5">
          <span className="text-[#E63327]/60 text-[10px] font-mono leading-none">(01)</span>
          <span className="text-[#0A0A0F]/50 text-sm font-medium group-hover:text-[#0A0A0F] transition-colors duration-200">contact</span>
        </Link>
      </div>

      {/* ── Full-screen overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: "#FFFFFF" }}
          >
            {/* Red scan line at top */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 left-0 right-0 h-[2px] bg-[#E63327] origin-left"
            />

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-6 text-[#0A0A0F]/45 hover:text-[#E63327] transition-colors duration-200 cursor-pointer z-10"
              style={{ fontSize: "2.8rem", lineHeight: 1, fontWeight: 200 }}
              aria-label="Close menu"
            >
              ×
            </button>

            {/* Logo mark top-left */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="absolute top-4 left-6"
            >
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 group">
                <Image
                  src="/logo.svg"
                  alt="BRANDD-AID logo"
                  width={44}
                  height={44}
                  className="rounded-sm flex-shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-black text-[#0A0A0F] text-lg leading-none tracking-[0.06em]">
                    BRANDD<span className="text-[#E63327]">-AID</span>
                  </span>
                  <span className="text-[#0A0A0F]/35 text-[8px] font-mono uppercase tracking-[0.24em] mt-1">
                    Marketing That Elevates
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Main nav content */}
            <div className="flex flex-1 flex-col justify-between px-8 md:px-16 lg:px-24 pt-20 pb-6">
              <nav className="flex flex-col justify-between flex-1">
                {NAV_LINKS.map((link, i) => (
                  <NavLink
                    key={link.href}
                    {...link}
                    active={pathname === link.href}
                    delay={0.15 + i * 0.07}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </nav>
            </div>

            {/* Footer row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-end justify-between px-8 md:px-16 lg:px-24 pb-8"
            >
              <p className="text-[#0A0A0F]/25 text-[10px] font-mono uppercase tracking-[0.2em]">
                Mumbai · India · 2025
              </p>
              <div className="flex items-center gap-6">
                {SOCIAL.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0A0A0F]/35 text-xs font-mono uppercase tracking-widest hover:text-[#E63327] transition-colors duration-200"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const NAV_DESCRIPTIONS: Record<string, string> = {
  "/":         "Start here",
  "/services": "Brand · Performance · Web",
  "/work":     "120+ projects",
  "/about":    "Our story",
  "/contact":  "Let's talk",
};

function NavLink({
  label, href, index, active, delay, onClick,
}: {
  label: string; href: string; index: string;
  active?: boolean; delay: number; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href} onClick={onClick} className="flex-1 flex items-center border-b border-[#0A0A0F]/08 last:border-b-0">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex items-center justify-between group cursor-pointer py-2"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        {/* Left: index + label */}
        <div className="flex items-center gap-6">
          <span className="text-[#E63327] font-mono text-xs leading-none flex-shrink-0 w-6 opacity-70">
            {index}
          </span>

          {/* Roll-up label */}
          <div className="relative overflow-hidden">
            <motion.span
              animate={{ y: hovered ? "-100%" : "0%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="block font-bold text-[#0A0A0F] leading-none"
              style={{ fontSize: "clamp(2.2rem, 7vh, 5.5rem)", letterSpacing: "-0.04em" }}
            >
              {label}
            </motion.span>
            <motion.span
              animate={{ y: hovered ? "0%" : "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 block font-bold text-[#E63327] leading-none"
              style={{ fontSize: "clamp(2.2rem, 7vh, 5.5rem)", letterSpacing: "-0.04em" }}
            >
              {label}
            </motion.span>
          </div>

          {/* Active indicator */}
          {active && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#E63327] flex-shrink-0" />
          )}
        </div>

        {/* Right: description + arrow */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
            transition={{ duration: 0.2 }}
            className="text-[#0A0A0F]/35 text-xs font-mono uppercase tracking-widest hidden md:block"
          >
            {NAV_DESCRIPTIONS[href]}
          </motion.span>
          <motion.span
            animate={{ opacity: hovered ? 1 : 0.15, x: hovered ? 0 : -6 }}
            transition={{ duration: 0.25 }}
            className="text-[#E63327] text-lg font-light"
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}
