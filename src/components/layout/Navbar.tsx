"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import settingsData from "@/data/settings.json";

const NAV_LINKS = [
  { label: "Home",     href: "/",         anchor: "",         index: "01" },
  { label: "Services", href: "/#services", anchor: "services", index: "02" },
  { label: "Work",     href: "/#work",     anchor: "work",     index: "03" },
  { label: "About",    href: "/#about",    anchor: "about",         index: "04" },
  { label: "Contact",  href: "/#contact",  anchor: "contact",  index: "05" },
];

const SOCIAL = [
  { label: "Instagram", href: settingsData.social.instagram },
  { label: "LinkedIn",  href: settingsData.social.linkedin  },
  { label: "Twitter",   href: settingsData.social.twitter   },
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
          <span className="text-[#D64545]/60 text-[10px] font-mono leading-none">(08)</span>
          <span className="text-[#1C1C1C] font-bold text-4xl leading-none tracking-tight group-hover:text-[#D64545] transition-colors duration-200">
            menu
          </span>
        </button>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("contact");
            if (el) el.scrollIntoView({ behavior: "smooth" });
            else window.location.href = "/#contact";
          }}
          className="flex items-baseline gap-1.5 group mt-0.5 cursor-pointer"
        >
          <span className="text-[#D64545]/60 text-[10px] font-mono leading-none">(01)</span>
          <span className="text-[#1C1C1C]/50 text-sm font-medium group-hover:text-[#1C1C1C] transition-colors duration-200">contact</span>
        </a>
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
            style={{ background: "#F5EFE6" }}
          >
            {/* Red scan line at top */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 left-0 right-0 h-[2px] bg-[#D64545] origin-left"
            />

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-6 text-[#1C1C1C]/45 hover:text-[#D64545] transition-colors duration-200 cursor-pointer z-10"
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
                  <span className="font-black text-[#1C1C1C] text-lg leading-none tracking-[0.06em]">
                    BRANDD<span className="text-[#D64545]">-AID</span>
                  </span>
                  <span className="text-[#1C1C1C]/35 text-[8px] font-mono uppercase tracking-[0.24em] mt-1">
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
                    active={pathname === "/" && link.href === "/" || pathname !== "/" && pathname.startsWith(link.href.replace("#", "").replace("/#", "/"))}
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
              <p className="text-[#1C1C1C]/25 text-[10px] font-mono uppercase tracking-[0.2em]">
                Mumbai · India · 2025
              </p>
              <div className="flex items-center gap-6">
                {SOCIAL.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1C1C1C]/35 text-xs font-mono uppercase tracking-widest hover:text-[#D64545] transition-colors duration-200"
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
  "/":          "Start here",
  "/#services": "Brand · Performance · Web",
  "/#work":     "120+ projects",
  "/about":     "Our story",
  "/#contact":  "Let's talk",
};

function NavLink({
  label, href, anchor, index, active, delay, onClick,
}: {
  label: string; href: string; anchor: string; index: string;
  active?: boolean; delay: number; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    onClick();
    if (anchor) {
      e.preventDefault();
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        // Navigate to home then scroll after load
        window.location.href = href;
      }
    }
  };

  return (
    <Link href={href} onClick={handleClick} className="flex-1 flex items-center border-b border-[#1C1C1C]/08 last:border-b-0">
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
          <span className="text-[#D64545] font-mono text-xs leading-none flex-shrink-0 w-6 opacity-70">
            {index}
          </span>

          {/* Roll-up label */}
          <div className="relative overflow-hidden">
            <motion.span
              animate={{ y: hovered ? "-100%" : "0%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="block font-bold text-[#1C1C1C] leading-none"
              style={{ fontSize: "clamp(2.2rem, 7vh, 5.5rem)", letterSpacing: "-0.04em" }}
            >
              {label}
            </motion.span>
            <motion.span
              animate={{ y: hovered ? "0%" : "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 block font-bold text-[#D64545] leading-none"
              style={{ fontSize: "clamp(2.2rem, 7vh, 5.5rem)", letterSpacing: "-0.04em" }}
            >
              {label}
            </motion.span>
          </div>

          {/* Active indicator */}
          {active && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#D64545] flex-shrink-0" />
          )}
        </div>

        {/* Right: description + arrow */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
            transition={{ duration: 0.2 }}
            className="text-[#1C1C1C]/35 text-xs font-mono uppercase tracking-widest hidden md:block"
          >
            {NAV_DESCRIPTIONS[href]}
          </motion.span>
          <motion.span
            animate={{ opacity: hovered ? 1 : 0.15, x: hovered ? 0 : -6 }}
            transition={{ duration: 0.25 }}
            className="text-[#D64545] text-lg font-light"
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}
