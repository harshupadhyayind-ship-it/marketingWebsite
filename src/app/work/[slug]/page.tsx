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
    <div className="bg-[#F5EFE6] min-h-screen">

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden border-b border-[#1C1C1C]/08"
        style={{ background: `linear-gradient(135deg, ${project.color}10 0%, transparent 60%)` }}
      >
        {/* Giant initial watermark */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-black leading-none pointer-events-none select-none"
          style={{ fontSize: "clamp(14rem, 28vw, 36rem)", color: project.color, opacity: 0.06, letterSpacing: "-0.06em" }}
        >
          {project.client.charAt(0)}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-20">
          {/* Back link */}
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-[#1C1C1C]/45 text-xs font-mono uppercase tracking-widest hover:text-[#D64545] transition-colors duration-200 mb-12"
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
            className="font-black text-[#1C1C1C] leading-none mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 8rem)", letterSpacing: "-0.04em" }}
          >
            {project.title}
          </h1>

          <p className="text-[#1C1C1C]/55 text-xl max-w-xl leading-relaxed mb-10">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#1C1C1C]/10 text-[#1C1C1C]/45"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULT BANNER ── */}
      <section className="border-b border-[#1C1C1C]/08">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex items-center gap-4">
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono font-medium text-sm"
            style={{ background: `${project.color}15`, color: project.color }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: project.color }} />
            {project.result}
          </span>
        </div>
      </section>

      {/* ── CHALLENGE / SOLUTION ── */}
      <section className="py-24 border-b border-[#1C1C1C]/08">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-5">The Challenge</p>
            <p className="text-[#1C1C1C]/65 text-lg leading-relaxed">{project.challenge}</p>
          </div>
          <div>
            <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-5">Our Solution</p>
            <p className="text-[#1C1C1C]/65 text-lg leading-relaxed">{project.solution}</p>
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="py-24 border-b border-[#1C1C1C]/08">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-10">Results</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1C1C1C]/08">
            {project.results.map((r) => (
              <div key={r.metric} className="bg-[#F5EFE6] p-8">
                <div
                  className="font-black leading-none mb-2"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.04em", color: project.color }}
                >
                  {r.value}
                </div>
                <div className="text-[#1C1C1C]/45 text-xs font-mono uppercase tracking-widest">{r.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24 border-b border-[#1C1C1C]/08">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-12">Our Process</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1C1C1C]/08">
            {project.process.map((step) => (
              <div key={step.step} className="bg-[#F5EFE6] p-8">
                <span className="font-mono text-xs mb-4 block" style={{ color: project.color }}>{step.step}</span>
                <h4
                  className="font-black text-[#1C1C1C] mb-3 leading-tight"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", letterSpacing: "-0.03em" }}
                >
                  {step.title}
                </h4>
                <p className="text-[#1C1C1C]/55 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 border-b border-[#1C1C1C]/08">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-8">Services Delivered</p>
          <div className="flex flex-wrap gap-3">
            {project.services.map((s) => (
              <span
                key={s}
                className="text-sm font-mono px-5 py-2.5 rounded-sm border"
                style={{ borderColor: `${project.color}40`, color: project.color }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center">
        <p className="text-[#1C1C1C]/40 text-xs font-mono uppercase tracking-widest mb-6">Ready to grow?</p>
        <h2
          className="font-black text-[#1C1C1C] mb-10 leading-none"
          style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", letterSpacing: "-0.05em" }}
        >
          Let&apos;s build yours
          <br />
          <span style={{ color: project.color }}>next.</span>
        </h2>
        <Link
          href="/#contact"
          className="inline-block text-white font-bold px-12 py-5 rounded-sm text-sm uppercase tracking-widest transition-colors duration-200"
          style={{ background: project.color }}
        >
          Start a Project →
        </Link>
      </section>

    </div>
  );
}
