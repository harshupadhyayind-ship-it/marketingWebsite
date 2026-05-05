"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ServicesCanvas = dynamic(() => import("@/components/three/ServicesCanvas"), { ssr: false });

const services = [
  {
    num: "01",
    title: "Brand Strategy",
    tagline: "Position your brand to lead.",
    description:
      "A strong brand is your most valuable asset. We develop comprehensive brand strategies that define who you are, who you serve, and why you matter — then translate that into a visual and verbal identity that turns heads.",
    deliveryTime: "3–4 weeks",
    color: "#9CAF88",
    features: ["Brand Audit & Competitive Analysis", "Brand Identity & Visual System", "Tone of Voice & Messaging", "Brand Guidelines Document", "Logo & Typography Design"],
  },
  {
    num: "02",
    title: "Web Design & Development",
    tagline: "Websites that convert and captivate.",
    description:
      "We build cinematic web experiences using Next.js, Three.js, and a relentless focus on performance and conversion. Every site is custom-designed, fully responsive, and engineered for speed.",
    deliveryTime: "2–3 weeks",
    color: "#B8C9A8",
    features: ["Custom UI/UX Design (Figma)", "Next.js Development (App Router)", "Three.js 3D Experiences", "CMS Integration (Sanity)", "Performance Optimization (Lighthouse ≥ 90)"],
  },
  {
    num: "03",
    title: "Digital Marketing",
    tagline: "Full-funnel growth, measurably.",
    description:
      "From paid media to SEO and email — we build and run data-driven marketing programs that fill your pipeline and reduce your cost per acquisition over time.",
    deliveryTime: "Ongoing retainer",
    color: "#9CAF88",
    features: ["Meta & Google Ads Management", "Search Engine Optimisation (SEO)", "Email Marketing & Automation", "Growth Hacking & Experiments", "Monthly Performance Reports"],
  },
  {
    num: "04",
    title: "Performance Analytics",
    tagline: "Turn data into decisions.",
    description:
      "Most brands are flying blind. We implement robust tracking, build custom dashboards, and deliver monthly insights so you always know what's working and why.",
    deliveryTime: "1–2 weeks setup",
    color: "#7A9068",
    features: ["GA4 & GTM Setup", "Custom Looker Studio Dashboards", "Conversion Funnel Analysis", "A/B Testing Programme", "Monthly Insights Reports"],
  },
  {
    num: "05",
    title: "Content Creation",
    tagline: "Stories that stop the scroll.",
    description:
      "From product photography to viral social content — our creative team produces visually stunning, strategically crafted content for every platform and format.",
    deliveryTime: "Ongoing retainer",
    color: "#B8C9A8",
    features: ["Product & Brand Photography", "Video Production & Editing", "Long-form Copywriting", "Social Media Management", "Content Calendar Planning"],
  },
  {
    num: "06",
    title: "Creative Direction",
    tagline: "Campaigns that live in culture.",
    description:
      "End-to-end creative strategy and art direction for brand campaigns, product launches, and high-impact moments that create lasting cultural relevance.",
    deliveryTime: "Project-based",
    color: "#9CAF88",
    features: ["Campaign Concept Development", "Art Direction", "Print & Out-of-Home", "Launch Campaigns", "Creative QA & Production Oversight"],
  },
];

/* ─── Mobile accordion item ─────────────────────────────────────────────── */
function AccordionItem({ s, open, onToggle }: { s: typeof services[0]; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#F5F1E8]/10">
      <button
        className="w-full text-left px-6 py-7 flex items-center justify-between gap-6 group"
        onClick={onToggle}
      >
        <div className="flex items-center gap-5">
          <span className="font-mono text-xs flex-shrink-0" style={{ color: s.color }}>{s.num}</span>
          <div>
            <div
              className="font-bold text-[#F5F1E8] group-hover:text-[#9CAF88] transition-colors"
              style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", letterSpacing: "-0.03em" }}
            >
              {s.title}
            </div>
            <div className="text-[#8B7E6E] text-sm mt-0.5">{s.tagline}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="text-[#8B7E6E] text-xs font-mono hidden sm:block">{s.deliveryTime}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-[#F5F1E8] text-2xl leading-none w-6 text-center"
          >
            +
          </motion.span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 pl-[calc(1.5rem+1.5rem+1.25rem+1.5rem)]">
              <p className="text-[#8B7E6E] leading-relaxed mb-6">{s.description}</p>
              <div className="flex flex-wrap gap-2">
                {s.features.map((f) => (
                  <span key={f} className="text-xs px-3 py-1.5 rounded-full border border-[#9CAF88]/30 text-[#9CAF88] font-mono">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function ServicesPageContent() {
  const [open, setOpen] = useState<string | null>(null);      // mobile accordion
  const [active, setActive] = useState(0);                    // desktop tab

  const current = services[active];

  return (
    <div className="bg-[#0D0B08] min-h-screen">

      {/* ── Hero with 3D canvas ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "68vh" }}>
        <div className="absolute inset-0 pointer-events-none">
          <ServicesCanvas />
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0D0B08)" }}
        />
        <section className="relative z-10 pt-40 pb-24 px-6 max-w-7xl mx-auto">
          <p className="text-[#9CAF88] text-xs font-mono uppercase tracking-[0.2em] mb-6">What We Do</p>
          <h1
            className="font-bold text-[#F5F1E8] leading-none mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.04em" }}
          >
            Services designed
            <br />
            <em className="text-[#9CAF88] not-italic">to move the needle.</em>
          </h1>
          <p className="text-[#8B7E6E] text-lg max-w-md leading-relaxed">
            Every service delivered with craft, data, and a relentless focus on results.
          </p>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP — side-by-side tab layout
          ══════════════════════════════════════════════════════════════════ */}
      <section className="hidden md:block border-t border-[#F5F1E8]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-[1fr_1.7fr]" style={{ minHeight: "75vh" }}>

          {/* Left: service picker */}
          <div className="border-r border-[#F5F1E8]/10 flex flex-col justify-center py-12">
            {services.map((s, i) => (
              <button
                key={s.num}
                onClick={() => setActive(i)}
                className="relative text-left px-8 py-5 flex items-baseline gap-6 transition-all duration-300 group border-b border-[#F5F1E8]/06 last:border-b-0"
              >
                {/* Active left bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r transition-all duration-300"
                  style={{ background: s.color, opacity: active === i ? 1 : 0 }}
                />

                <span
                  className="font-mono text-xs flex-shrink-0 transition-colors duration-200"
                  style={{ color: active === i ? s.color : "#4A4540" }}
                >
                  {s.num}
                </span>

                <div className="flex-1">
                  <div
                    className="font-bold leading-tight transition-all duration-300"
                    style={{
                      fontSize: active === i ? "clamp(1.3rem, 1.8vw, 1.7rem)" : "clamp(1rem, 1.5vw, 1.3rem)",
                      letterSpacing: "-0.03em",
                      color: active === i ? "#F5F1E8" : "#5A5450",
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    className="text-sm mt-0.5 transition-opacity duration-300"
                    style={{ color: "#8B7E6E", opacity: active === i ? 1 : 0 }}
                  >
                    {s.tagline}
                  </div>
                </div>

                {active === i && (
                  <span className="text-[#9CAF88] text-sm flex-shrink-0">→</span>
                )}
              </button>
            ))}
          </div>

          {/* Right: active service detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative px-14 py-16 flex flex-col justify-center overflow-hidden"
            >
              {/* Giant watermark number */}
              <div
                className="absolute right-8 top-8 font-bold text-[#F5F1E8] leading-none pointer-events-none select-none"
                style={{ fontSize: "min(22vw, 18rem)", letterSpacing: "-0.06em", opacity: 0.03 }}
              >
                {current.num}
              </div>

              {/* Delivery badge */}
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest"
                  style={{ borderColor: `${current.color}40`, color: current.color }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: current.color }} />
                  {current.deliveryTime}
                </span>
              </div>

              {/* Tagline */}
              <p
                className="font-mono text-xs uppercase tracking-[0.2em] mb-4"
                style={{ color: current.color }}
              >
                {current.tagline}
              </p>

              {/* Heading */}
              <h2
                className="font-bold text-[#F5F1E8] mb-6 leading-tight"
                style={{ fontSize: "clamp(2.2rem, 3.5vw, 4rem)", letterSpacing: "-0.04em" }}
              >
                {current.title}
              </h2>

              {/* Description */}
              <p className="text-[#8B7E6E] text-lg leading-relaxed mb-10 max-w-lg">
                {current.description}
              </p>

              {/* Feature chips */}
              <div className="flex flex-wrap gap-2.5 mb-12">
                {current.features.map((f) => (
                  <span
                    key={f}
                    className="text-xs px-4 py-2 rounded-full border font-mono transition-colors duration-200"
                    style={{ borderColor: `${current.color}35`, color: current.color }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div>
                <Link
                  href="/contact"
                  className="inline-block font-bold px-8 py-4 rounded-full text-sm uppercase tracking-widest transition-colors duration-200 text-[#0D0B08]"
                  style={{ background: current.color }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#F5F1E8")}
                  onMouseLeave={e => (e.currentTarget.style.background = current.color)}
                >
                  Start This Service →
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE — accordion
          ══════════════════════════════════════════════════════════════════ */}
      <section className="md:hidden border-t border-[#F5F1E8]/10">
        {services.map((s) => (
          <AccordionItem
            key={s.num}
            s={s}
            open={open === s.num}
            onToggle={() => setOpen(open === s.num ? null : s.num)}
          />
        ))}
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center border-t border-[#F5F1E8]/10">
        <h2
          className="font-bold text-[#F5F1E8] mb-8"
          style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
        >
          Ready to start?
        </h2>
        <Link
          href="/contact"
          className="inline-block bg-[#9CAF88] text-[#0D0B08] font-bold px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#F5F1E8] transition-colors duration-200"
        >
          Let's Talk →
        </Link>
      </section>
    </div>
  );
}
