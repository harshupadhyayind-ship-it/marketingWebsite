"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "services", href: "/services" },
  { label: "work",     href: "/work"     },
  { label: "about",    href: "/about"    },
  { label: "contact",  href: "/contact"  },
];

const SOCIAL_LINKS = [
  { label: "instagram", href: "https://instagram.com" },
  { label: "linkedin",  href: "https://linkedin.com"  },
  { label: "twitter",   href: "https://twitter.com"   },
];

// Swap picsum URLs with your real images when ready
const LINK_THEME: Record<string, { image: string }> = {
  services:  { image: "https://picsum.photos/seed/services/1600/900"  },
  work:      { image: "https://picsum.photos/seed/work/1600/900"      },
  about:     { image: "https://picsum.photos/seed/about/1600/900"     },
  contact:   { image: "https://picsum.photos/seed/contact/1600/900"   },
  instagram: { image: "https://picsum.photos/seed/instagram/1600/900" },
  linkedin:  { image: "https://picsum.photos/seed/linkedin/1600/900"  },
  twitter:   { image: "https://picsum.photos/seed/twitter/1600/900"   },
};

const DRAWER_WIDTH = "20rem";

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname              = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (open) window.scrollTo({ top: 0, behavior: "instant" });
    document.body.classList.toggle("nav-open", open);
    return () => { document.body.classList.remove("nav-open"); };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("wheel",     close, { passive: true });
    window.addEventListener("touchmove", close, { passive: true });
    return () => {
      window.removeEventListener("wheel",     close);
      window.removeEventListener("touchmove", close);
    };
  }, [open]);

  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("navClose", handler);
    return () => window.removeEventListener("navClose", handler);
  }, []);

  const activeImage = hovered ? LINK_THEME[hovered]?.image : null;

  return (
    <>
      {/* ── Corner trigger (always visible) ── */}
      <div className="fixed top-0 right-0 z-50 flex flex-col items-end px-6 pt-5 select-none">
        <button
          onClick={() => setOpen(true)}
          className="flex items-baseline gap-1.5 group cursor-pointer"
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

      <AnimatePresence>
        {open && (
          <>
            {/* ── Full-page background image (z-0, sits behind dark card at z-1) ── */}
            <AnimatePresence>
              {activeImage && (
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 0,
                    backgroundImage: `url(${activeImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    pointerEvents: "none",
                  }}
                />
              )}
            </AnimatePresence>

            {/* ── Left drawer — transparent, just floats the menu text ── */}
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 bottom-0 z-50"
              style={{ width: DRAWER_WIDTH }}
            >
              {/* Grain texture overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E")`,
                  backgroundSize: "200px 200px",
                  opacity: 0.4,
                }}
              />

              {/* Panel content */}
              <div className="relative z-10 h-full flex flex-col px-8 py-8">
                {/* Nav links — vertically centered, no logo */}
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

                  <div className="my-6" />

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

                {/* Footer */}
                <p className="text-[#0D0B08]/40 text-[10px] font-mono uppercase tracking-widest">
                  Mumbai · India · 2025
                </p>
              </div>
            </motion.div>
          </>
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
      className={`flex items-center justify-between group cursor-pointer ${
        small ? "py-1" : "py-1.5"
      }`}
      onHoverStart={() => onHover(label)}
      onHoverEnd={()  => onHover(null)}
    >
      <motion.span
        className={`font-bold leading-tight tracking-tight ${
          small ? "text-xl" : "text-[2.25rem]"
        } ${active ? "text-[#9CAF88]" : "text-[#0D0B08]"}`}
        whileHover={{ x: 8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {label}
      </motion.span>
      <motion.span
        className="text-[#0D0B08]/40 text-xs font-mono"
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
