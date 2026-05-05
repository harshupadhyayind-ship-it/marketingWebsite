"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const AboutCanvas = dynamic(() => import("@/components/three/AboutCanvas"), { ssr: false });

const team = [
  { name: "Aryan Malhotra",  role: "Founder & Creative Director", bio: "Former creative lead at Ogilvy. 12 years building brands across FMCG, tech, and lifestyle.", initial: "A" },
  { name: "Sanya Kapoor",    role: "Head of Strategy",            bio: "Ex-BCG consultant turned marketer. Rigorous analytical frameworks for every brand challenge.", initial: "S" },
  { name: "Rahul Dev",       role: "Lead Developer",              bio: "Full-stack engineer specialising in Next.js, Three.js, and performance-first web architecture.", initial: "R" },
  { name: "Meera Shah",      role: "Head of Paid Media",          bio: "₹50Cr+ in managed ad spend across Meta, Google, and programmatic channels.", initial: "M" },
  { name: "Kabir Nair",      role: "Content Director",            bio: "Writer, photographer, and storyteller. Content creator for 20+ brands across India.", initial: "K" },
  { name: "Priya Joshi",     role: "Brand Designer",              bio: "Visual identity specialist and Figma wizard. 60+ brand identities designed from scratch.", initial: "P" },
];

const stats = [
  { val: "5+",   label: "Years of excellence"   },
  { val: "120+", label: "Projects delivered"    },
  { val: "40+",  label: "Clients who trust us"  },
  { val: "12",   label: "Full-time specialists" },
];

const milestones = [
  { year: "2019", event: "ChronoGrowth founded in Mumbai" },
  { year: "2020", event: "First 10 clients — 100% from referrals" },
  { year: "2021", event: "Launched in-house content studio" },
  { year: "2022", event: "Crossed ₹1Cr in managed media spend" },
  { year: "2023", event: "Expanded team to 12 full-time specialists" },
  { year: "2024", event: "Named one of India's Top 25 indie agencies" },
];

const values = [
  { title: "Craft First",       desc: "Great work is the best business strategy. Quality is non-negotiable." },
  { title: "Relentlessly Fast", desc: "Speed is a competitive advantage. We move quickly without sacrificing quality." },
  { title: "Radically Honest",  desc: "We'll tell you what you need to hear, not just what you want to hear." },
  { title: "Partner Mentality", desc: "We treat your brand like it's ours. Long-term relationships, not transactions." },
];

/* ── Team card with 3D tilt ── */
function TeamCard({ member }: { member: (typeof team)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), { stiffness: 280, damping: 28 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ backgroundColor: "#1A1710" }}
      className="p-8 bg-[#0D0B08] transition-colors duration-200"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mb-6"
        style={{ backgroundColor: "#9CAF8820", color: "#9CAF88", transform: "translateZ(16px)" }}
      >
        {member.initial}
      </div>
      <div className="font-bold text-[#F5F1E8] mb-1" style={{ transform: "translateZ(8px)" }}>
        {member.name}
      </div>
      <div className="text-[#9CAF88] text-xs font-mono mb-4">{member.role}</div>
      <p className="text-[#8B7E6E] text-sm leading-relaxed">{member.bio}</p>
    </motion.div>
  );
}

export default function AboutPageContent() {
  return (
    <div className="bg-[#0D0B08] min-h-screen">

      {/* ── Hero with 3D orrery canvas ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "72vh" }}>
        <div className="absolute inset-0 pointer-events-none">
          <AboutCanvas />
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0D0B08)" }}
        />

        <section className="relative z-10 pt-40 pb-24 px-6 max-w-7xl mx-auto">
          <p className="text-[#9CAF88] text-xs font-mono uppercase tracking-[0.2em] mb-6">Our Story</p>
          <h1
            className="font-bold text-[#F5F1E8] leading-none mb-12"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.04em" }}
          >
            Marketing that
            <br />
            feels like{" "}
            <em className="text-[#9CAF88] not-italic">art.</em>
          </h1>
          <p className="text-[#8B7E6E] text-xl max-w-2xl leading-relaxed">
            ChronoGrowth was born from a simple frustration: most marketing looks the same.
            We set out to prove that strategic thinking and beautiful craft aren't mutually exclusive.
          </p>
        </section>
      </div>

      {/* ── Stats ── */}
      <section className="border-t border-[#F5F1E8]/10 grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-8 py-12 ${i < stats.length - 1 ? "border-r border-[#F5F1E8]/10" : ""}`}
          >
            <div
              className="font-bold text-[#9CAF88] mb-2"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
            >
              {s.val}
            </div>
            <div className="text-[#8B7E6E] text-sm">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── Mission / Vision ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 border-t border-[#F5F1E8]/10">
        <div>
          <p className="text-[#9CAF88] text-xs font-mono uppercase tracking-[0.2em] mb-6">Mission</p>
          <h2
            className="font-bold text-[#F5F1E8] mb-6"
            style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            To make brands impossible to ignore.
          </h2>
          <p className="text-[#8B7E6E] leading-relaxed">
            We exist to help ambitious brands build a presence that commands attention —
            through strategic creativity, disciplined execution, and a genuine obsession with results.
          </p>
        </div>
        <div>
          <p className="text-[#9CAF88] text-xs font-mono uppercase tracking-[0.2em] mb-6">Vision</p>
          <h2
            className="font-bold text-[#F5F1E8] mb-6"
            style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            India's most trusted creative growth partner.
          </h2>
          <p className="text-[#8B7E6E] leading-relaxed">
            We're building a studio that India's best brands choose not because we're the cheapest,
            but because we're the best — and because we genuinely care about their success.
          </p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="border-t border-[#F5F1E8]/10">
        <div className="px-6 py-12 max-w-7xl mx-auto">
          <p className="text-[#9CAF88] text-xs font-mono uppercase tracking-[0.2em] mb-2">How We Work</p>
        </div>
        {values.map((v, i) => (
          <div
            key={v.title}
            className="border-t border-[#F5F1E8]/10 px-6 py-10 max-w-7xl mx-auto flex gap-8 items-start"
          >
            <span className="text-[#9CAF88] font-mono text-sm flex-shrink-0 pt-1">0{i + 1}</span>
            <div>
              <h3
                className="font-bold text-[#F5F1E8] mb-2"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}
              >
                {v.title}
              </h3>
              <p className="text-[#8B7E6E] leading-relaxed max-w-xl">{v.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Team — 3D tilt cards ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[#F5F1E8]/10">
        <p className="text-[#9CAF88] text-xs font-mono uppercase tracking-[0.2em] mb-16">The Team</p>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F5F1E8]/10"
          style={{ perspective: "1000px" }}
        >
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 px-6 max-w-3xl mx-auto border-t border-[#F5F1E8]/10">
        <p className="text-[#9CAF88] text-xs font-mono uppercase tracking-[0.2em] mb-16">Our Journey</p>
        <div className="space-y-0">
          {milestones.map((m) => (
            <div key={m.year} className="flex gap-8 py-6 border-b border-[#F5F1E8]/10">
              <span className="text-[#9CAF88] font-mono text-sm flex-shrink-0 w-12">{m.year}</span>
              <span className="text-[#F5F1E8] leading-relaxed">{m.event}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center border-t border-[#F5F1E8]/10">
        <h2
          className="font-bold text-[#F5F1E8] mb-10"
          style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
        >
          Let's build together.
        </h2>
        <Link
          href="/contact"
          className="inline-block bg-[#9CAF88] text-[#0D0B08] font-bold px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#F5F1E8] transition-colors duration-200"
        >
          Start a Project →
        </Link>
      </section>
    </div>
  );
}
