"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ArrowUpRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-[#2C2416] py-32 relative overflow-hidden">

      {/* Ambient 3D-like orb glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9CAF88]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-8 relative z-10">

        {/* Top rule */}
        <div className="border-t border-[#3D3222] pb-16 pt-0" />

        {/* Oversized heading */}
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-display font-bold text-[#F5F1E8] leading-[0.92] tracking-[-0.04em]"
          >
            Ready to grow?
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-display font-bold text-[#9CAF88] italic leading-[0.92] tracking-[-0.04em]"
          >
            Let&apos;s talk.
          </motion.h2>
        </div>

        {/* Bottom row */}
        <AnimatedSection delay={0.3}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-t border-[#3D3222] pt-10">
            <p className="text-[#8B7E6E] max-w-xs leading-relaxed">
              Tell us about your brand and we&apos;ll respond within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a
                href="mailto:hello@chronogrowth.in"
                className="text-label text-[#8B7E6E] hover:text-[#9CAF88] transition-colors border-b border-[#4D4232] hover:border-[#9CAF88] pb-0.5"
              >
                hello@chronogrowth.in
              </a>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-[#9CAF88] text-[#2C2416] font-semibold px-7 py-3.5 rounded-full hover:bg-[#B8C9A8] transition-colors"
              >
                Start a Project
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
