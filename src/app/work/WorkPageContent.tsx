"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import { allProjects } from "@/lib/projects-data";

const allTags = ["All", ...Array.from(new Set(allProjects.flatMap((p) => p.tags)))];

export default function WorkPageContent() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? allProjects
      : allProjects.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-[#2C2416] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(156,175,136,0.15),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <span className="inline-block text-sage text-sm font-medium uppercase tracking-widest mb-4">
              Our Portfolio
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-[#F5F1E8] leading-tight mb-6 max-w-3xl">
              Work that speaks
              <br />
              <span className="text-gradient">for itself</span>.
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="text-[#8B7E6E] text-xl leading-relaxed max-w-2xl">
              Case studies from brands we&apos;ve helped build, grow, and transform
              — with real results that moved the business.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-[#2C2416] border-t border-[#3D3222] sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTag === tag
                    ? "bg-sage text-white"
                    : "text-[#8B7E6E] hover:text-[#F5F1E8] hover:bg-[#3D3222]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-beige">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/work/${project.slug}`} className="block group">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-3xl overflow-hidden bg-white border border-beige-dark shadow-warm hover:shadow-warm-lg transition-shadow"
                    >
                      {/* Visual */}
                      <div
                        className="h-48 relative flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)` }}
                      >
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-heading font-bold text-white"
                          style={{ backgroundColor: project.color }}
                        >
                          {project.client.charAt(0)}
                        </div>
                        <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs font-semibold text-foreground">
                          {project.result}
                        </div>
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0">
                          <ArrowUpRight size={12} />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-stone text-xs font-medium uppercase tracking-wider">
                            {project.category}
                          </span>
                          <span className="text-stone text-xs">{project.year}</span>
                        </div>
                        <h3 className="font-heading text-base font-bold text-foreground mb-3 group-hover:text-sage transition-colors line-clamp-2">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs bg-beige-dark border-beige-darker text-stone px-2 py-0.5"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <CTASection />
    </>
  );
}
