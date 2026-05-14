"use client";
import {
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";
import { useRef, type CSSProperties } from "react";

export default function TiltCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  /* Raw mouse position as fraction 0→1 inside the element */
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  /* Spring-smoothed values */
  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  /* Map 0→1 to ±8 degrees */
  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);

  /* Glare position (percentage for CSS) */
  const glareX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(springY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    rawX.set(0.5);
    rawY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 800,
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        ...style,
      }}
    >
      {children}

      {/* Specular glare overlay */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: "inherit",
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.35) 0%, transparent 65%)`,
          mixBlendMode: "overlay",
        }}
      />
    </motion.div>
  );
}
