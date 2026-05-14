"use client";

import Link from "next/link";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const SCENES: [number, number][] = [
  [0.00, 0.20],  // 0 — "Engineer Growth"
  [0.20, 0.44],  // 1 — "Turn data into dominance"
  [0.44, 0.64],  // 2 — Services / orbit entry
  [0.64, 0.84],  // 3 — Performance stats
  [0.84, 1.01],  // 4 — CTA
];

const HALF_FADE = 0.028;

function sceneOpacity(p: number, i: number): number {
  const [s, e] = SCENES[i];
  const isFirst = s === 0;
  const isLast  = e >= 1;
  if (p < s - HALF_FADE || p > e + HALF_FADE) return 0;
  let o = 1;
  if (!isFirst && p < s + HALF_FADE)
    o = Math.min(o, (p - (s - HALF_FADE)) / (2 * HALF_FADE));
  if (!isLast && p > e - HALF_FADE)
    o = Math.min(o, ((e + HALF_FADE) - p) / (2 * HALF_FADE));
  return Math.max(0, o);
}

function activeScene(p: number): number {
  let best = 0, bestO = -1;
  for (let i = 0; i < SCENES.length; i++) {
    const o = sceneOpacity(p, i);
    if (o > bestO) { bestO = o; best = i; }
  }
  return best;
}

function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }

function countUp(p: number, max: number, s: number, e: number): number {
  if (p <= s) return 0;
  if (p >= e) return max;
  return Math.round(max * easeOut((p - s) / (e - s)));
}

export default function ScrollOverlay() {
  const progress  = useScrollProgress();
  const active    = activeScene(progress);
  const opacities = SCENES.map((_, i) => sceneOpacity(progress, i));

  const roas       = countUp(progress, 4,   0.64, 0.80);
  const impressions= countUp(progress, 50,  0.64, 0.80);
  const revenue    = countUp(progress, 2.8, 0.64, 0.80).toFixed(1);
  const lift       = countUp(progress, 340, 0.64, 0.80);

  const graphPct = progress < 0.64 ? 0 : progress > 0.84 ? 1 : (progress - 0.64) / 0.20;
  const BARS = [14, 28, 22, 48, 38, 62, 52, 76, 68, 92];

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden select-none">
      {/* Bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.25) 35%, transparent 60%)" }}
      />

      {/* ── SCENE 0 — HERO ── */}
      <Scene opacity={opacities[0]}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          {/* Red label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-[#E63327]" />
            <span className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em]">
              Performance Marketing Agency
            </span>
            <span className="h-px w-10 bg-[#E63327]" />
          </div>

          <h1
            className="font-black text-[#0A0A0F] mb-5"
            style={{ fontSize: "clamp(3.2rem, 9vw, 9.5rem)", letterSpacing: "-0.04em", lineHeight: 0.92 }}
          >
            We don&apos;t run ads.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #FF5349 0%, #E63327 50%, #FF7A6E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              We engineer growth.
            </span>
          </h1>
          <p className="text-[#0A0A0F]/55 text-base max-w-xs leading-relaxed mb-10">
            Scroll to discover what real performance looks like.
          </p>
          <div className="flex flex-col items-center gap-2 opacity-60">
            <div className="w-px h-10 bg-[#E63327] animate-pulse" />
            <span className="text-[#E63327] text-[9px] font-mono uppercase tracking-[0.3em]">scroll</span>
          </div>
        </div>
        <BigNum>01</BigNum>
      </Scene>

      {/* ── SCENE 1 — SIGNAL ── */}
      <Scene opacity={opacities[1]}>
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-10 md:px-20">
          <Label>The Performance Signal</Label>
          <h2 className="font-black text-[#0A0A0F] mb-5"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)", letterSpacing: "-0.04em", lineHeight: 0.94 }}>
            Brands that lead<br />
            <span className="text-[#E63327]">don&apos;t hope.</span><br />
            They outperform.
          </h2>
          <p className="text-[#0A0A0F]/50 text-base max-w-md leading-relaxed">
            We find the signal in the noise — and amplify it into compounding, measurable growth.
          </p>
        </div>
        <BigNum>02</BigNum>
      </Scene>

      {/* ── SCENE 2 — ORBIT ── */}
      <Scene opacity={opacities[2]}>
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-10 md:px-20">
          <div className="grid md:grid-cols-2 gap-10 w-full items-end">
            <div>
              <Label>Entering the Growth Engine</Label>
              <h2 className="font-black text-[#0A0A0F] mb-5"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}>
                Strategy, creative<br />
                <span className="text-[#E63327]">&amp; performance</span><br />
                unified.
              </h2>
              <p className="text-[#0A0A0F]/50 text-sm max-w-xs leading-relaxed">
                Full-stack marketing — from brand positioning to paid performance — one orbit.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                ["01", "Brand Strategy & Positioning"],
                ["02", "Performance Marketing"],
                ["03", "Creative Direction"],
                ["04", "Data & Analytics"],
                ["05", "Web Design & Development"],
              ].map(([n, s]) => (
                <div key={n} className="flex items-baseline gap-4 border-b border-white/06 pb-2.5">
                  <span className="text-[#E63327] font-mono text-[10px] flex-shrink-0">{n}</span>
                  <span className="text-[#0A0A0F]/70 text-sm tracking-wide">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BigNum>03</BigNum>
      </Scene>

      {/* ── SCENE 3 — PERFORMANCE ── */}
      <Scene opacity={opacities[3]}>
        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-10 md:px-20">
          <Label>Real Results. Real Revenue.</Label>

          {/* Animated bars */}
          <div className="flex items-end gap-1 mb-8" style={{ height: 60 }}>
            {BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h * graphPct}%`,
                  background: i === BARS.length - 1
                    ? "#E63327"
                    : `rgba(230,51,39,${0.2 + (i / BARS.length) * 0.6})`,
                  minHeight: graphPct > 0 ? 2 : 0,
                  transition: "height 0.04s linear",
                  boxShadow: i === BARS.length - 1 ? "0 0 12px rgba(230,51,39,0.6)" : "none",
                }}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Stat value={`${roas}×`}   label="Average ROAS"           color="#E63327" />
            <Stat value={`${impressions}M+`} label="Monthly Impressions"  color="#FF5349" />
            <Stat value={`₹${revenue}Cr`}    label="Revenue Generated"     color="#E63327" />
            <Stat value={`${lift}%`}   label="Conversion Lift"        color="#FF5349" />
          </div>
        </div>
        <BigNum>04</BigNum>
      </Scene>

      {/* ── SCENE 4 — CTA ── */}
      <Scene opacity={opacities[4]}>
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-10 md:px-20">
          <Label>Ready to Launch</Label>
          <h2 className="font-black text-[#0A0A0F] mb-5"
            style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)", letterSpacing: "-0.04em", lineHeight: 0.93 }}>
            Build your<br />
            <span className="text-[#E63327]">growth machine.</span>
          </h2>
          <p className="text-[#0A0A0F]/50 text-base max-w-sm leading-relaxed mb-8">
            Tell us about your brand and we&apos;ll engineer a strategy that compounds.
          </p>
          <div className="flex items-center gap-5 pointer-events-auto flex-wrap">
            <Link
              href="/contact"
              className="group relative overflow-hidden bg-[#E63327] text-white font-bold px-8 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-[#FF5349] transition-colors duration-200"
              style={{ boxShadow: "0 0 30px rgba(230,51,39,0.4)" }}
            >
              Start a Project
            </Link>
            <a
              href="mailto:hello@chronogrowth.in"
              className="text-[#0A0A0F]/45 text-sm hover:text-[#E63327] transition-colors duration-200 font-mono tracking-wider"
            >
              hello@chronogrowth.in ↗
            </a>
          </div>
        </div>
        <BigNum>05</BigNum>
      </Scene>

      {/* Progress bar — right side */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 items-center">
        {SCENES.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width:  active === i ? 4   : 2,
              height: active === i ? 20  : 6,
              background: active === i ? "#E63327" : "rgba(10,10,15,0.18)",
              boxShadow:  active === i ? "0 0 8px rgba(230,51,39,0.7)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Scene({ children, opacity }: { children: React.ReactNode; opacity: number }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        opacity,
        transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1)",
        pointerEvents: opacity > 0.4 ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-6 bg-[#E63327]" />
      <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.22em]">{children}</p>
    </div>
  );
}

function BigNum({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute top-16 right-10 md:right-20 font-black text-[#0A0A0F] leading-none pointer-events-none"
      style={{ fontSize: "clamp(5rem, 12vw, 11rem)", letterSpacing: "-0.06em", opacity: 0.028 }}
    >
      {children}
    </div>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div>
      <div
        className="font-black leading-none mb-1"
        style={{ fontSize: "clamp(1.8rem, 4vw, 3.8rem)", letterSpacing: "-0.04em", color }}
      >
        {value}
      </div>
      <div className="text-[#0A0A0F]/40 text-[9px] uppercase tracking-[0.18em] font-mono">{label}</div>
    </div>
  );
}
