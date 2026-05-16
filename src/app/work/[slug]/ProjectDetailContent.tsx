"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import TiltCard from "@/components/ui/TiltCard";
import { allProjects, type Project } from "@/lib/projects-data";

const HeroShapes = dynamic(() => import("@/components/three/HeroShapes"), { ssr: false });

export default function ProjectDetailContent({ project }: { project: Project }) {
  const related = allProjects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <div className="bg-[#F5EFE6] min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-0 overflow-hidden">
        {/* Three.js shapes background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <HeroShapes />
        </div>
        {/* White fade at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[#1C1C1C]/40 hover:text-[#D64545] text-xs font-mono uppercase tracking-widest mb-12 transition-colors duration-200"
            >
              <ArrowLeft size={12} />
              All Work
            </Link>
          </motion.div>

          {/* Category + Year */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em]">
              {project.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#1C1C1C]/20" />
            <span className="text-[#1C1C1C]/35 text-[10px] font-mono">{project.year}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold text-[#1C1C1C] leading-none mb-8"
            style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)", letterSpacing: "-0.04em" }}
          >
            {project.title}
          </motion.h1>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="flex flex-wrap gap-2 mb-16"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#1C1C1C]/10 text-[#1C1C1C]/45"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Visual banner ── */}
      <section className="max-w-7xl mx-auto px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center"
          style={{
            minHeight: 420,
            background: `linear-gradient(135deg, ${project.color}18 0%, ${project.color}06 50%, transparent 100%)`,
            border: `1px solid ${project.color}20`,
          }}
        >
          {/* Giant initial */}
          <span
            className="absolute right-16 font-bold leading-none select-none pointer-events-none"
            style={{
              fontSize: "clamp(12rem, 28vw, 36rem)",
              color: project.color,
              opacity: 0.07,
              letterSpacing: "-0.06em",
              bottom: "-0.15em",
            }}
          >
            {project.client.charAt(0)}
          </span>

          {/* Rotating rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-20 w-24 h-24 rounded-full border pointer-events-none"
            style={{ borderColor: `${project.color}30` }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 left-20 w-16 h-16 rounded-xl border pointer-events-none"
            style={{ borderColor: `${project.color}25` }}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/3 w-10 h-10 rounded-full border pointer-events-none"
            style={{ borderColor: `${project.color}20` }}
          />

          {/* Key result badge */}
          <div className="relative z-10 text-center p-16">
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6"
              style={{ background: `${project.color}15`, border: `1px solid ${project.color}25` }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: project.color }} />
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: project.color }}>
                Key Result
              </span>
            </div>
            <div
              className="font-bold leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", letterSpacing: "-0.04em", color: project.color }}
            >
              {project.result}
            </div>
            <p className="text-[#1C1C1C]/45 mt-4 text-sm max-w-md mx-auto leading-relaxed">
              {project.description}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Challenge + Solution ── */}
      {project.challenge && (
        <section className="max-w-7xl mx-auto px-8 py-20 border-t border-[#1C1C1C]/08">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
                The Challenge
              </p>
              <h2
                className="font-bold text-[#1C1C1C] mb-6 leading-tight"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "-0.03em" }}
              >
                What we were up against
              </h2>
              <p className="text-[#1C1C1C]/55 leading-relaxed">{project.challenge}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
                Our Solution
              </p>
              <h2
                className="font-bold text-[#1C1C1C] mb-6 leading-tight"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "-0.03em" }}
              >
                How we solved it
              </h2>
              <p className="text-[#1C1C1C]/55 leading-relaxed">{project.solution}</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Results ── */}
      {project.results && (
        <section className="max-w-7xl mx-auto px-8 py-20 border-t border-[#1C1C1C]/08">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-4">
              Results
            </p>
            <h2
              className="font-bold text-[#1C1C1C] leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}
            >
              Numbers that matter.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1C1C1C]/08">
            {project.results.map((r, i) => (
              <motion.div
                key={r.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="bg-[#F5EFE6] p-8 md:p-10 flex flex-col justify-between h-full">
                  <div
                    className="font-bold leading-none mb-3"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      letterSpacing: "-0.04em",
                      color: project.color,
                    }}
                  >
                    {r.value}
                  </div>
                  <div className="text-[#1C1C1C]/45 text-xs font-mono uppercase tracking-widest">
                    {r.metric}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Process ── */}
      {project.process && (
        <section className="border-t border-[#1C1C1C]/08">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em]">
              How We Did It
            </p>
          </div>
          {project.process.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-[#1C1C1C]/08 px-8 py-10 max-w-7xl mx-auto flex gap-8 md:gap-16 items-start"
            >
              <span className="text-[#D64545] font-mono text-sm flex-shrink-0 pt-1 w-8">{step.step}</span>
              <div className="flex-1 flex flex-col md:flex-row md:items-start gap-3 md:gap-16">
                <h3
                  className="font-bold text-[#1C1C1C] flex-shrink-0 md:w-48"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", letterSpacing: "-0.02em" }}
                >
                  {step.title}
                </h3>
                <p className="text-[#1C1C1C]/55 leading-relaxed flex-1">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>
      )}

      {/* ── Services ── */}
      {project.services && (
        <section className="max-w-7xl mx-auto px-8 py-20 border-t border-[#1C1C1C]/08">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-8">
              Services Delivered
            </p>
            <div className="flex flex-wrap gap-3">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="text-xs font-mono px-4 py-2 rounded-sm border"
                  style={{ borderColor: `${project.color}40`, color: project.color }}
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ── Related projects ── */}
      <section className="border-t border-[#1C1C1C]/08 py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-4">
              More Work
            </p>
            <h2
              className="font-bold text-[#1C1C1C] leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}
            >
              Keep exploring.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {related.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/work/${p.slug}`}>
                  <TiltCard
                    className="relative overflow-hidden rounded-2xl border border-[#1C1C1C]/08 p-10 cursor-pointer group"
                    style={{
                      background: `linear-gradient(135deg, ${p.color}10 0%, transparent 60%)`,
                    }}
                  >
                    {/* Giant initial bg */}
                    <span
                      className="absolute right-6 bottom-0 font-bold leading-none select-none pointer-events-none"
                      style={{
                        fontSize: "clamp(6rem, 14vw, 14rem)",
                        color: p.color,
                        opacity: 0.07,
                        letterSpacing: "-0.06em",
                      }}
                    >
                      {p.client.charAt(0)}
                    </span>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: p.color }}>
                          {p.category}
                        </span>
                        <ArrowUpRight size={14} className="text-[#1C1C1C]/30 group-hover:text-[#D64545] transition-colors duration-200" />
                      </div>
                      <h3
                        className="font-bold text-[#1C1C1C] group-hover:text-[#D64545] transition-colors duration-200 leading-tight mb-4"
                        style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}
                      >
                        {p.title}
                      </h3>
                      <span
                        className="inline-flex items-center gap-2 text-xs font-mono font-medium px-3 py-1.5 rounded-full"
                        style={{ background: `${p.color}15`, color: p.color }}
                      >
                        <span className="w-1 h-1 rounded-full" style={{ background: p.color }} />
                        {p.result}
                      </span>
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-8 border-t border-[#1C1C1C]/08">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-4">
              Start a project
            </p>
            <h2
              className="font-bold text-[#1C1C1C] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.04em" }}
            >
              Your brand,
              <br />
              <span className="text-[#D64545]">next.</span>
            </h2>
          </div>
          <div className="flex gap-4 items-center md:pb-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#D64545] text-white font-bold px-8 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-[#8B3232] transition-colors duration-200"
              style={{ boxShadow: "0 0 24px rgba(230,51,39,0.25)" }}
            >
              Let's Talk
              <ArrowUpRight size={14} />
            </Link>
            <a
              href="mailto:hello@branddaid.com"
              className="text-[#1C1C1C]/40 text-sm font-mono hover:text-[#D64545] transition-colors"
            >
              hello@branddaid.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
