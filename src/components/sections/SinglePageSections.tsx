"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dynamic from "next/dynamic";
import { type Project } from "@/lib/projects-data";
import TiltCard from "@/components/ui/TiltCard";

const HeroShapes = dynamic(() => import("@/components/three/HeroShapes"), { ssr: false });
const DNACanvas  = dynamic(() => import("@/components/three/DNACanvas"),  { ssr: false });

/* ════════════════════════════════════════════════════════════════════════════
   Types
════════════════════════════════════════════════════════════════════════════ */

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

type SectionTextBlock = {
  label: string;
  heading1: string;
  heading2: string;
  subtitle?: string;
};

type ContactSectionText = SectionTextBlock & { responseTime: string };

type Settings = {
  company: { name: string; tagline: string; email: string; phone: string; location: string; year: string };
  social: { instagram: string; linkedin: string; twitter: string };
  contactSection: ContactSectionText;
  workSection: SectionTextBlock;
  servicesSection: SectionTextBlock;
  marquee: string[];
};


/* ════════════════════════════════════════════════════════════════════════════
   Shared helpers
════════════════════════════════════════════════════════════════════════════ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="h-px w-6 bg-[#D64545]" />
      <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em]">{children}</p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   ── SERVICES ──────────────────────────────────────────────────────────────
════════════════════════════════════════════════════════════════════════════ */

function AccordionRow({ s, open, onToggle }: { s: Service; open: boolean; onToggle: () => void }) {
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
              style={{ background: "linear-gradient(135deg, rgba(214,69,69,0.03) 0%, transparent 100%)" }}
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
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-block bg-[#D64545] text-white font-bold px-6 py-3 rounded-sm text-xs uppercase tracking-widest hover:bg-[#8B3232] transition-colors duration-200 cursor-pointer"
                  >
                    Start This Service →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ServicesSection({ services, settings }: { services: Service[]; settings: Settings }) {
  const [open, setOpen] = useState<string | null>(null);
  const { servicesSection } = settings;

  return (
    <section id="services" className="bg-[#F5EFE6] border-t border-[#1C1C1C]/08">
      {/* Section header */}
      <div className="px-6 md:px-10 pt-24 pb-16 max-w-7xl mx-auto">
        <SectionLabel>{servicesSection.label}</SectionLabel>
        <h2
          className="font-bold text-[#1C1C1C] leading-none"
          style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.04em" }}
        >
          {servicesSection.heading1}
          <br />
          <em className="text-[#D64545] not-italic">{servicesSection.heading2}</em>
        </h2>
        <p className="text-[#1C1C1C]/55 text-lg max-w-md leading-relaxed mt-6">
          {servicesSection.subtitle}
        </p>
      </div>

      {/* Accordion */}
      <div className="border-t border-[#1C1C1C]/08">
        {services.map((s) => (
          <AccordionRow
            key={s.num}
            s={s}
            open={open === s.num}
            onToggle={() => setOpen(open === s.num ? null : s.num)}
          />
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   ── WORK ──────────────────────────────────────────────────────────────────
════════════════════════════════════════════════════════════════════════════ */

// allTags is now computed inside WorkSection from the projects prop

/* ── Project Drawer ── */
function ProjectDrawer({ project, onClose }: { project: Project; onClose: () => void }) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-[#1C1C1C]/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.aside
        key="drawer"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 280 }}
        className="fixed right-0 top-0 bottom-0 z-[201] w-full max-w-2xl bg-[#F5EFE6] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="sticky top-0 z-10 w-full flex items-center justify-between px-8 py-5 bg-[#F5EFE6]/95 backdrop-blur-md border-b border-[#1C1C1C]/08"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#1C1C1C]/45">Close</span>
          <span className="w-8 h-8 rounded-full border border-[#1C1C1C]/15 flex items-center justify-center text-[#1C1C1C]/50 hover:border-[#D64545] hover:text-[#D64545] transition-colors duration-200 text-xs">✕</span>
        </button>

        <div className="px-8 md:px-12 py-10 space-y-12">
          {/* Header */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: project.color }}>
              {project.category} · {project.year}
            </span>
            <h2
              className="font-black text-[#1C1C1C] leading-tight mt-3 mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.04em" }}
            >
              {project.title}
            </h2>
            <p className="text-[#1C1C1C]/55 leading-relaxed">{project.description}</p>
          </div>

          {/* Result pill */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-mono font-medium"
            style={{ background: `${project.color}15`, color: project.color }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
            {project.result}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#1C1C1C]/10 text-[#1C1C1C]/45">
                {t}
              </span>
            ))}
          </div>

          {/* Challenge / Solution */}
          <div className="space-y-8">
            <div>
              <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.2em] mb-3">The Challenge</p>
              <p className="text-[#1C1C1C]/65 leading-relaxed">{project.challenge}</p>
            </div>
            <div>
              <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.2em] mb-3">Our Solution</p>
              <p className="text-[#1C1C1C]/65 leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Results grid */}
          <div>
            <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.2em] mb-5">Results</p>
            <div className="grid grid-cols-2 gap-px bg-[#1C1C1C]/08">
              {project.results.map((r) => (
                <div key={r.metric} className="bg-[#F5EFE6] p-5">
                  <div className="font-black text-[#1C1C1C] leading-none mb-1" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.04em", color: project.color }}>
                    {r.value}
                  </div>
                  <div className="text-[#1C1C1C]/45 text-xs font-mono uppercase tracking-widest">{r.metric}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div>
            <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.2em] mb-5">Our Process</p>
            <div className="space-y-5">
              {project.process.map((step) => (
                <div key={step.step} className="flex gap-5">
                  <span className="font-mono text-xs text-[#D64545] flex-shrink-0 mt-0.5">{step.step}</span>
                  <div>
                    <div className="font-bold text-[#1C1C1C] text-sm mb-1">{step.title}</div>
                    <div className="text-[#1C1C1C]/55 text-sm leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.2em] mb-4">Services Delivered</p>
            <div className="flex flex-wrap gap-2">
              {project.services.map((s) => (
                <span key={s} className="text-xs font-mono px-3 py-1.5 rounded-sm border border-[#D64545]/30 text-[#D64545]">{s}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="border-t border-[#1C1C1C]/08 pt-10">
            <p className="text-[#1C1C1C]/55 text-sm mb-5">Want results like these for your brand?</p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 300); }}
              className="inline-block bg-[#D64545] text-white font-bold px-8 py-4 rounded-sm text-xs uppercase tracking-widest hover:bg-[#C03A3A] transition-colors duration-200"
            >
              Start a Project →
            </a>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/work/${project.slug}`}>
        <div
          className="group relative border-b border-[#1C1C1C]/08 py-9 md:py-11 cursor-pointer overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: `${project.color}08` }}
          />
          <motion.div
            className="absolute left-0 top-0 w-0.5 bg-[#D64545] pointer-events-none"
            style={{ height: "100%" }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: hovered ? 1 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-0">
            <span className="text-[#D64545] font-mono text-xs w-14 flex-shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <h3
                className="font-bold text-[#1C1C1C] group-hover:text-[#D64545] transition-colors duration-200 leading-tight mb-2"
                style={{ fontSize: "clamp(1.25rem, 2.8vw, 2.2rem)", letterSpacing: "-0.03em" }}
              >
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#1C1C1C]/10 text-[#1C1C1C]/45"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:w-52 flex-shrink-0 md:text-right hidden md:block">
              <p className="text-[#1C1C1C]/45 text-sm font-mono">{project.category}</p>
              <p className="text-[#1C1C1C]/30 text-xs font-mono mt-0.5">{project.year}</p>
            </div>
            <div className="md:w-52 flex-shrink-0 md:text-right">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded-full"
                style={{ background: `${project.color}15`, color: project.color }}
              >
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.color }} />
                {project.result}
              </span>
            </div>
            <div className="md:w-12 flex-shrink-0 flex md:justify-end">
              <motion.div
                animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-8 h-8 rounded-full border flex items-center justify-center"
                style={{ borderColor: project.color, color: project.color }}
              >
                <ArrowUpRight size={13} />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-2"
    >
      <Link href={`/work/${project.slug}`}>
        <TiltCard className="relative overflow-hidden rounded-2xl border border-[#1C1C1C]/08 cursor-pointer">
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${project.color}18 0%, ${project.color}05 50%, transparent 100%)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none select-none overflow-hidden">
            <motion.span
              className="font-bold leading-none"
              animate={{ opacity: [0.05, 0.09, 0.05] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: "clamp(12rem, 22vw, 28rem)", color: project.color, letterSpacing: "-0.06em" }}
            >
              {project.client.charAt(0)}
            </motion.span>
          </div>
          <div className="relative z-10 p-10 md:p-14 flex flex-col justify-between h-full" style={{ minHeight: 460 }}>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: project.color }}>
                  {project.category}
                </span>
                <p className="text-[#1C1C1C]/35 text-xs font-mono mt-1">{project.year}</p>
              </div>
              <motion.div
                className="w-10 h-10 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ borderColor: project.color, color: project.color }}
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight size={15} />
              </motion.div>
            </div>
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-5 text-xs font-mono font-medium"
                style={{ background: `${project.color}15`, color: project.color }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
                {project.result}
              </div>
              <h3
                className="font-bold text-[#1C1C1C] group-hover:text-[#D64545] transition-colors duration-300 leading-tight"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}
              >
                {project.title}
              </h3>
              <p className="text-[#1C1C1C]/50 text-sm leading-relaxed mt-3 max-w-lg">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#1C1C1C]/10 text-[#1C1C1C]/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </TiltCard>
      </Link>
    </motion.div>
  );
}

function WorkSection({ projects, settings }: { projects: Project[]; settings: Settings }) {
  const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
  const [activeTag, setActiveTag] = useState("All");
  const filtered = activeTag === "All" ? projects : projects.filter((p) => p.tags.includes(activeTag));
  const featured = activeTag === "All" ? filtered[0] : null;
  const rest = activeTag === "All" ? filtered.slice(1) : filtered;
  const { workSection } = settings;

  return (
    <section id="work" className="bg-[#F5EFE6] border-t border-[#1C1C1C]/08">
      {/* Section header */}
      <div className="px-8 pt-24 pb-14 max-w-7xl mx-auto border-b border-[#1C1C1C]/08">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <SectionLabel>{workSection.label}</SectionLabel>
            <h2
              className="font-bold text-[#1C1C1C] leading-none"
              style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)", letterSpacing: "-0.04em" }}
            >
              {workSection.heading1}
              <br />
              <em className="text-[#D64545] not-italic">{workSection.heading2}</em>
            </h2>
          </div>
          <p className="text-[#1C1C1C]/45 text-sm max-w-xs leading-relaxed md:pb-3">
            {projects.length} {workSection.subtitle}
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-0 z-30 bg-[#F5EFE6]/95 backdrop-blur-md border-b border-[#1C1C1C]/08 px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center flex-wrap gap-x-8 gap-y-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`relative text-[11px] font-mono uppercase tracking-[0.18em] transition-colors duration-200 pb-1 ${
                  activeTag === tag ? "text-[#D64545]" : "text-[#1C1C1C]/35 hover:text-[#1C1C1C]/70"
                }`}
              >
                {tag}
                {activeTag === tag && <span className="absolute bottom-0 left-0 right-0 h-px bg-[#D64545]" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div key={activeTag}>
            {featured && <FeaturedCard project={featured} />}
            <div className={featured ? "mt-2" : ""}>
              {rest.map((project, i) => (
                <ProjectRow key={project.slug} project={project} index={featured ? i + 1 : i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   ── CONTACT ───────────────────────────────────────────────────────────────
════════════════════════════════════════════════════════════════════════════ */

const contactSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  budget:  z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters"),
});
type ContactForm = z.infer<typeof contactSchema>;

const budgetOptions = [
  "Under ₹50,000", "₹50K – ₹1L", "₹1L – ₹3L",
  "₹3L – ₹10L", "₹10L+", "Let's discuss",
];


/* Tilt card wrapper */
/* ── Custom Budget Dropdown ── */
function BudgetDropdown({
  value, onChange, row, lbl,
}: {
  value: string;
  onChange: (v: string) => void;
  row: string;
  lbl: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
  };

  return (
    <div className={row}>
      <label className={lbl}>Budget</label>
      <div
        ref={ref}
        tabIndex={0}
        onBlur={handleBlur}
        className="relative flex-1 outline-none"
      >
        {/* Trigger */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between text-lg text-left bg-transparent cursor-pointer group"
        >
          <span style={{ color: value ? "#1C1C1C" : "rgba(28,28,28,0.25)" }}>
            {value || "Select a range…"}
          </span>
          <span
            className="transition-transform duration-200 text-[#1C1C1C]/30"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", fontSize: "0.7rem" }}
          >
            ▼
          </span>
        </button>

        {/* Dropdown panel */}
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute left-0 right-0 z-50 mt-3 rounded-sm overflow-hidden"
              style={{
                background: "#F0E8DC",
                border: "1px solid rgba(28,28,28,0.08)",
                boxShadow: "0 12px 40px rgba(28,28,28,0.10)",
              }}
            >
              {budgetOptions.map((opt) => (
                <li key={opt}>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); onChange(opt); setOpen(false); }}
                    className="w-full text-left px-5 py-3.5 text-sm font-mono uppercase tracking-widest transition-colors duration-150"
                    style={{
                      color: value === opt ? "#D64545" : "rgba(28,28,28,0.7)",
                      background: value === opt ? "rgba(214,69,69,0.06)" : "transparent",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(28,28,28,0.04)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = value === opt ? "rgba(214,69,69,0.06)" : "transparent"; }}
                  >
                    {value === opt && <span className="mr-2 text-[#D64545]">✓</span>}
                    {opt}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TiltForm({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width  - 0.5) * 12;
    const y = ((e.clientY - top)  / height - 0.5) * -12;
    el.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg)`;
  };
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.35s ease" }}
    >
      {children}
    </div>
  );
}

function ContactSection({ settings }: { settings: Settings }) {
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });
  const { contactSection, company } = settings;
  const contactDetails = [
    { label: "Email",    content: company.email,    href: `mailto:${company.email}` },
    { label: "Phone",    content: company.phone,    href: `tel:${company.phone.replace(/\s/g, "")}` },
    { label: "Location", content: company.location, href: null },
  ];

  const onSubmit = async (data: ContactForm) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSubmitted(true);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  /* shared field row classes */
  const row   = "flex flex-col sm:flex-row sm:items-center gap-3 border-t border-[#1C1C1C]/08 py-6";
  const lbl   = "w-36 flex-shrink-0 text-[#1C1C1C]/45 text-xs font-mono uppercase tracking-widest";
  const input = "flex-1 bg-transparent text-[#1C1C1C] text-lg outline-none placeholder:text-[#1C1C1C]/25 border-none";

  return (
    <section id="contact" className="bg-[#F5EFE6]">

      {/* ── HERO — 2 column ── */}
      <div className="relative overflow-hidden">
        {/* warm radial accents */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 75% 50%, rgba(214,69,69,0.06) 0%, transparent 60%),
                              radial-gradient(circle at 20% 80%, rgba(107,79,58,0.05) 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-10 items-center py-20 md:py-24">
          {/* LEFT — headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[#D64545] text-xs font-mono uppercase tracking-[0.2em] mb-5">
              {contactSection.label}
            </p>
            <h2
              className="font-black text-[#1C1C1C] leading-none"
              style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
            >
              {contactSection.heading1}{" "}
              <em className="not-italic text-[#D64545]">{contactSection.heading2}</em>
            </h2>
          </motion.div>

          {/* RIGHT — contact details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {contactDetails.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[#1C1C1C]/40 text-[10px] font-mono uppercase tracking-widest mb-1">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-[#1C1C1C] text-lg hover:text-[#D64545] transition-colors duration-200"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-[#1C1C1C] text-lg">{item.content}</p>
                )}
              </motion.div>
            ))}

            <div className="flex items-center gap-2 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D64545] animate-pulse" />
              <span className="text-[#1C1C1C]/40 text-xs">{contactSection.responseTime}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── FORM ── */}
      <div className="px-6 md:px-10 pb-32 pt-8 max-w-3xl mx-auto" ref={formRef}>
        <TiltForm>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32"
            >
              <div
                className="text-[#D64545] font-black mb-4"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}
              >
                Message sent ✓
              </div>
              <p className="text-[#1C1C1C]/50 text-lg">
                We&apos;ll review your brief and get back within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-[#D64545] text-xs font-mono uppercase tracking-[0.2em] mb-12">
                Tell us about your project
              </p>

              {/* Name */}
              <div className={row}>
                <label className={lbl}>Name *</label>
                <div className="flex-1">
                  <input {...register("name")} placeholder="Your name" className={input} />
                  {errors.name && <p className="text-[#D64545] text-xs mt-1">{errors.name.message}</p>}
                </div>
              </div>

              {/* Email */}
              <div className={row}>
                <label className={lbl}>Email *</label>
                <div className="flex-1">
                  <input {...register("email")} type="email" placeholder="your@email.com" className={input} />
                  {errors.email && <p className="text-[#D64545] text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Company */}
              <div className={row}>
                <label className={lbl}>Company</label>
                <input {...register("company")} placeholder="Your company or brand" className={input} />
              </div>

              {/* Budget — custom dropdown */}
              <BudgetDropdown value={watch("budget") ?? ""} onChange={(v) => setValue("budget", v)} row={row} lbl={lbl} />

              {/* Project Brief */}
              <div className={`${row} sm:items-start`}>
                <label className={`${lbl} pt-1`}>Brief *</label>
                <div className="flex-1">
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell us about your project goals, timeline, and challenges…"
                    className={`${input} resize-none w-full`}
                  />
                  {errors.message && <p className="text-[#D64545] text-xs mt-1">{errors.message.message}</p>}
                </div>
              </div>

              {/* Submit */}
              <div className="border-t border-[#1C1C1C]/08 pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#D64545] text-white font-bold px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#1C1C1C] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending…" : "Send Message →"}
                </button>
              </div>
            </form>
          )}
        </TiltForm>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   ── ABOUT ─────────────────────────────────────────────────────────────────
════════════════════════════════════════════════════════════════════════════ */

type TeamMember = { name: string; role: string; bio: string; initial: string };
type Stat        = { val: string; label: string };
type Milestone   = { year: string; event: string };
type Value       = { title: string; desc: string };

type AboutData = {
  sectionHeader: { label: string; heading1: string; heading2: string; subtitle: string };
  story: { heading: string; paragraph1: string; paragraph2: string };
  stats: Stat[];
  team: TeamMember[];
  milestones: Milestone[];
  values: Value[];
  mission: { heading: string; text: string };
  vision: { heading: string; text: string };
  howWeWork: { heading: string; headingRed: string; label: string };
  cta: { heading1: string; heading2: string; subtitle: string; buttonText: string };
};

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AboutSection({ data }: { data: AboutData }) {
  const { sectionHeader, story, stats, team, values, mission, vision, howWeWork } = data;

  return (
    <section id="about" className="bg-[#F5EFE6] border-t border-[#1C1C1C]/08">

      {/* Header with DNA canvas background */}
      <div className="relative overflow-hidden" style={{ minHeight: "80vh" }}>
        {/* DNA canvas — right half */}
        <div className="absolute inset-0 pointer-events-none">
          <DNACanvas />
        </div>
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #F5EFE6)" }}
        />

        {/* Text — left side, sitting above canvas */}
        <div
          className="relative z-10 px-6 md:px-10 max-w-7xl mx-auto flex flex-col justify-end"
          style={{ minHeight: "80vh", paddingBottom: "5rem" }}
        >
          <SectionLabel>{sectionHeader.label}</SectionLabel>
          <h2
            className="font-black text-[#1C1C1C] leading-[0.92] mb-6"
            style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)", letterSpacing: "-0.04em" }}
          >
            {sectionHeader.heading1}
            <br />
            <em className="not-italic text-[#D64545]">{sectionHeader.heading2}</em>
          </h2>
          <p className="text-[#1C1C1C]/55 text-xl max-w-lg leading-relaxed">{sectionHeader.subtitle}</p>
          <div className="flex items-center gap-3 mt-8">
            <span className="w-2 h-2 rounded-full bg-[#D64545] animate-pulse" />
            <span className="text-[#1C1C1C]/45 text-xs font-mono uppercase tracking-[0.2em]">
              Mumbai, India · Est. 2019
            </span>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-t border-b border-[#1C1C1C]/08 grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.07}>
            <div className={`px-8 py-14 ${i < stats.length - 1 ? "border-r border-[#1C1C1C]/08" : ""}`}>
              <div
                className="font-black text-[#D64545] mb-2 leading-none"
                style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
              >
                {s.val}
              </div>
              <div className="text-[#1C1C1C]/50 text-sm font-mono uppercase tracking-[0.12em]">{s.label}</div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* Story 2-col */}
      <div className="py-24 px-6 md:px-10 max-w-7xl mx-auto border-b border-[#1C1C1C]/08">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <FadeUp>
            <SectionLabel>Our Story</SectionLabel>
            <h3
              className="font-black text-[#1C1C1C] leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)", letterSpacing: "-0.04em" }}
            >
              {story.heading}
            </h3>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[#1C1C1C]/55 text-lg leading-relaxed mb-5">{story.paragraph1}</p>
            <p className="text-[#1C1C1C]/55 text-lg leading-relaxed">{story.paragraph2}</p>
          </FadeUp>
        </div>
      </div>

      {/* Mission / Vision */}
      <div className="py-24 px-6 md:px-10 max-w-7xl mx-auto border-b border-[#1C1C1C]/08">
        <div className="grid md:grid-cols-2 gap-8">
          <FadeUp>
            <div className="border border-[#1C1C1C]/08 rounded-sm p-10 h-full" style={{ background: "rgba(214,69,69,0.02)" }}>
              <SectionLabel>Mission</SectionLabel>
              <h3
                className="font-black text-[#1C1C1C] mb-5 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.6rem)", letterSpacing: "-0.03em" }}
              >
                {mission.heading}
              </h3>
              <p className="text-[#1C1C1C]/55 leading-relaxed">{mission.text}</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="border border-[#1C1C1C]/08 rounded-sm p-10 h-full" style={{ background: "rgba(107,79,58,0.03)" }}>
              <SectionLabel>Vision</SectionLabel>
              <h3
                className="font-black text-[#1C1C1C] mb-5 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.6rem)", letterSpacing: "-0.03em" }}
              >
                {vision.heading}
              </h3>
              <p className="text-[#1C1C1C]/55 leading-relaxed">{vision.text}</p>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* How we work — 2×2 grid */}
      <div className="py-24 px-6 md:px-10 max-w-7xl mx-auto border-b border-[#1C1C1C]/08">
        <FadeUp>
          <SectionLabel>{howWeWork.label}</SectionLabel>
          <h3
            className="font-black text-[#1C1C1C] mb-14 leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)", letterSpacing: "-0.04em" }}
          >
            {howWeWork.heading}
            <br />
            <span className="text-[#D64545]">{howWeWork.headingRed}</span>
          </h3>
        </FadeUp>
        <div className="grid sm:grid-cols-2 gap-px bg-[#1C1C1C]/08">
          {values.map((v, i) => (
            <FadeUp key={v.title} delay={i * 0.07}>
              <div className="bg-[#F5EFE6] p-10 h-full">
                <span className="text-[#D64545] font-mono text-xs mb-5 block">0{i + 1}</span>
                <h4
                  className="font-black text-[#1C1C1C] mb-3 leading-tight"
                  style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.8rem)", letterSpacing: "-0.03em" }}
                >
                  {v.title}
                </h4>
                <p className="text-[#1C1C1C]/55 leading-relaxed text-sm">{v.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Team grid */}
      <div className="py-24 px-6 md:px-10 max-w-7xl mx-auto border-b border-[#1C1C1C]/08">
        <FadeUp>
          <SectionLabel>The Team</SectionLabel>
          <h3
            className="font-black text-[#1C1C1C] mb-14 leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)", letterSpacing: "-0.04em" }}
          >
            The people behind
            <br />
            <span className="text-[#D64545]">the work.</span>
          </h3>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1C1C1C]/08">
          {team.map((member, i) => (
            <FadeUp key={member.name} delay={i * 0.06}>
              <div className="bg-[#F5EFE6] p-8 h-full hover:bg-[#EDE5D8] transition-colors duration-300">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-black text-xl mb-6"
                  style={{ background: "rgba(214,69,69,0.1)", color: "#D64545" }}
                >
                  {member.initial}
                </div>
                <div className="font-bold text-[#1C1C1C] text-lg mb-1">{member.name}</div>
                <div className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.2em] mb-4">{member.role}</div>
                <p className="text-[#1C1C1C]/55 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>


    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   ── ROOT EXPORT ───────────────────────────────────────────────────────────
════════════════════════════════════════════════════════════════════════════ */

export default function SinglePageSections({
  services,
  about,
  settings,
  projects,
}: {
  services: Service[];
  about: AboutData;
  settings: Settings;
  projects: Project[];
}) {
  return (
    <main>
      <ServicesSection services={services} settings={settings} />
      <WorkSection projects={projects} settings={settings} />
      <AboutSection data={about} />
      <ContactSection settings={settings} />
    </main>
  );
}
