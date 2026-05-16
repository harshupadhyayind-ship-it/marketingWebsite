"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TiltCard from "@/components/ui/TiltCard";

const HeroShapes = dynamic(() => import("@/components/three/HeroShapes"), { ssr: false });

type TeamMember = { name: string; role: string; bio: string; initial: string };
type Stat = { val: string; label: string };
type Milestone = { year: string; event: string };
type Value = { title: string; desc: string };

type AboutData = {
  story: { heading: string; paragraph1: string; paragraph2: string };
  stats: Stat[];
  team: TeamMember[];
  milestones: Milestone[];
  values: Value[];
};

/* ── Team card ── */
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <TiltCard className="relative p-8 bg-[#F5EFE6] border border-[#1C1C1C]/08 hover:shadow-sm transition-shadow duration-200">
      <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mb-6 bg-[#D64545]/10 text-[#D64545]">
        {member.initial}
      </div>
      <div className="font-bold text-[#1C1C1C] mb-1">{member.name}</div>
      <div className="text-[#D64545] text-xs font-mono mb-4">{member.role}</div>
      <p className="text-[#1C1C1C]/55 text-sm leading-relaxed">{member.bio}</p>
    </TiltCard>
  );
}

export default function AboutPageContent({ data }: { data: AboutData }) {
  const { story, stats, team, milestones, values } = data;

  return (
    <div className="bg-[#F5EFE6] min-h-screen">

      {/* ── Page header ── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* Three.js canvas background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <HeroShapes />
        </div>
        {/* White gradient fade at the bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }}
        />
        {/* Text on top */}
        <div className="relative z-10 px-6 md:px-10 max-w-7xl mx-auto">
          <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
            Our Story
          </p>
          <h1
            className="font-bold text-[#1C1C1C] leading-none mb-10"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.04em" }}
          >
            {story.heading}
          </h1>
          <p className="text-[#1C1C1C]/55 text-xl max-w-2xl leading-relaxed">
            {story.paragraph1}
          </p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-t border-[#1C1C1C]/08 grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`px-8 py-12${i < stats.length - 1 ? " border-r border-[#1C1C1C]/08" : ""}`}
          >
            <div
              className="font-bold text-[#D64545] mb-2"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
            >
              {s.val}
            </div>
            <div className="text-[#1C1C1C]/55 text-sm">{s.label}</div>
          </motion.div>
        ))}
      </section>

      {/* ── Mission / Vision ── */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 border-t border-[#1C1C1C]/08">
        <div>
          <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
            Mission
          </p>
          <h2
            className="font-bold text-[#1C1C1C] mb-6"
            style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            To make brands impossible to ignore.
          </h2>
          <p className="text-[#1C1C1C]/55 leading-relaxed">
            We exist to help ambitious brands build a presence that commands attention —
            through strategic creativity, disciplined execution, and a genuine obsession with results.
          </p>
        </div>
        <div>
          <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
            Vision
          </p>
          <h2
            className="font-bold text-[#1C1C1C] mb-6"
            style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            India&apos;s most trusted creative growth partner.
          </h2>
          <p className="text-[#1C1C1C]/55 leading-relaxed">
            We&apos;re building a studio that India&apos;s best brands choose not because we&apos;re the cheapest,
            but because we&apos;re the best — and because we genuinely care about their success.
          </p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="border-t border-[#1C1C1C]/08">
        <div className="px-6 md:px-10 py-12 max-w-7xl mx-auto">
          <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em]">
            How We Work
          </p>
        </div>
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-[#1C1C1C]/08 px-6 md:px-10 py-10 max-w-7xl mx-auto flex gap-8 items-start"
          >
            <span className="text-[#D64545] font-mono text-sm flex-shrink-0 pt-1">0{i + 1}</span>
            <div>
              <h3
                className="font-bold text-[#1C1C1C] mb-2"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}
              >
                {v.title}
              </h3>
              <p className="text-[#1C1C1C]/55 leading-relaxed max-w-xl">{v.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── Team ── */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto border-t border-[#1C1C1C]/08">
        <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-16">
          The Team
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1C1C1C]/08">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 px-6 md:px-10 max-w-3xl mx-auto border-t border-[#1C1C1C]/08">
        <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-16">
          Our Journey
        </p>
        <div className="space-y-0">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-8 py-6 border-b border-[#1C1C1C]/08"
            >
              <span className="text-[#D64545] font-mono text-sm flex-shrink-0 w-12">{m.year}</span>
              <span className="text-[#1C1C1C] leading-relaxed">{m.event}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center border-t border-[#1C1C1C]/08">
        <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
          Work With Us
        </p>
        <h2
          className="font-bold text-[#1C1C1C] mb-10"
          style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
        >
          Let&apos;s build together.
        </h2>
        <Link
          href="/contact"
          className="inline-block bg-[#D64545] text-white font-bold px-10 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-[#8B3232] transition-colors duration-200"
        >
          Start a Project →
        </Link>
      </section>
    </div>
  );
}
