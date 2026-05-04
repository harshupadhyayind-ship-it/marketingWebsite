"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const y = direction === "up" ? 32 : direction === "down" ? -32 : 0;
  const x = direction === "left" ? 32 : direction === "right" ? -32 : 0;

  return (
    <motion.div
      ref={ref}
      // initial={false} on SSR prevents hydration mismatch; after mount we animate normally
      initial={mounted ? { opacity: 0, y, x } : false}
      animate={
        mounted
          ? inView
            ? { opacity: 1, y: 0, x: 0 }
            : { opacity: 0, y, x }
          : {}
      }
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
