"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const HeroShapes = dynamic(() => import("@/components/three/HeroShapes"), { ssr: false });

type Service = {
  num: string;
  title: string;
  tagline: string;
  description: string;
  deliveryTime: string;
  features: string[];
  tags?: string[];
  slug?: string;
};

/* ─── Accordion row ─────────────────────────────────────────────────────── */
function AccordionRow({
  s,
  open,
  onToggle,
}: {
  s: Service;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#1C1C1C]/08">
      <button
        className="w-full text-left px-6 md:px-10 py-7 flex items-center justify-between gap-6 group"
        onClick={onToggle}
      >
        <div className="flex items-center gap-5 md:gap-8 flex-1 min-w-0">
          <span className="font-mono text-xs text-[#D64545] flex-shrink-0">{s.num}</span>
          <div className="flex-1 min-w-0">
            <div
              className="font-bold text-[#1C1C1C] group-hover:text-[#D64545] transition-colors duration-200 leading-tight"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)", letterSpacing: "-0.03em" }}
            >
              {s.title}
            </div>
            <div className="text-[#1C1C1C]/50 text-sm mt-0.5">{s.tagline}</div>
          </div>
        </div>
        <div className="flex items-center gap-5 flex-shrink-0">
          <span className="text-[#1C1C1C]/40 text-xs font-mono hidden sm:block">{s.deliveryTime}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-[#1C1C1C] text-2xl leading-none w-6 text-center font-light"
          >
            +
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-6 md:px-10 pb-10 pt-2 flex flex-col gap-6 md:flex-row md:gap-16"
              style={{ background: "linear-gradient(135deg, rgba(230,51,39,0.03) 0%, transparent 100%)" }}
            >
              <p className="text-[#1C1C1C]/55 leading-relaxed md:max-w-md flex-shrink-0 md:flex-1">
                {s.description}
              </p>
              <div className="flex flex-wrap gap-2 md:flex-1">
                {s.features.map((f) => (
                  <span
                    key={f}
                    className="text-xs px-3 py-1.5 rounded-sm border border-[#D64545]/30 text-[#D64545] font-mono"
                  >
                    {f}
                  </span>
                ))}
                <div className="w-full mt-4">
                  <Link
                    href="/contact"
                    className="inline-block bg-[#D64545] text-white font-bold px-6 py-3 rounded-sm text-xs uppercase tracking-widest hover:bg-[#8B3232] transition-colors duration-200"
                  >
                    Start This Service →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function ServicesPageContent({ services }: { services: Service[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="bg-[#F5EFE6] min-h-screen">

      {/* ── Page header ── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* Three.js canvas — absolutely fills the header bg */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <HeroShapes />
        </div>
        {/* White gradient fade at the bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }}
        />
        {/* Text content sits on top */}
        <div className="relative z-10 px-6 md:px-10 max-w-7xl mx-auto">
          <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
            What We Do
          </p>
          <h1
            className="font-bold text-[#1C1C1C] leading-none mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.04em" }}
          >
            Services designed
            <br />
            <em className="text-[#D64545] not-italic">to move the needle.</em>
          </h1>
          <p className="text-[#1C1C1C]/55 text-lg max-w-md leading-relaxed">
            Every service delivered with craft, data, and a relentless focus on results.
          </p>
        </div>
      </section>

      {/* ── Accordion list ── */}
      <section className="border-t border-[#1C1C1C]/08">
        {services.map((s) => (
          <AccordionRow
            key={s.num}
            s={s}
            open={open === s.num}
            onToggle={() => setOpen(open === s.num ? null : s.num)}
          />
        ))}
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center border-t border-[#1C1C1C]/08">
        <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
          Ready to grow?
        </p>
        <h2
          className="font-bold text-[#1C1C1C] mb-8"
          style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
        >
          Ready to start?
        </h2>
        <p className="text-[#1C1C1C]/55 max-w-sm mx-auto mb-10 leading-relaxed">
          Tell us about your project and we'll put together a custom plan.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-[#D64545] text-white font-bold px-10 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-[#8B3232] transition-colors duration-200"
        >
          Let's Talk →
        </Link>
      </section>
    </div>
  );
}
