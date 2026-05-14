"use client";

import { useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import { useEffect } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";

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

const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered", desc: "Across 15+ industries" },
  { value: 40, suffix: "+", label: "Happy Clients", desc: "India & globally" },
  { value: 5, suffix: "+", label: "Years of Excellence", desc: "In premium marketing" },
  { value: 98, suffix: "%", label: "Client Satisfaction", desc: "Speak for themselves" },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-[#E63327]/10 border-y border-[#E63327]/15">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <AnimatedSection key={stat.label} delay={i * 0.1}>
            <div className="text-center">
              <div className="font-heading text-4xl md:text-5xl font-bold text-[#E63327] mb-1">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-semibold text-foreground text-sm mb-1">{stat.label}</div>
              <div className="text-[#0A0A0F]/45 text-xs">{stat.desc}</div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
