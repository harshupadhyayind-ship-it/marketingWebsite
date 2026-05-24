import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { fetchProjects } from "@/lib/projects-data";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await fetchProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projects = await fetchProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — BRANDD-AID`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projects = await fetchProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen" style={{ background: "#0D0F1C" }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden border-b border-white/8"
        style={{
          background: `linear-gradient(135deg, ${project.color}18 0%, rgba(107,78,255,0.08) 50%, #0D0F1C 80%)`,
        }}
      >
        {/* Orb glow behind title */}
        <div
          className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${project.color}18 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />

        {/* Giant initial watermark */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-black leading-none pointer-events-none select-none"
          style={{ fontSize: "clamp(14rem, 28vw, 36rem)", color: project.color, opacity: 0.07, letterSpacing: "-0.06em" }}
        >
          {project.client.charAt(0)}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-20">
          {/* Back link */}
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-white/45 text-xs font-mono uppercase tracking-widest hover:text-[#D64545] transition-colors duration-200 mb-12"
          >
            <ArrowLeft size={13} />
            All Work
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-6" style={{ background: project.color }} />
            <span className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: project.color }}>
              {project.category} · {project.year}
            </span>
          </div>

          <h1
            className="font-black text-white leading-none mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 8rem)", letterSpacing: "-0.04em" }}
          >
            {project.title}
          </h1>

          <p className="text-white/55 text-xl max-w-xl leading-relaxed mb-10">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 text-white/45"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULT BANNER ── */}
      <section className="border-b border-white/8" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex items-center gap-4">
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono font-medium text-sm"
            style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}30` }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: project.color }} />
            {project.result}
          </span>
        </div>
      </section>

      {/* ── CHALLENGE / SOLUTION ── */}
      <section className="py-24 border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-6 bg-[#D64545]" />
              <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em]">The Challenge</p>
            </div>
            <p className="text-white/65 text-lg leading-relaxed">{project.challenge}</p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-6 bg-[#D64545]" />
              <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em]">Our Solution</p>
            </div>
            <p className="text-white/65 text-lg leading-relaxed">{project.solution}</p>
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="py-24 border-b border-white/8" style={{ background: "linear-gradient(180deg, #0D0F1C 0%, #12142A 50%, #0D0F1C 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="h-px w-6 bg-[#D64545]" />
            <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em]">Results</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8">
            {project.results.map((r) => (
              <div key={r.metric} className="bg-[#12142A] p-8 hover:bg-[#1a1c35] transition-colors duration-300">
                <div
                  className="font-black leading-none mb-2"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.04em", color: project.color }}
                >
                  {r.value}
                </div>
                <div className="text-white/45 text-xs font-mono uppercase tracking-widest">{r.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24 border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-12">
            <span className="h-px w-6 bg-[#D64545]" />
            <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em]">Our Process</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
            {project.process.map((step) => (
              <div key={step.step} className="bg-[#0D0F1C] p-8 relative overflow-hidden group hover:bg-[#12142A] transition-colors duration-300">
                {/* Left accent bar */}
                <span
                  className="absolute left-0 top-0 bottom-0 w-[3px] transition-transform duration-300 origin-bottom scale-y-0 group-hover:scale-y-100"
                  style={{ background: project.color }}
                />
                <span className="font-mono text-xs mb-4 block" style={{ color: project.color }}>{step.step}</span>
                <h4
                  className="font-black text-white mb-3 leading-tight"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", letterSpacing: "-0.03em" }}
                >
                  {step.title}
                </h4>
                <p className="text-white/55 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 border-b border-white/8" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-6 bg-[#D64545]" />
            <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em]">Services Delivered</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.services.map((s) => (
              <span
                key={s}
                className="text-sm font-mono px-5 py-2.5"
                style={{
                  border: `1px solid ${project.color}40`,
                  color: project.color,
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-32 px-6 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0D0F1C 0%, rgba(214,69,69,0.05) 50%, #0D0F1C 100%)" }}
      >
        {/* Orb */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${project.color}12 0%, transparent 60%)`,
            filter: "blur(40px)",
          }}
        />
        <div className="relative z-10">
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-6">Ready to grow?</p>
          <h2
            className="font-black text-white mb-10 leading-none"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", letterSpacing: "-0.05em" }}
          >
            Let&apos;s build yours
            <br />
            <span style={{ color: project.color }}>next.</span>
          </h2>
          <Link
            href="/#contact"
            className="inline-block text-white font-bold px-12 py-5 text-sm uppercase tracking-widest transition-all duration-200 hover:opacity-85"
            style={{
              background: project.color,
              clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
              boxShadow: `0 12px 40px ${project.color}40`,
            }}
          >
            Start a Project →
          </Link>
        </div>
      </section>

    </div>
  );
}
