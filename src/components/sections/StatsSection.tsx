"use client";

import { useRef, useEffect } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1800, bounce: 0 });

  useEffect(() => {
    if (isInView) motionVal.set(to);
  }, [isInView, motionVal, to]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

type StatItem = { value: number; suffix: string; label: string; desc: string };

export default function StatsSection({ stats }: { stats: StatItem[] }) {
  return (
    <section className="border-t border-b border-[#1C1C1C]/08 bg-[#F5EFE6]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#1C1C1C]/08">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="px-8 py-14 flex flex-col"
          >
            <div
              className="font-bold text-[#D64545] leading-none mb-3"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", letterSpacing: "-0.04em" }}
            >
              <Counter to={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-[#1C1C1C] font-bold text-sm mb-1">{stat.label}</div>
            <div className="text-[#1C1C1C]/40 text-xs font-mono">{stat.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
