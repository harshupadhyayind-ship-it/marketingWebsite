"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface SceneContent {
  tag: string;
  headline: React.ReactNode;
  sub: string;
  cta?: { label: string; href: string; primary?: boolean };
  extras?: React.ReactNode;
}

const SCENES: SceneContent[] = [
  // 0 — Hero (progress 0.00–0.18)
  {
    tag: "Premium Marketing Agency · Mumbai, India",
    headline: (
      <>
        We build brands
        <br />
        <span className="italic text-[#9CAF88]">that command</span>
        <br />
        attention.
      </>
    ),
    sub: "Strategy, design & performance marketing for ambitious Indian brands.",
    cta: { label: "View Our Work", href: "/work" },
  },
  // 1 — About (progress 0.18–0.38)
  {
    tag: "About ChronoGrowth",
    headline: (
      <>
        A decade of building
        <br />
        <span className="italic text-[#9CAF88]">India&apos;s boldest</span>
        <br />
        brands.
      </>
    ),
    sub: "From brand identity to full-stack digital marketing, we partner with ambitious companies that want to lead their market.",
    extras: (
      <div className="flex gap-10 mt-8">
        {[["150+", "Brands"], ["12", "Industries"], ["4×", "Awards"]].map(([num, label]) => (
          <div key={label}>
            <div className="font-heading text-3xl font-bold text-[#F5F1E8]">{num}</div>
            <div className="text-[#9CAF88] text-xs uppercase tracking-widest mt-1">{label}</div>
          </div>
        ))}
      </div>
    ),
  },
  // 2 — Services (progress 0.38–0.62)
  {
    tag: "What We Do",
    headline: (
      <>
        Everything your
        <br />
        <span className="italic text-[#9CAF88]">brand needs</span>
        <br />
        to grow.
      </>
    ),
    sub: "End-to-end marketing across strategy, creative, and performance channels.",
    extras: (
      <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3">
        {["Brand Strategy", "Creative Design", "Performance Marketing", "Content Creation", "Social Media", "SEO & Growth"].map((s) => (
          <li key={s} className="flex items-center gap-2 text-[#F5F1E8]/80 text-sm">
            <span className="w-1 h-1 rounded-full bg-[#9CAF88] inline-block" />
            {s}
          </li>
        ))}
      </ul>
    ),
    cta: { label: "All Services", href: "/services" },
  },
  // 3 — Work (progress 0.62–0.82)
  {
    tag: "Featured Work",
    headline: (
      <>
        Projects we&apos;re
        <br />
        <span className="italic text-[#9CAF88]">proud of.</span>
      </>
    ),
    sub: "A selection of campaigns, identities, and digital experiences built for market leaders.",
    extras: (
      <div className="mt-8 flex flex-wrap gap-3">
        {["Verdant Rebrand", "Lumina Launch", "Artisan Co.", "Horizon Fin", "Bloom Beauty", "Nexus SaaS"].map((name) => (
          <span key={name} className="text-xs uppercase tracking-widest text-[#9CAF88] border border-[#9CAF88]/30 px-3 py-1 rounded-full">
            {name}
          </span>
        ))}
      </div>
    ),
    cta: { label: "See All Work", href: "/work" },
  },
  // 4 — Contact (progress 0.82–1.00)
  {
    tag: "Let&apos;s Talk",
    headline: (
      <>
        Ready to
        <br />
        <span className="italic text-[#9CAF88]">grow?</span>
      </>
    ),
    sub: "Tell us about your brand and we'll craft a strategy that delivers real results.",
    cta: { label: "Start a Project", href: "/contact", primary: true },
    extras: (
      <a
        href="mailto:hello@chronogrowth.in"
        className="mt-4 flex items-center gap-2 text-[#9CAF88] hover:text-[#B8C9A8] transition-colors text-sm"
      >
        hello@chronogrowth.in
        <ArrowUpRight size={12} />
      </a>
    ),
  },
];

const SCENE_RANGES = [
  [0.0, 0.18],
  [0.18, 0.38],
  [0.38, 0.62],
  [0.62, 0.82],
  [0.82, 1.01],
];

function sceneOpacity(progress: number, index: number): number {
  const [start, end] = SCENE_RANGES[index];
  const fadeZone = 0.06;
  if (progress < start - fadeZone || progress > end + fadeZone) return 0;
  if (progress < start) return (progress - (start - fadeZone)) / fadeZone;
  if (progress > end) return 1 - (progress - end) / fadeZone;
  return 1;
}

export default function ScrollOverlay() {
  const progress = useScrollProgress();

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {/* Gradient backing for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B08]/80 via-transparent to-transparent pointer-events-none" />
      {SCENES.map((scene, i) => {
        const opacity = sceneOpacity(progress, i);
        const translateY = opacity < 1 ? (progress < SCENE_RANGES[i][0] ? 30 : -20) : 0;

        return (
          <div
            key={i}
            className="absolute inset-0 flex items-end pb-16 px-8 md:px-16 lg:px-24"
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              transition: "opacity 0.5s ease, transform 0.5s ease",
              pointerEvents: opacity > 0.5 ? "auto" : "none",
            }}
          >
            <div className="max-w-xl">
              {/* Tag */}
              <p className="text-[#9CAF88] uppercase tracking-[0.2em] text-xs mb-6 font-medium">
                {scene.tag}
              </p>

              {/* Headline */}
              <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold text-[#F5F1E8] leading-[1.0] tracking-tight mb-4">
                {scene.headline}
              </h2>

              {/* Sub */}
              <p className="text-[#F5F1E8]/60 text-base leading-relaxed max-w-sm">
                {scene.sub}
              </p>

              {/* Extras */}
              {scene.extras}

              {/* CTA */}
              {scene.cta && (
                <Link
                  href={scene.cta.href}
                  className={
                    scene.cta.primary
                      ? "mt-8 inline-flex items-center gap-2 bg-[#9CAF88] text-[#0D0B08] text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#B8C9A8] transition-colors"
                      : "mt-8 inline-flex items-center gap-3 text-[#F5F1E8] text-sm font-medium hover:text-[#9CAF88] transition-colors group"
                  }
                >
                  {scene.cta.label}
                  <ArrowDownRight
                    size={14}
                    className={scene.cta.primary ? "" : "group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"}
                  />
                </Link>
              )}
            </div>

            {/* Scene number indicator */}
            <div className="absolute right-8 md:right-16 bottom-16 flex flex-col items-end gap-1">
              <span className="text-[#9CAF88]/40 text-xs font-mono">
                {String(i + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        );
      })}

      {/* Scroll progress bar */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {SCENES.map((_, i) => {
          const [start, end] = SCENE_RANGES[i];
          const center = (start + end) / 2;
          const isActive = Math.abs(progress - center) < (end - start) / 2 + 0.05;
          return (
            <div
              key={i}
              className="w-px rounded-full transition-all duration-300"
              style={{
                height: isActive ? 24 : 12,
                background: isActive ? "#9CAF88" : "rgba(156,175,136,0.3)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
