"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { allProjects, type Project } from "@/lib/projects-data";
import TiltCard from "@/components/ui/TiltCard";

const allTags = ["All", ...Array.from(new Set(allProjects.flatMap((p) => p.tags)))];

/* ─── Single project row ─────────────────────────────────────────────────── */
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
          className="group relative border-b border-[#0A0A0F]/08 py-8 md:py-10 cursor-pointer overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Hover fill */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: `${project.color}08` }}
          />

          {/* Red left-border accent that scales in on hover */}
          <motion.div
            className="absolute left-0 top-0 w-0.5 bg-[#E63327] pointer-events-none"
            style={{ height: "100%" }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: hovered ? 1 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-0">
            {/* Index */}
            <span className="text-[#E63327] font-mono text-xs w-14 flex-shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Title + tags */}
            <div className="flex-1 min-w-0">
              <h2
                className="font-bold text-[#0A0A0F] group-hover:text-[#E63327] transition-colors duration-200 leading-tight mb-2"
                style={{ fontSize: "clamp(1.25rem, 2.8vw, 2.2rem)", letterSpacing: "-0.03em" }}
              >
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#0A0A0F]/10 text-[#0A0A0F]/45"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta — category + year */}
            <div className="md:w-52 flex-shrink-0 md:text-right hidden md:block">
              <p className="text-[#0A0A0F]/45 text-sm font-mono">{project.category}</p>
              <p className="text-[#0A0A0F]/30 text-xs font-mono mt-0.5">{project.year}</p>
            </div>

            {/* Result pill */}
            <div className="md:w-52 flex-shrink-0 md:text-right">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded-full"
                style={{ background: `${project.color}15`, color: project.color }}
              >
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.color }} />
                {project.result}
              </span>
            </div>

            {/* Arrow */}
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

/* ─── Featured card (first project) ─────────────────────────────────────── */
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
        <TiltCard className="relative overflow-hidden rounded-2xl border border-[#0A0A0F]/08 cursor-pointer">
          {/* Colour field background */}
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${project.color}18 0%, ${project.color}05 50%, transparent 100%)`,
            }}
          />

          {/* Giant initial */}
          <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none select-none overflow-hidden">
            <span
              className="font-bold leading-none"
              style={{
                fontSize: "clamp(12rem, 22vw, 28rem)",
                color: project.color,
                opacity: 0.06,
                letterSpacing: "-0.06em",
              }}
            >
              {project.client.charAt(0)}
            </span>
          </div>

          <div className="relative z-10 p-10 md:p-14 flex flex-col justify-between h-full" style={{ minHeight: 420 }}>
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: project.color }}>
                  {project.category}
                </span>
                <p className="text-[#0A0A0F]/35 text-xs font-mono mt-1">{project.year}</p>
              </div>
              <motion.div
                className="w-10 h-10 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ borderColor: project.color, color: project.color }}
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight size={15} />
              </motion.div>
            </div>

            {/* Bottom */}
            <div>
              {/* Result */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-5 text-xs font-mono font-medium"
                style={{ background: `${project.color}15`, color: project.color }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
                {project.result}
              </div>

              <h2
                className="font-bold text-[#0A0A0F] group-hover:text-[#E63327] transition-colors duration-300 leading-tight"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}
              >
                {project.title}
              </h2>

              <p className="text-[#0A0A0F]/50 text-sm leading-relaxed mt-3 max-w-lg">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#0A0A0F]/10 text-[#0A0A0F]/40"
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

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function WorkPageContent() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? allProjects
      : allProjects.filter((p) => p.tags.includes(activeTag));

  const featured = activeTag === "All" ? filtered[0] : null;
  const rest = activeTag === "All" ? filtered.slice(1) : filtered;

  return (
    <div className="bg-white min-h-screen">

      {/* ── Page header ── */}
      <section className="pt-36 pb-14 px-8 max-w-7xl mx-auto border-b border-[#0A0A0F]/08">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-4">
              Selected Work
            </p>
            <h1
              className="font-bold text-[#0A0A0F] leading-none"
              style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)", letterSpacing: "-0.04em" }}
            >
              Work that
              <br />
              <em className="text-[#E63327] not-italic">speaks.</em>
            </h1>
          </div>
          <p className="text-[#0A0A0F]/45 text-sm max-w-xs leading-relaxed md:pb-3">
            {allProjects.length} projects across brand, performance, web & content.
          </p>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#0A0A0F]/08 px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center flex-wrap gap-x-8 gap-y-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`relative text-[11px] font-mono uppercase tracking-[0.18em] transition-colors duration-200 pb-1 ${
                  activeTag === tag
                    ? "text-[#E63327]"
                    : "text-[#0A0A0F]/35 hover:text-[#0A0A0F]/70"
                }`}
              >
                {tag}
                {activeTag === tag && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[#E63327]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="max-w-7xl mx-auto px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div key={activeTag}>

            {/* Featured card — first project when showing all */}
            {featured && <FeaturedCard project={featured} />}

            {/* Row list for remaining projects */}
            <div className={featured ? "mt-2" : ""}>
              {rest.map((project, i) => (
                <ProjectRow
                  key={project.slug}
                  project={project}
                  index={featured ? i + 1 : i}
                />
              ))}
            </div>

          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-8 border-t border-[#0A0A0F]/08">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-4">
              Start a project
            </p>
            <h2
              className="font-bold text-[#0A0A0F] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.04em" }}
            >
              Your brand,
              <br />
              <span className="text-[#E63327]">next.</span>
            </h2>
          </div>
          <div className="flex gap-4 items-center md:pb-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#E63327] text-white font-bold px-8 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-[#B5261B] transition-colors duration-200"
              style={{ boxShadow: "0 0 24px rgba(230,51,39,0.25)" }}
            >
              Let's Talk
              <ArrowUpRight size={14} />
            </Link>
            <a
              href="mailto:hello@branddaid.com"
              className="text-[#0A0A0F]/40 text-sm font-mono hover:text-[#E63327] transition-colors"
            >
              hello@branddaid.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
