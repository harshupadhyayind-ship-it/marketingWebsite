"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { allProjects, type Project } from "@/lib/projects-data";

const allTags = ["All", ...Array.from(new Set(allProjects.flatMap((p) => p.tags)))];

/* ─── Holographic foil card ─────────────────────────────────────────────── */
function HoloCard({ children, color }: { children: React.ReactNode; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ rotX: 0, rotY: 0, px: 0.5, py: 0.5, active: false });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setState({ rotX: (py - 0.5) * -16, rotY: (px - 0.5) * 16, px, py, active: true });
  }
  function onMouseLeave() { setState(s => ({ ...s, rotX: 0, rotY: 0, active: false })); }

  const hue   = state.px * 280;
  const shine = `${110 + state.rotY * 3}deg`;
  const glareX = `${(1 - state.px) * 100}%`;
  const glareY = `${(1 - state.py) * 100}%`;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative overflow-hidden h-full"
      style={{
        transform: `perspective(900px) rotateX(${state.rotX}deg) rotateY(${state.rotY}deg) scale(${state.active ? 1.015 : 1})`,
        transition: state.active ? "transform 0.05s linear" : "transform 0.55s cubic-bezier(0.23,1,0.32,1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
      {/* Rainbow foil */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 20,
        opacity: state.active ? 1 : 0, transition: "opacity 0.35s",
        background: `linear-gradient(${shine}, hsla(${hue-80},100%,65%,0) 0%, hsla(${hue-20},100%,65%,0.13) 30%, hsla(${hue+50},100%,70%,0.15) 55%, hsla(${hue+130},100%,65%,0.12) 80%, hsla(${hue+200},100%,65%,0) 100%)`,
        mixBlendMode: "screen",
      }} />
      {/* Specular glare */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 21,
        opacity: state.active ? 1 : 0, transition: "opacity 0.35s",
        background: `radial-gradient(ellipse 55% 45% at ${glareX} ${glareY}, rgba(255,255,255,0.2) 0%, transparent 65%)`,
        mixBlendMode: "overlay",
      }} />
    </div>
  );
}

/* ─── Project card ───────────────────────────────────────────────────────── */
function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <HoloCard color={project.color}>
      <Link
        href={`/work/${project.slug}`}
        className="block group relative overflow-hidden bg-[#0D0B08]"
        style={{ minHeight: featured ? "520px" : "420px" }}
      >
        {/* ── Full-bleed colour field ── */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 130% 70% at 50% -5%, ${project.color}38 0%, transparent 60%),
              radial-gradient(ellipse 60% 60% at 85% 110%, ${project.color}18 0%, transparent 55%)
            `,
          }}
        />

        {/* ── Giant decorative initial ── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span
            className="font-bold leading-none"
            style={{
              fontSize: featured ? "clamp(14rem, 30vw, 32rem)" : "clamp(9rem, 18vw, 20rem)",
              color: project.color,
              opacity: 0.07,
              letterSpacing: "-0.06em",
              transform: "translateY(-5%)",
            }}
          >
            {project.client.charAt(0)}
          </span>
        </div>

        {/* ── Top bar ── */}
        <div className="relative z-10 flex items-start justify-between p-7 md:p-8">
          <div>
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: project.color }}
            >
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#8B7E6E] text-xs font-mono">{project.year}</span>
            {/* Arrow circle — appears on hover */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#0D0B08] text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
              style={{ background: project.color }}
            >
              →
            </div>
          </div>
        </div>

        {/* ── Bottom info panel ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 p-7 md:p-8"
          style={{ background: "linear-gradient(to top, rgba(13,11,8,0.96) 0%, rgba(13,11,8,0.6) 55%, transparent 100%)" }}
        >
          {/* Result pill */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 border"
            style={{ borderColor: `${project.color}45`, color: project.color }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.color }} />
            <span className="text-xs font-mono font-medium">{project.result}</span>
          </div>

          {/* Title */}
          <h2
            className="font-bold text-[#F5F1E8] group-hover:text-[#9CAF88] transition-colors duration-300 leading-tight mb-4"
            style={{
              fontSize: featured ? "clamp(1.6rem, 3.5vw, 3rem)" : "clamp(1.2rem, 2.5vw, 2rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {project.title}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-widest font-mono px-2.5 py-1 rounded-full border border-[#F5F1E8]/10 text-[#8B7E6E]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </HoloCard>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function WorkPageContent() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? allProjects
      : allProjects.filter((p) => p.tags.includes(activeTag));

  return (
    <div className="bg-[#0D0B08] min-h-screen">

      {/* ── Hero ── */}
      <section className="pt-40 pb-16 px-6 max-w-7xl mx-auto">
        <p className="text-[#9CAF88] text-xs font-mono uppercase tracking-[0.2em] mb-6">
          Our Portfolio
        </p>
        <h1
          className="font-bold text-[#F5F1E8] leading-none"
          style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.04em" }}
        >
          Work that speaks
          <br />
          <em className="text-[#9CAF88] not-italic">for itself.</em>
        </h1>
      </section>

      {/* ── Filter bar ── */}
      <section className="sticky top-0 z-30 bg-[#0D0B08]/90 backdrop-blur-md border-b border-[#F5F1E8]/10 px-6 py-4">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTag === tag
                    ? "bg-[#9CAF88] text-[#0D0B08]"
                    : "text-[#8B7E6E] hover:text-[#F5F1E8] border border-[#F5F1E8]/10 hover:border-[#F5F1E8]/30"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project grid ── */}
      <section className="py-px">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#F5F1E8]/10">
              {filtered.map((project, i) => {
                /* First card is a featured full-width hero when showing all */
                const featured = i === 0 && activeTag === "All";
                return (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className={featured ? "md:col-span-2" : ""}
                  >
                    <ProjectCard project={project} featured={featured} />
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center border-t border-[#F5F1E8]/10">
        <p className="text-[#8B7E6E] text-sm mb-6 font-mono uppercase tracking-widest">Start a project</p>
        <h2
          className="font-bold text-[#F5F1E8] mb-10"
          style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
        >
          Your brand, next.
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
