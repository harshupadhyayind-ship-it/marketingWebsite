"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ArrowUpRight } from "lucide-react";

type ServiceItem = {
  num: string;
  title: string;
  tags: string[];
  slug: string;
};

export default function ServicesSection({ services }: { services: ServiceItem[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-[#F5EFE6] py-32">
      <div className="max-w-[1440px] mx-auto px-8">

        {/* Header row */}
        <div className="flex items-end justify-between mb-16 border-b border-[#1C1C1C]/08 pb-8">
          <AnimatedSection>
            <h2 className="font-heading text-display-md font-bold text-[#1C1C1C] leading-none tracking-[-0.03em]">
              What we do
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Link
              href="/services"
              className="text-label text-[#1C1C1C]/45 border-b border-[#1C1C1C]/20 hover:border-[#D64545] hover:text-[#D64545] pb-0.5 transition-all"
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
                className="group relative border-b border-[#1C1C1C]/08 last:border-b-0"
              >
                {/* Hover background fill */}
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 bg-[#D64545]/05 rounded-none pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                <Link
                  href={`/services#${service.slug}`}
                  className="relative flex items-center justify-between py-7 gap-6"
                >
                  {/* Number */}
                  <span className="text-label text-[#D64545]/60 font-mono w-8 flex-shrink-0">
                    {service.num}
                  </span>

                  {/* Title */}
                  <span className="font-heading text-2xl md:text-3xl font-bold text-[#1C1C1C] flex-1 group-hover:text-[#D64545] transition-colors duration-300">
                    {service.title}
                  </span>

                  {/* Tags — hidden on mobile */}
                  <div className="hidden md:flex gap-2 flex-wrap justify-end">
                    {service.tags.map((t) => (
                      <span
                        key={t}
                        className="text-label text-[#1C1C1C]/35 group-hover:text-[#1C1C1C]/55 transition-colors"
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
                    <ArrowUpRight size={16} className="text-[#D64545]" />
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
