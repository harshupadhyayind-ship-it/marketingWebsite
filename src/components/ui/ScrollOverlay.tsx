"use client";

import Link from "next/link";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/* ─────────────────────────────────────────────────────────────────────────
   Scene ranges — aligned with camera waypoints in WorldCanvas
   ───────────────────────────────────────────────────────────────────────── */
const SCENES: [number, number][] = [
  [0.00, 0.20],  // 0 — Universe: "infinite possibilities"
  [0.20, 0.44],  // 1 — Galaxy approach: "enter the marketing galaxy"
  [0.44, 0.64],  // 2 — Galaxy entry: discovery
  [0.64, 0.84],  // 3 — Performance: stats, graph, counters
  [0.84, 1.01],  // 4 — CTA: "launch your brand"
];

const HALF_FADE = 0.030;

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

/* count a stat based on scroll progress within a phase */
function countUp(p: number, max: number, phaseStart: number, phaseEnd: number): number {
  if (p <= phaseStart) return 0;
  if (p >= phaseEnd)   return max;
  const t = (p - phaseStart) / (phaseEnd - phaseStart);
  return Math.round(max * easeOut(t));
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/* ─────────────────────────────────────────────────────────────────────────
   Main export
   ───────────────────────────────────────────────────────────────────────── */
export default function ScrollOverlay() {
  const progress = useScrollProgress();
  const active   = activeScene(progress);
  const opacities = SCENES.map((_, i) => sceneOpacity(progress, i));

  // Stats that count up during phase 3 (0.64 → 0.84)
  const roas       = countUp(progress, 4,    0.64, 0.80).toFixed(0);
  const impressions= countUp(progress, 50,   0.64, 0.80);
  const revenue    = countUp(progress, 2.8,  0.64, 0.80).toFixed(1);
  const conversion = countUp(progress, 340,  0.64, 0.80);

  // Graph bar heights in phase 3
  const graphPct = progress < 0.64 ? 0 : progress > 0.84 ? 1 : (progress - 0.64) / 0.20;
  const BARS = [18, 35, 28, 52, 44, 68, 57, 80, 72, 95];

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden select-none">
      {/* Bottom gradient for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(13,11,8,0.82) 0%, rgba(13,11,8,0.18) 38%, transparent 65%)" }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          SCENE 0 — UNIVERSE
          ════════════════════════════════════════════════════════════════ */}
      <ScenePanel opacity={opacities[0]}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <Tag>Performance Marketing · Mumbai, India</Tag>
          <h1
            className="font-bold text-[#F5F1E8] mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
          >
            The universe is
            <br />
            <em className="text-[#9CAF88] not-italic">full of brands.</em>
            <br />
            Only few shine.
          </h1>
          <p className="text-[#F5F1E8]/50 text-base max-w-sm leading-relaxed">
            Scroll to enter the marketing galaxy.
          </p>
          {/* Animated scroll hint */}
          <div className="mt-10 flex flex-col items-center gap-2">
            <div
              className="w-px bg-[#9CAF88]/60 animate-pulse"
              style={{ height: 40 }}
            />
            <span className="text-[#9CAF88]/50 text-[10px] font-mono uppercase tracking-widest">scroll</span>
          </div>
        </div>
        <BigNum>01</BigNum>
      </ScenePanel>

      {/* ══════════════════════════════════════════════════════════════════
          SCENE 1 — GALAXY APPROACH
          ════════════════════════════════════════════════════════════════ */}
      <ScenePanel opacity={opacities[1]}>
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-10 md:px-20">
          <Tag>The Marketing Galaxy</Tag>
          <h2
            className="font-bold text-[#F5F1E8] mb-5"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
          >
            Every great brand
            <br />
            <em className="text-[#9CAF88] not-italic">starts with a signal</em>
            <br />
            in the noise.
          </h2>
          <p className="text-[#F5F1E8]/50 text-base max-w-md leading-relaxed">
            We find that signal, amplify it, and put your brand in orbit
            around your audience.
          </p>
        </div>
        <BigNum>02</BigNum>
      </ScenePanel>

      {/* ══════════════════════════════════════════════════════════════════
          SCENE 2 — GALAXY ENTRY
          ════════════════════════════════════════════════════════════════ */}
      <ScenePanel opacity={opacities[2]}>
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-10 md:px-20">
          <div className="grid md:grid-cols-2 gap-8 w-full items-end">
            <div>
              <Tag>Entering Orbit</Tag>
              <h2
                className="font-bold text-[#F5F1E8] mb-5"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)", letterSpacing: "-0.04em", lineHeight: 0.96 }}
              >
                Strategy, creative
                <br />
                <em className="text-[#9CAF88] not-italic">&amp; performance</em>
                <br />
                — unified.
              </h2>
              <p className="text-[#F5F1E8]/50 text-sm max-w-xs leading-relaxed">
                Brand strategy to paid media to analytics — all in one orbit.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                ["01", "Brand Strategy"],
                ["02", "Performance Marketing"],
                ["03", "Creative Direction"],
                ["04", "Analytics & Insights"],
                ["05", "Web Design & Dev"],
              ].map(([n, s]) => (
                <div key={n} className="flex items-baseline gap-4 border-b border-[#F5F1E8]/08 pb-2">
                  <span className="text-[#9CAF88] font-mono text-xs flex-shrink-0">{n}</span>
                  <span className="text-[#F5F1E8]/75 text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BigNum>03</BigNum>
      </ScenePanel>

      {/* ══════════════════════════════════════════════════════════════════
          SCENE 3 — PERFORMANCE
          ════════════════════════════════════════════════════════════════ */}
      <ScenePanel opacity={opacities[3]}>
        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-10 md:px-20">
          <Tag>Real Results. Real Growth.</Tag>

          {/* Animated graph */}
          <div className="flex items-end gap-1.5 mb-8" style={{ height: 64 }}>
            {BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm transition-none"
                style={{
                  height: `${h * graphPct}%`,
                  background: i === BARS.length - 1
                    ? "#9CAF88"
                    : `rgba(156,175,136,${0.25 + (i / BARS.length) * 0.55})`,
                  transition: "height 0.05s linear",
                  minHeight: graphPct > 0 ? 2 : 0,
                }}
              />
            ))}
          </div>

          {/* Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-2">
            <Stat
              value={`${roas}×`}
              label="Average ROAS"
              color="#9CAF88"
            />
            <Stat
              value={`${impressions}M+`}
              label="Impressions Delivered"
              color="#B8C9A8"
            />
            <Stat
              value={`₹${revenue}Cr`}
              label="Revenue Generated"
              color="#9CAF88"
            />
            <Stat
              value={`${conversion}%`}
              label="Avg. Conversion Lift"
              color="#B8C9A8"
            />
          </div>
        </div>
        <BigNum>04</BigNum>
      </ScenePanel>

      {/* ══════════════════════════════════════════════════════════════════
          SCENE 4 — CTA
          ════════════════════════════════════════════════════════════════ */}
      <ScenePanel opacity={opacities[4]}>
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-10 md:px-20">
          <Tag>Ready to Launch</Tag>
          <h2
            className="font-bold text-[#F5F1E8] mb-5"
            style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
          >
            Put your brand
            <br />
            <em className="text-[#9CAF88] not-italic">in orbit.</em>
          </h2>
          <p className="text-[#F5F1E8]/50 text-base max-w-sm leading-relaxed mb-8">
            Tell us about your brand and we&apos;ll craft a strategy that delivers results.
          </p>
          <div className="flex items-center gap-6 pointer-events-auto flex-wrap">
            <Link
              href="/contact"
              className="bg-[#9CAF88] text-[#0D0B08] font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-widest hover:bg-[#F5F1E8] transition-colors duration-200"
            >
              Start a Project
            </Link>
            <a
              href="mailto:hello@chronogrowth.in"
              className="text-[#9CAF88]/70 text-sm hover:text-[#9CAF88] transition-colors duration-200 font-mono"
            >
              hello@chronogrowth.in ↗
            </a>
          </div>
        </div>
        <BigNum>05</BigNum>
      </ScenePanel>

      {/* ── Progress dots ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 items-center">
        {SCENES.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width:  active === i ? 5   : 3,
              height: active === i ? 22  : 7,
              background: active === i ? "#9CAF88" : "rgba(156,175,136,0.22)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────────────────────────────────── */

function ScenePanel({ children, opacity }: { children: React.ReactNode; opacity: number }) {
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

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#9CAF88] text-xs font-mono uppercase tracking-[0.22em] mb-5">
      {children}
    </p>
  );
}

function BigNum({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute top-16 right-10 md:right-20 font-bold text-[#F5F1E8] leading-none pointer-events-none"
      style={{ fontSize: "clamp(5rem, 12vw, 11rem)", letterSpacing: "-0.06em", opacity: 0.035 }}
    >
      {children}
    </div>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div>
      <div
        className="font-bold leading-none mb-1"
        style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", letterSpacing: "-0.04em", color }}
      >
        {value}
      </div>
      <div className="text-[#8B7E6E] text-[10px] uppercase tracking-widest">{label}</div>
    </div>
  );
}
