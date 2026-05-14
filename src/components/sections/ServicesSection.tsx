"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    num: "01",
    title: "Brand Strategy",
    tags: ["Identity", "Positioning", "Guidelines"],
    slug: "brand-strategy",
  },
  {
    num: "02",
    title: "Web Design & Development",
    tags: ["Next.js", "3D / Three.js", "CMS"],
    slug: "web-design",
  },
  {
    num: "03",
    title: "Digital Marketing",
    tags: ["Meta", "Google Ads", "SEO"],
    slug: "digital-marketing",
  },
  {
    num: "04",
    title: "Performance Analytics",
    tags: ["Dashboards", "A/B Testing", "Attribution"],
    slug: "analytics",
  },
  {
    num: "05",
    title: "Content Creation",
    tags: ["Photography", "Video", "Copywriting"],
    slug: "content",
  },
  {
    num: "06",
    title: "Creative Direction",
    tags: ["Campaigns", "Art Direction", "Launches"],
    slug: "creative-direction",
  },
];

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-white py-32">
      <div className="max-w-[1440px] mx-auto px-8">

        {/* Header row */}
        <div className="flex items-end justify-between mb-16 border-b border-[#3D3222] pb-8">
          <AnimatedSection>
            <h2 className="font-heading text-display-md font-bold text-[#F5F5FA] leading-none tracking-[-0.03em]">
              What we do
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Link
              href="/services"
              className="text-label text-[#8B7E6E] border-b border-[#4D4232] hover:border-[#E63327] hover:text-[#E63327] pb-0.5 transition-all"
            >
              All Services
            </Link>
          </AnimatedSection>
        </div>

        {/* Numbered list — full width rows */}
        <div>
          {services.map((service, i) => (
            <AnimatedSection key={service.slug} delay={i * 0.06}>
              <motion.div
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className="group relative border-b border-[#3D3222] last:border-b-0"
              >
                {/* Hover background fill */}
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 bg-[#E63327]/8 rounded-none pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                <Link
                  href={`/services#${service.slug}`}
                  className="relative flex items-center justify-between py-7 gap-6"
                >
                  {/* Number */}
                  <span className="text-label text-[#4D4232] w-8 flex-shrink-0">
                    {service.num}
                  </span>

                  {/* Title */}
                  <span className="font-heading text-2xl md:text-3xl font-bold text-[#F5F5FA] flex-1 group-hover:text-[#E63327] transition-colors duration-300">
                    {service.title}
                  </span>

                  {/* Tags — hidden on mobile */}
                  <div className="hidden md:flex gap-2 flex-wrap justify-end">
                    {service.tags.map((t) => (
                      <span
                        key={t}
                        className="text-label text-[#4D4232] group-hover:text-[#8B7E6E] transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <motion.div
                    animate={{ opacity: hovered === i ? 1 : 0, x: hovered === i ? 0 : -8 }}
                    transition={{ duration: 0.2 }}
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                  >
                    <ArrowUpRight size={16} className="text-[#E63327]" />
                  </motion.div>
                </Link>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
