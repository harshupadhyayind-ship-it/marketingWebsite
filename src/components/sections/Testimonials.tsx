"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Priya Mehta",
    role: "CEO, Verdant Wellness",
    quote:
      "ChronoGrowth completely transformed our digital presence. Our organic traffic tripled in 6 months, and the brand identity they built is something we're genuinely proud of.",
  },
  {
    name: "Arjun Singh",
    role: "Co-founder, Lumina Tech",
    quote:
      "The product launch campaign was nothing short of spectacular. ₹2 crore in 30 days. The creative quality and strategic thinking were miles above what I'd experienced elsewhere.",
  },
  {
    name: "Rhea Kapoor",
    role: "Head of Marketing, Artisan & Co.",
    quote:
      "From our e-commerce rebuild to ongoing paid media management, ChronoGrowth has been a true partner. Our ROAS went from 1.1× to 4.2× — that changes a business.",
  },
  {
    name: "Vikram Nair",
    role: "Founder, Horizon Finance",
    quote:
      "Their content strategy for our social channels was exactly what we needed. 180,000 new followers organically in under a year. The storytelling quality is exceptional.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-32 border-t border-[#0A0A0F]/8">
      <div className="max-w-[1440px] mx-auto px-8">

        {/* Label */}
        <AnimatedSection className="mb-20">
          <span className="text-label text-[#0A0A0F]/45">Client Voices</span>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-20 items-start">

          {/* Left: navigation */}
          <AnimatedSection direction="left">
            <div className="space-y-0">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setActive(i)}
                  className={`w-full text-left py-5 border-b border-[#0A0A0F]/8 transition-all duration-200 ${
                    i === active ? "opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <div className={`font-heading font-bold transition-colors ${i === active ? "text-foreground" : "text-[#0A0A0F]/45"}`}>
                    {t.name}
                  </div>
                  <div className="text-label text-[#0A0A0F]/45 mt-0.5">{t.role}</div>
                  {i === active && (
                    <motion.div
                      layoutId="active-bar"
                      className="h-px bg-[#E63327] mt-4 w-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: quote */}
          <AnimatedSection delay={0.15}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="font-heading text-[clamp(1.5rem,3.5vw,2.8rem)] font-bold text-foreground leading-[1.2] tracking-[-0.02em] mb-12">
                  &ldquo;{testimonials[active].quote}&rdquo;
                </div>

                {/* Nav arrows */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setActive((v) => (v - 1 + testimonials.length) % testimonials.length)}
                    className="w-10 h-10 rounded-full border border-[#0A0A0F]/8 hover:border-[#E63327] hover:bg-[#E63327]/10 flex items-center justify-center transition-all"
                  >
                    <ChevronLeft size={14} className="text-[#0A0A0F]/45" />
                  </button>
                  <button
                    onClick={() => setActive((v) => (v + 1) % testimonials.length)}
                    className="w-10 h-10 rounded-full border border-[#0A0A0F]/8 hover:border-[#E63327] hover:bg-[#E63327]/10 flex items-center justify-center transition-all"
                  >
                    <ChevronRight size={14} className="text-[#0A0A0F]/45" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>
        </div>

        {/* Logos strip */}
        <AnimatedSection delay={0.2} className="mt-24 pt-12 border-t border-[#0A0A0F]/8">
          <div className="flex flex-wrap items-center gap-12 opacity-35">
            {["Verdant", "Lumina", "Artisan", "Horizon", "Bloom", "Nexus"].map((brand) => (
              <span key={brand} className="font-heading font-bold text-lg text-foreground tracking-tight">
                {brand}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
