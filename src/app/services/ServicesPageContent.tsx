"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const HeroShapes = dynamic(() => import("@/components/three/HeroShapes"), { ssr: false });

const services = [
  {
    num: "01",
    title: "Brand Strategy",
    tagline: "Position your brand to lead.",
    description:
      "A strong brand is your most valuable asset. We develop comprehensive brand strategies that define who you are, who you serve, and why you matter — then translate that into a visual and verbal identity that turns heads.",
    deliveryTime: "3–4 weeks",
    features: ["Brand Audit & Competitive Analysis", "Brand Identity & Visual System", "Tone of Voice & Messaging", "Brand Guidelines Document", "Logo & Typography Design"],
  },
  {
    num: "02",
    title: "Web Design & Development",
    tagline: "Websites that convert and captivate.",
    description:
      "We build cinematic web experiences using Next.js, Three.js, and a relentless focus on performance and conversion. Every site is custom-designed, fully responsive, and engineered for speed.",
    deliveryTime: "2–3 weeks",
    features: ["Custom UI/UX Design (Figma)", "Next.js Development (App Router)", "Three.js 3D Experiences", "CMS Integration (Sanity)", "Performance Optimization (Lighthouse ≥ 90)"],
  },
  {
    num: "03",
    title: "Digital Marketing",
    tagline: "Full-funnel growth, measurably.",
    description:
      "From paid media to SEO and email — we build and run data-driven marketing programs that fill your pipeline and reduce your cost per acquisition over time.",
    deliveryTime: "Ongoing retainer",
    features: ["Meta & Google Ads Management", "Search Engine Optimisation (SEO)", "Email Marketing & Automation", "Growth Hacking & Experiments", "Monthly Performance Reports"],
  },
  {
    num: "04",
    title: "Performance Analytics",
    tagline: "Turn data into decisions.",
    description:
      "Most brands are flying blind. We implement robust tracking, build custom dashboards, and deliver monthly insights so you always know what's working and why.",
    deliveryTime: "1–2 weeks setup",
    features: ["GA4 & GTM Setup", "Custom Looker Studio Dashboards", "Conversion Funnel Analysis", "A/B Testing Programme", "Monthly Insights Reports"],
  },
  {
    num: "05",
    title: "Content Creation",
    tagline: "Stories that stop the scroll.",
    description:
      "From product photography to viral social content — our creative team produces visually stunning, strategically crafted content for every platform and format.",
    deliveryTime: "Ongoing retainer",
    features: ["Product & Brand Photography", "Video Production & Editing", "Long-form Copywriting", "Social Media Management", "Content Calendar Planning"],
  },
  {
    num: "06",
    title: "Creative Direction",
    tagline: "Campaigns that live in culture.",
    description:
      "End-to-end creative strategy and art direction for brand campaigns, product launches, and high-impact moments that create lasting cultural relevance.",
    deliveryTime: "Project-based",
    features: ["Campaign Concept Development", "Art Direction", "Print & Out-of-Home", "Launch Campaigns", "Creative QA & Production Oversight"],
  },
];

/* ─── Accordion row ─────────────────────────────────────────────────────── */
function AccordionRow({
  s,
  open,
  onToggle,
}: {
  s: (typeof services)[0];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#0A0A0F]/08">
      <button
        className="w-full text-left px-6 md:px-10 py-7 flex items-center justify-between gap-6 group"
        onClick={onToggle}
      >
        <div className="flex items-center gap-5 md:gap-8 flex-1 min-w-0">
          <span className="font-mono text-xs text-[#E63327] flex-shrink-0">{s.num}</span>
          <div className="flex-1 min-w-0">
            <div
              className="font-bold text-[#0A0A0F] group-hover:text-[#E63327] transition-colors duration-200 leading-tight"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)", letterSpacing: "-0.03em" }}
            >
              {s.title}
            </div>
            <div className="text-[#0A0A0F]/50 text-sm mt-0.5">{s.tagline}</div>
          </div>
        </div>
        <div className="flex items-center gap-5 flex-shrink-0">
          <span className="text-[#0A0A0F]/40 text-xs font-mono hidden sm:block">{s.deliveryTime}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-[#0A0A0F] text-2xl leading-none w-6 text-center font-light"
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
              <p className="text-[#0A0A0F]/55 leading-relaxed md:max-w-md flex-shrink-0 md:flex-1">
                {s.description}
              </p>
              <div className="flex flex-wrap gap-2 md:flex-1">
                {s.features.map((f) => (
                  <span
                    key={f}
                    className="text-xs px-3 py-1.5 rounded-sm border border-[#E63327]/30 text-[#E63327] font-mono"
                  >
                    {f}
                  </span>
                ))}
                <div className="w-full mt-4">
                  <Link
                    href="/contact"
                    className="inline-block bg-[#E63327] text-white font-bold px-6 py-3 rounded-sm text-xs uppercase tracking-widest hover:bg-[#B5261B] transition-colors duration-200"
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
export default function ServicesPageContent() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="bg-white min-h-screen">

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
          <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
            What We Do
          </p>
          <h1
            className="font-bold text-[#0A0A0F] leading-none mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.04em" }}
          >
            Services designed
            <br />
            <em className="text-[#E63327] not-italic">to move the needle.</em>
          </h1>
          <p className="text-[#0A0A0F]/55 text-lg max-w-md leading-relaxed">
            Every service delivered with craft, data, and a relentless focus on results.
          </p>
        </div>
      </section>

      {/* ── Accordion list ── */}
      <section className="border-t border-[#0A0A0F]/08">
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
      <section className="py-32 px-6 text-center border-t border-[#0A0A0F]/08">
        <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
          Ready to grow?
        </p>
        <h2
          className="font-bold text-[#0A0A0F] mb-8"
          style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
        >
          Ready to start?
        </h2>
        <p className="text-[#0A0A0F]/55 max-w-sm mx-auto mb-10 leading-relaxed">
          Tell us about your project and we'll put together a custom plan.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-[#E63327] text-white font-bold px-10 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-[#B5261B] transition-colors duration-200"
        >
          Let's Talk →
        </Link>
      </section>
    </div>
  );
}
