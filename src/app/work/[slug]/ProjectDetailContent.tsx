"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import TiltCard from "@/components/ui/TiltCard";
import { allProjects, type Project } from "@/lib/projects-data";

const HeroShapes = dynamic(() => import("@/components/three/HeroShapes"), { ssr: false });

const projectDetails: Record<
  string,
  {
    challenge: string;
    solution: string;
    results: { metric: string; value: string }[];
    services: string[];
    process: { step: string; title: string; desc: string }[];
  }
> = {
  "verdant-rebrand": {
    challenge:
      "Verdant Wellness had a strong product but a fragmented brand presence — inconsistent visuals, low search visibility, and a website that didn't reflect their premium positioning.",
    solution:
      "We rebuilt the brand from the ground up: new logo, visual system, and brand voice, followed by a Next.js website with a dedicated content strategy focused on wellness SEO.",
    results: [
      { metric: "Organic Traffic", value: "+340%" },
      { metric: "Bounce Rate", value: "-52%" },
      { metric: "Time on Site", value: "+3.2 min" },
      { metric: "Lead Enquiries", value: "+180%" },
    ],
    services: ["Brand Identity", "Web Design & Dev", "SEO Strategy", "Content Direction"],
    process: [
      { step: "01", title: "Discovery", desc: "Brand audit, competitor analysis, and stakeholder interviews to map the brand gap." },
      { step: "02", title: "Strategy", desc: "Defined brand positioning, target audience personas, and a unique brand narrative." },
      { step: "03", title: "Design", desc: "Created the full visual identity — logo, colour system, typography, and component library." },
      { step: "04", title: "Build & Launch", desc: "Engineered the Next.js site and deployed a 6-month SEO content plan." },
    ],
  },
  "lumina-launch": {
    challenge:
      "Lumina Tech was launching a new B2C product with aggressive revenue targets and a short 30-day window to prove market fit.",
    solution:
      "We ran a full-funnel paid campaign across Meta and Google with creative direction, influencer seeding, and a dedicated landing page built for conversion.",
    results: [
      { metric: "Revenue (30 days)", value: "₹2 Crore" },
      { metric: "CPA Reduction", value: "-40%" },
      { metric: "ROAS", value: "5.8×" },
      { metric: "Media Impressions", value: "12M+" },
    ],
    services: ["Paid Media", "Creative Direction", "Landing Page", "Influencer Co-ord"],
    process: [
      { step: "01", title: "Brief & Research", desc: "Deep competitor and audience research to understand the whitespace and buying triggers." },
      { step: "02", title: "Creative Dev", desc: "Produced 40+ ad creatives across formats — statics, videos, and UGC-style content." },
      { step: "03", title: "Campaign Launch", desc: "Launched across Meta and Google with structured A/B tests for audiences, creatives, and bids." },
      { step: "04", title: "Optimise & Scale", desc: "Daily optimisation cycles scaled winning creatives 10× within 2 weeks." },
    ],
  },
  "artisan-co": {
    challenge:
      "Artisan & Co. had a dated Shopify store and poor paid media performance — high spend, low returns.",
    solution:
      "We rebuilt the Shopify theme for speed and conversion, overhauled their Google Shopping and Meta ads structure, and implemented full attribution tracking.",
    results: [
      { metric: "ROAS", value: "1.1× → 4.2×" },
      { metric: "Conversion Rate", value: "+2.8%" },
      { metric: "Page Speed", value: "98 Lighthouse" },
      { metric: "Revenue Growth", value: "+220%" },
    ],
    services: ["Shopify Dev", "Paid Media", "SEO", "Analytics Setup"],
    process: [
      { step: "01", title: "Audit", desc: "Full technical and conversion audit — identified 14 critical drop-off points." },
      { step: "02", title: "Store Rebuild", desc: "Custom Shopify Liquid theme with performance-first architecture and conversion UX." },
      { step: "03", title: "Ads Overhaul", desc: "Restructured Google Shopping and Meta campaigns with proper audience segmentation." },
      { step: "04", title: "Attribution", desc: "Implemented GA4 + server-side tracking for full multi-channel visibility." },
    ],
  },
  "horizon-fin": {
    challenge:
      "Horizon Finance needed to build brand trust and audience in a sceptical fintech space without relying on paid spend.",
    solution:
      "We built a 12-month organic content strategy: educational long-form content, a weekly newsletter, and a social media playbook focused on LinkedIn and Instagram.",
    results: [
      { metric: "New Followers", value: "180,000" },
      { metric: "Organic Reach/Month", value: "4.2M" },
      { metric: "Newsletter Subscribers", value: "28,000" },
      { metric: "Brand Search Volume", value: "+560%" },
    ],
    services: ["Content Strategy", "Social Media Mgmt", "Newsletter", "Copywriting"],
    process: [
      { step: "01", title: "Content Audit", desc: "Mapped the competitive landscape and found the trust and education gap in fintech content." },
      { step: "02", title: "Playbook", desc: "Built a 12-month editorial calendar with SEO-aligned topics and social content pillars." },
      { step: "03", title: "Production", desc: "Weekly long-form articles, daily LinkedIn content, and bi-weekly newsletter dispatches." },
      { step: "04", title: "Community", desc: "Turned content into community — comments, reposts, and DMs drove organic compounding growth." },
    ],
  },
  "bloom-beauty": {
    challenge:
      "Bloom Beauty launched with no brand presence and needed to build an audience from zero in a crowded beauty market.",
    solution:
      "End-to-end brand creation — identity, packaging direction, and a content-first social launch strategy tailored for Gen-Z beauty consumers.",
    results: [
      { metric: "Instagram Followers (3m)", value: "50,000" },
      { metric: "Engagement Rate", value: "8.4%" },
      { metric: "UGC Pieces", value: "2,400+" },
      { metric: "Earned Media Value", value: "₹45L" },
    ],
    services: ["Brand Identity", "Content Creation", "Social Strategy", "Influencer"],
    process: [
      { step: "01", title: "Brand Build", desc: "Created identity, tone of voice, and aesthetic direction for a Gen-Z beauty audience." },
      { step: "02", title: "Content System", desc: "Developed repeatable content formats and a visual grid strategy for Instagram." },
      { step: "03", title: "Launch Campaign", desc: "Seeded 30+ micro-influencers for launch week — 400K reach in 48 hours." },
      { step: "04", title: "Community Growth", desc: "UGC repurposing strategy and comment engagement turned followers into advocates." },
    ],
  },
  "nexus-saas": {
    challenge:
      "Nexus had a solid product but relied entirely on cold outbound. They needed scalable inbound growth.",
    solution:
      "We built an inbound engine: a topic-cluster SEO strategy, gated lead magnets, and a dashboard to track MRR attribution by channel.",
    results: [
      { metric: "MRR Growth (8m)", value: "3×" },
      { metric: "Organic Leads/Month", value: "+800" },
      { metric: "CAC Reduction", value: "-55%" },
      { metric: "DA Improvement", value: "22 → 51" },
    ],
    services: ["SEO Strategy", "Content Marketing", "Analytics", "Lead Gen"],
    process: [
      { step: "01", title: "SEO Architecture", desc: "Built a topic-cluster model across 8 core keyword verticals with 200+ target terms." },
      { step: "02", title: "Content Engine", desc: "6 long-form articles/month plus supporting cluster posts optimised for intent." },
      { step: "03", title: "Lead Magnets", desc: "Created 4 gated tools and templates that converted organic traffic into qualified leads." },
      { step: "04", title: "Attribution", desc: "Custom Looker Studio dashboard connecting SEO, content, and MRR in one view." },
    ],
  },
};

export default function ProjectDetailContent({ project }: { project: Project }) {
  const detail = projectDetails[project.slug];
  const related = allProjects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <div className="bg-white min-h-screen">

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
              className="inline-flex items-center gap-2 text-[#0A0A0F]/40 hover:text-[#E63327] text-xs font-mono uppercase tracking-widest mb-12 transition-colors duration-200"
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
            <span className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em]">
              {project.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#0A0A0F]/20" />
            <span className="text-[#0A0A0F]/35 text-[10px] font-mono">{project.year}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold text-[#0A0A0F] leading-none mb-8"
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
                className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#0A0A0F]/10 text-[#0A0A0F]/45"
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
            <p className="text-[#0A0A0F]/45 mt-4 text-sm max-w-md mx-auto leading-relaxed">
              {project.description}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Challenge + Solution ── */}
      {detail && (
        <section className="max-w-7xl mx-auto px-8 py-20 border-t border-[#0A0A0F]/08">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
                The Challenge
              </p>
              <h2
                className="font-bold text-[#0A0A0F] mb-6 leading-tight"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "-0.03em" }}
              >
                What we were up against
              </h2>
              <p className="text-[#0A0A0F]/55 leading-relaxed">{detail.challenge}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
                Our Solution
              </p>
              <h2
                className="font-bold text-[#0A0A0F] mb-6 leading-tight"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", letterSpacing: "-0.03em" }}
              >
                How we solved it
              </h2>
              <p className="text-[#0A0A0F]/55 leading-relaxed">{detail.solution}</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Results ── */}
      {detail?.results && (
        <section className="max-w-7xl mx-auto px-8 py-20 border-t border-[#0A0A0F]/08">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-4">
              Results
            </p>
            <h2
              className="font-bold text-[#0A0A0F] leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}
            >
              Numbers that matter.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#0A0A0F]/08">
            {detail.results.map((r, i) => (
              <motion.div
                key={r.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="bg-white p-8 md:p-10 flex flex-col justify-between h-full">
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
                  <div className="text-[#0A0A0F]/45 text-xs font-mono uppercase tracking-widest">
                    {r.metric}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Process ── */}
      {detail?.process && (
        <section className="border-t border-[#0A0A0F]/08">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em]">
              How We Did It
            </p>
          </div>
          {detail.process.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-[#0A0A0F]/08 px-8 py-10 max-w-7xl mx-auto flex gap-8 md:gap-16 items-start"
            >
              <span className="text-[#E63327] font-mono text-sm flex-shrink-0 pt-1 w-8">{step.step}</span>
              <div className="flex-1 flex flex-col md:flex-row md:items-start gap-3 md:gap-16">
                <h3
                  className="font-bold text-[#0A0A0F] flex-shrink-0 md:w-48"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", letterSpacing: "-0.02em" }}
                >
                  {step.title}
                </h3>
                <p className="text-[#0A0A0F]/55 leading-relaxed flex-1">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>
      )}

      {/* ── Services ── */}
      {detail?.services && (
        <section className="max-w-7xl mx-auto px-8 py-20 border-t border-[#0A0A0F]/08">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-8">
              Services Delivered
            </p>
            <div className="flex flex-wrap gap-3">
              {detail.services.map((s) => (
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
      <section className="border-t border-[#0A0A0F]/08 py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-4">
              More Work
            </p>
            <h2
              className="font-bold text-[#0A0A0F] leading-tight"
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
                    className="relative overflow-hidden rounded-2xl border border-[#0A0A0F]/08 p-10 cursor-pointer group"
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
                        <ArrowUpRight size={14} className="text-[#0A0A0F]/30 group-hover:text-[#E63327] transition-colors duration-200" />
                      </div>
                      <h3
                        className="font-bold text-[#0A0A0F] group-hover:text-[#E63327] transition-colors duration-200 leading-tight mb-4"
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
