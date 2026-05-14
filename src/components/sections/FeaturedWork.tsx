"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ArrowUpRight } from "lucide-react";
import { allProjects } from "@/lib/projects-data";

const featured = allProjects.slice(0, 4);

// Colour fill per project (rich, warm tones — no black/red)
const fills = [
  "bg-[#E63327]",
  "bg-[#C5B99A]",
  "bg-[#B5261B]",
  "bg-[#B8A88A]",
];

export default function FeaturedWork() {
  return (
    <section className="bg-white py-32">
      <div className="max-w-[1440px] mx-auto px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 border-t border-[#0A0A0F]/8 pt-8">
          <AnimatedSection>
            <span className="text-label text-[#0A0A0F]/45">Selected Work</span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Link
              href="/work"
              className="group inline-flex items-center gap-1.5 text-label text-foreground border-b border-foreground/20 hover:border-[#E63327] hover:text-[#E63327] pb-0.5 transition-all"
            >
              All Projects
              <ArrowUpRight size={11} />
            </Link>
          </AnimatedSection>
        </div>

        {/* Large stacked cards — Stratedgy style */}
        <div className="space-y-6">
          {featured.map((project, i) => (
            <AnimatedSection key={project.slug} delay={i * 0.09}>
              <Link href={`/work/${project.slug}`} className="block group">
                <motion.div
                  whileHover={{ scale: 1.008 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-2xl overflow-hidden"
                >
                  {/* Full-bleed colour fill */}
                  <div
                    className={`${fills[i % fills.length]} w-full`}
                    style={{ height: i === 0 ? "520px" : "380px" }}
                  >
                    {/* Overlapping decorative geometry — gives depth / 3D feel */}
                    <div className="absolute inset-0 overflow-hidden">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-30%] right-[-10%] w-[60%] aspect-square rounded-full border border-[#0A0A0F]/10"
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-[-20%] left-[5%] w-[40%] aspect-square rounded-full border border-white/8"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-[#F5F5FA]/20" />
                    </div>

                    {/* Large letter initial */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[clamp(120px,20vw,280px)] font-bold text-[#0A0A0F]/10 leading-none select-none pointer-events-none">
                      {project.client.charAt(0)}
                    </div>

                    {/* Result badge */}
                    <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white text-xs font-medium">
                      {project.result}
                    </div>

                    {/* Arrow */}
                    <div className="absolute top-6 left-6 w-10 h-10 rounded-full border border-[#0A0A0F]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-white/20 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm">
                      <ArrowUpRight size={14} className="text-white" />
                    </div>
                  </div>

                  {/* Info strip */}
                  <div className="bg-[#F8F8F8] border-t border-[#E8E2D4] px-6 py-5 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-label text-[#0A0A0F]/45 mb-1">{project.category} · {project.year}</div>
                      <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-[#E63327] transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 flex-wrap justify-end">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-label text-[#0A0A0F]/45 border border-[#0A0A0F]/8 rounded-full px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
