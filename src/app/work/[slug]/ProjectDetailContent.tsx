"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import CTASection from "@/components/sections/CTASection";
import { allProjects, type Project } from "@/lib/projects-data";

const projectDetails: Record<
  string,
  {
    challenge: string;
    solution: string;
    results: { metric: string; value: string }[];
    services: string[];
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
  },
};

export default function ProjectDetailContent({ project }: { project: Project }) {
  const detail = projectDetails[project.slug];
  const related = allProjects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#2C2416] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top right, ${project.color}20, transparent 70%)`,
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[#8B7E6E] hover:text-[#9CAF88] text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Work
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-sage text-sm font-medium uppercase tracking-widest">
                {project.category}
              </span>
              <span className="text-[#4D4232]">·</span>
              <span className="text-[#8B7E6E] text-sm">{project.year}</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-[#F5F1E8] leading-tight mb-6 max-w-4xl">
              {project.title}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-[#3D3222] border-[#4D4232] text-[#9CAF88] text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </AnimatedSection>

          {/* Result banner */}
          <AnimatedSection delay={0.25}>
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
              style={{ backgroundColor: `${project.color}20`, border: `1px solid ${project.color}30` }}
            >
              <span className="font-heading text-2xl font-bold" style={{ color: project.color }}>
                {project.result}
              </span>
              <span className="text-[#8B7E6E] text-sm">Key result</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Hero visual */}
      <section className="bg-beige-dark py-12">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div
              className="w-full rounded-3xl h-72 md:h-96 flex items-center justify-center relative overflow-hidden shadow-warm-lg"
              style={{ background: `linear-gradient(135deg, ${project.color}40, ${project.color}15)` }}
            >
              <div
                className="w-28 h-28 rounded-3xl flex items-center justify-center text-5xl font-heading font-bold text-white shadow-warm-lg"
                style={{ backgroundColor: project.color }}
              >
                {project.client.charAt(0)}
              </div>

              {/* Decorative 3D-ish elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-8 right-16 w-20 h-20 rounded-full border-2 opacity-20"
                style={{ borderColor: project.color }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-8 left-16 w-14 h-14 rounded-xl border-2 opacity-15"
                style={{ borderColor: project.color }}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Case study content */}
      <section className="py-20 bg-beige">
        <div className="max-w-4xl mx-auto px-6">
          {detail && (
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <AnimatedSection direction="left">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">The Challenge</h2>
                <p className="text-stone leading-relaxed">{detail.challenge}</p>
              </AnimatedSection>
              <AnimatedSection direction="right" delay={0.1}>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Solution</h2>
                <p className="text-stone leading-relaxed">{detail.solution}</p>
              </AnimatedSection>
            </div>
          )}

          {/* Results grid */}
          {detail?.results && (
            <AnimatedSection>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Results</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                {detail.results.map((r) => (
                  <div
                    key={r.metric}
                    className="rounded-2xl bg-white border border-beige-dark p-5 text-center shadow-warm"
                  >
                    <div className="font-heading text-2xl font-bold text-sage mb-1">{r.value}</div>
                    <div className="text-stone text-xs">{r.metric}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Services used */}
          {detail?.services && (
            <AnimatedSection delay={0.1}>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Services Delivered</h2>
              <div className="flex flex-wrap gap-2 mb-12">
                {detail.services.map((s) => (
                  <Badge
                    key={s}
                    className="bg-sage/10 text-sage border-sage/20"
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Related projects */}
      <section className="py-16 bg-beige-dark border-t border-beige-darker">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">More Work</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6">
            {related.map((p, i) => (
              <AnimatedSection key={p.slug} delay={i * 0.1}>
                <Link href={`/work/${p.slug}`} className="block group">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl bg-white border border-beige-dark p-6 shadow-warm hover:shadow-warm-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-stone text-xs font-medium uppercase tracking-wider">{p.category}</span>
                      <ArrowUpRight size={14} className="text-stone group-hover:text-sage transition-colors" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-sage transition-colors">
                      {p.title}
                    </h3>
                    <div className="mt-2 text-xs font-semibold text-sage">{p.result}</div>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
