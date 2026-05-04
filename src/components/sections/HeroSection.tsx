"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useEffect, useState } from "react";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#F5F1E8]">

      {/* Ambient 3D — full background, low opacity */}
      <div className="absolute inset-0 opacity-40">
        <HeroCanvas />
      </div>

      {/* Subtle radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,#F5F1E880_100%)] pointer-events-none" />

      {/* Top spacer */}
      <div />

      {/* Main content — bottom-aligned editorial layout */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 pb-12 w-full">

        {/* Overline — fade up */}
        <motion.p
          initial={mounted ? { opacity: 0, y: 10 } : false}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-label text-stone mb-8"
        >
          Premium Marketing Agency · Mumbai, India
        </motion.p>

        {/* Oversized display headline — slide up from clip */}
        <div className="overflow-hidden">
          <motion.h1
            initial={mounted ? { y: "100%" } : false}
            animate={mounted ? { y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="font-heading text-display font-bold text-foreground leading-[0.92] tracking-[-0.04em]"
          >
            We build brands
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={mounted ? { y: "100%" } : false}
            animate={mounted ? { y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.62, ease }}
            className="font-heading text-display font-bold leading-[0.92] tracking-[-0.04em]"
          >
            <span className="text-sage italic">that command</span>
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={mounted ? { y: "100%" } : false}
            animate={mounted ? { y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.74, ease }}
            className="font-heading text-display font-bold text-foreground leading-[0.92] tracking-[-0.04em]"
          >
            attention.
          </motion.h1>
        </div>

        {/* Bottom row */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <p className="text-stone text-base leading-relaxed max-w-xs">
            Strategy, design & performance marketing
            <br />
            for ambitious Indian brands.
          </p>

          <Link
            href="/work"
            className="group inline-flex items-center gap-3 text-foreground font-medium hover:text-sage transition-colors"
          >
            <span className="text-label">View Our Work</span>
            <span className="w-9 h-9 rounded-full border border-foreground/20 group-hover:border-sage group-hover:bg-sage/10 flex items-center justify-center transition-all">
              <ArrowDownRight size={14} className="group-hover:text-sage" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={mounted ? { opacity: 0 } : false}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-sage origin-top"
        />
      </motion.div>
    </section>
  );
}
