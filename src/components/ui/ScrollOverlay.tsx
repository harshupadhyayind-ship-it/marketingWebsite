"use client";

import Link from "next/link";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export type HomepageData = {
  scene0: { label: string; line1: string; line2: string; subtitle: string };
  scene1: { label: string; line1: string; line2: string; line3: string; body: string };
  scene2: { label: string; line1: string; line2: string; line3: string; body: string; services: string[] };
  scene3: { label: string; stats: { value: string; label: string }[] };
  scene4: { label: string; line1: string; line2: string; body: string; buttonText: string; email: string };
};

const SCENES: [number, number][] = [
  [0.00, 0.20],
  [0.20, 0.44],
  [0.44, 0.64],
  [0.64, 0.84],
  [0.84, 1.01],
];

const HALF_FADE = 0.028;

function sceneOpacity(p: number, i: number): number {
  const [s, e] = SCENES[i];
  const isFirst = s === 0;
  const isLast  = e >= 1;
  if (p < s - HALF_FADE || p > e + HALF_FADE) return 0;
  let o = 1;
  if (!isFirst && p < s + HALF_FADE) o = Math.min(o, (p - (s - HALF_FADE)) / (2 * HALF_FADE));
  if (!isLast  && p > e - HALF_FADE) o = Math.min(o, ((e + HALF_FADE) - p) / (2 * HALF_FADE));
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

const BARS = [14, 28, 22, 48, 38, 62, 52, 76, 68, 92];

export default function ScrollOverlay({ data }: { data: HomepageData }) {
  const progress  = useScrollProgress();
  const active    = activeScene(progress);
  const opacities = SCENES.map((_, i) => sceneOpacity(progress, i));
  const graphPct  = progress < 0.64 ? 0 : progress > 0.84 ? 1 : (progress - 0.64) / 0.20;

  // Animated counters for scene3
  const animPct = progress < 0.64 ? 0 : progress > 0.80 ? 1 : easeOut((progress - 0.64) / 0.16);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden select-none">
      {/* Bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(13,15,28,0.95) 0%, rgba(13,15,28,0.3) 35%, transparent 60%)" }}
      />

      {/* ── SCENE 0 — HERO ── */}
      <Scene opacity={opacities[0]}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-[#D64545]" />
            <span className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em]">{data.scene0.label}</span>
            <span className="h-px w-10 bg-[#D64545]" />
          </div>
          <h1 className="font-black text-white mb-5"
            style={{ fontSize: "clamp(3.2rem, 9vw, 9.5rem)", letterSpacing: "-0.04em", lineHeight: 0.92 }}>
            {data.scene0.line1}
            <br />
            <span style={{ background: "linear-gradient(135deg, #E05555 0%, #D64545 50%, #E07070 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {data.scene0.line2}
            </span>
          </h1>
          <p className="text-white/55 text-base max-w-xs leading-relaxed mb-10">{data.scene0.subtitle}</p>
          <div className="flex flex-col items-center gap-2 opacity-60">
            <div className="w-px h-10 bg-[#D64545] animate-pulse" />
            <span className="text-[#D64545] text-[9px] font-mono uppercase tracking-[0.3em]">scroll</span>
          </div>
        </div>
        <BigNum>01</BigNum>
      </Scene>

      {/* ── SCENE 1 — SIGNAL ── */}
      <Scene opacity={opacities[1]}>
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-10 md:px-20">
          <Label>{data.scene1.label}</Label>
          <h2 className="font-black text-white mb-5"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)", letterSpacing: "-0.04em", lineHeight: 0.94 }}>
            {data.scene1.line1}<br />
            <span className="text-[#D64545]">{data.scene1.line2}</span><br />
            {data.scene1.line3}
          </h2>
          <p className="text-white/55 text-base max-w-md leading-relaxed">{data.scene1.body}</p>
        </div>
        <BigNum>02</BigNum>
      </Scene>

      {/* ── SCENE 2 — ORBIT ── */}
      <Scene opacity={opacities[2]}>
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-10 md:px-20">
          <div className="grid md:grid-cols-2 gap-10 w-full items-end">
            <div>
              <Label>{data.scene2.label}</Label>
              <h2 className="font-black text-white mb-5"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}>
                {data.scene2.line1}<br />
                <span className="text-[#D64545]">{data.scene2.line2}</span><br />
                {data.scene2.line3}
              </h2>
              <p className="text-white/55 text-sm max-w-xs leading-relaxed">{data.scene2.body}</p>
            </div>
            <div className="flex flex-col gap-2.5">
              {data.scene2.services.map((s, i) => (
                <div key={i} className="flex items-baseline gap-4 border-b border-white/10 pb-2.5">
                  <span className="text-[#D64545] font-mono text-[10px] flex-shrink-0">0{i + 1}</span>
                  <span className="text-white/65 text-sm tracking-wide">{s}</span>
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
          <Label>{data.scene3.label}</Label>
          <div className="flex items-end gap-1 mb-8" style={{ height: 60 }}>
            {BARS.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm"
                style={{
                  height: `${h * graphPct}%`,
                  background: i === BARS.length - 1 ? "#D64545" : `rgba(214,69,69,${0.2 + (i / BARS.length) * 0.6})`,
                  minHeight: graphPct > 0 ? 2 : 0,
                  transition: "height 0.04s linear",
                  boxShadow: i === BARS.length - 1 ? "0 0 12px rgba(214,69,69,0.6)" : "none",
                }}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.scene3.stats.map((stat, i) => (
              <Stat
                key={i}
                value={stat.value}
                animValue={Math.round(parseFloat(stat.value.replace(/[^\d.]/g, "")) * animPct * 10) / 10}
                raw={stat.value}
                label={stat.label}
                color={i % 2 === 0 ? "#D64545" : "#E05555"}
                animPct={animPct}
              />
            ))}
          </div>
        </div>
        <BigNum>04</BigNum>
      </Scene>

      {/* ── SCENE 4 — CTA ── */}
      <Scene opacity={opacities[4]}>
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-10 md:px-20">
          <Label>{data.scene4.label}</Label>
          <h2 className="font-black text-white mb-5"
            style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)", letterSpacing: "-0.04em", lineHeight: 0.93 }}>
            {data.scene4.line1}<br />
            <span className="text-[#D64545]">{data.scene4.line2}</span>
          </h2>
          <p className="text-white/55 text-base max-w-sm leading-relaxed mb-8">{data.scene4.body}</p>
          <div className="flex items-center gap-5 pointer-events-auto flex-wrap">
            <Link
              href="/#contact"
              className="group relative overflow-hidden bg-[#D64545] text-white font-bold px-8 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-[#E05555] transition-colors duration-200"
              style={{ boxShadow: "0 0 30px rgba(214,69,69,0.4)" }}
            >
              {data.scene4.buttonText}
            </Link>
            <a href={`mailto:${data.scene4.email}`}
              className="text-white/45 text-sm hover:text-[#D64545] transition-colors duration-200 font-mono tracking-wider">
              {data.scene4.email} ↗
            </a>
          </div>
        </div>
        <BigNum>05</BigNum>
      </Scene>

      {/* Progress dots */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 items-center">
        {SCENES.map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-500"
            style={{
              width:     active === i ? 4  : 2,
              height:    active === i ? 20 : 6,
              background: active === i ? "#D64545" : "rgba(255,255,255,0.2)",
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
    <div className="absolute inset-0"
      style={{ opacity, transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1)", pointerEvents: opacity > 0.4 ? "auto" : "none" }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-6 bg-[#D64545]" />
      <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.22em]">{children}</p>
    </div>
  );
}

function BigNum({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-16 right-10 md:right-20 font-black text-white leading-none pointer-events-none"
      style={{ fontSize: "clamp(5rem, 12vw, 11rem)", letterSpacing: "-0.06em", opacity: 0.028 }}>
      {children}
    </div>
  );
}

function Stat({ value, label, color, animPct, raw }: {
  value: string; label: string; color: string; animPct: number; animValue: number; raw: string;
}) {
  // Show animated number if purely numeric, otherwise show static value
  const num = parseFloat(raw.replace(/[^\d.]/g, ""));
  const prefix = raw.match(/^[^\d]*/)?.[0] ?? "";
  const suffix = raw.match(/[^\d.]+$/)?.[0] ?? "";
  const display = isNaN(num)
    ? value
    : `${prefix}${Number((num * animPct).toFixed(num % 1 !== 0 ? 1 : 0))}${suffix}`;

  return (
    <div>
      <div className="font-black leading-none mb-1"
        style={{ fontSize: "clamp(1.8rem, 4vw, 3.8rem)", letterSpacing: "-0.04em", color }}>
        {display}
      </div>
      <div className="text-white/45 text-[9px] uppercase tracking-[0.18em] font-mono">{label}</div>
    </div>
  );
}
