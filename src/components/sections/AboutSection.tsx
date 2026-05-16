"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const stats = [
  { value: "120+", label: "Projects" },
  { value: "40+", label: "Clients" },
  { value: "5+", label: "Years" },
  { value: "98%", label: "Satisfaction" },
];

export default function AboutSection() {
  return (
    <section className="py-32 bg-[#F5EFE6]">
      <div className="max-w-[1440px] mx-auto px-8">

        {/* Top rule + label */}
        <div className="flex items-center gap-6 mb-20 border-t border-[#1C1C1C]/8 pt-8">
          <span className="text-label text-[#1C1C1C]/45">About</span>
          <span className="flex-1 h-px bg-[#D4CAB8]" />
          <span className="text-label text-[#1C1C1C]/45">BRANDD-AID</span>
        </div>

        {/* Editorial two-column */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: big statement */}
          <AnimatedSection direction="left">
            <h2 className="font-heading text-display-md font-bold text-foreground leading-[1.0] tracking-[-0.03em]">
              Marketing that
              <br />
              feels like{" "}
              <span className="italic text-[#D64545]">art.</span>
            </h2>
          </AnimatedSection>

          {/* Right: text + stats */}
          <AnimatedSection delay={0.15}>
            <p className="text-[#1C1C1C]/60 text-lg leading-relaxed mb-8 max-w-md">
              BRANDD-AID was built on a single frustration — most marketing
              looks the same. We fuse strategic rigour with cinematic execution
              to create brands that don&apos;t just compete, they lead.
            </p>
            <p className="text-[#1C1C1C]/45 leading-relaxed mb-12 max-w-md">
              Founded in 2019, we&apos;ve grown from a two-person studio to a
              full-service team of 12 specialists serving brands across India.
            </p>

            {/* Inline stats row */}
            <div className="grid grid-cols-4 gap-0 border-t border-[#1C1C1C]/8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }}
                  className="pt-5 pr-4 border-r border-[#1C1C1C]/8 last:border-r-0"
                >
                  <div className="font-heading text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="text-label text-[#1C1C1C]/45 mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-label text-foreground border-b border-foreground/30 hover:border-[#D64545] hover:text-[#D64545] pb-0.5 transition-all"
              >
                Our Story
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
