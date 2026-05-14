"use client";

import Link from "next/link";

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

/* ── Team card ── */
function TeamCard({ member }: { member: (typeof team)[0] }) {
  return (
    <div className="p-8 bg-white border border-[#0A0A0F]/08 hover:shadow-sm transition-shadow duration-200">
      <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mb-6 bg-[#E63327]/10 text-[#E63327]">
        {member.initial}
      </div>
      <div className="font-bold text-[#0A0A0F] mb-1">{member.name}</div>
      <div className="text-[#E63327] text-xs font-mono mb-4">{member.role}</div>
      <p className="text-[#0A0A0F]/55 text-sm leading-relaxed">{member.bio}</p>
    </div>
  );
}

export default function AboutPageContent() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Page header ── */}
      <section className="pt-40 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
        <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
          Our Story
        </p>
        <h1
          className="font-bold text-[#0A0A0F] leading-none mb-10"
          style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.04em" }}
        >
          Marketing that
          <br />
          feels like{" "}
          <em className="text-[#E63327] not-italic">art.</em>
        </h1>
        <p className="text-[#0A0A0F]/55 text-xl max-w-2xl leading-relaxed">
          ChronoGrowth was born from a simple frustration: most marketing looks the same.
          We set out to prove that strategic thinking and beautiful craft aren't mutually exclusive.
        </p>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-t border-[#0A0A0F]/08 grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-8 py-12${i < stats.length - 1 ? " border-r border-[#0A0A0F]/08" : ""}`}
          >
            <div
              className="font-bold text-[#E63327] mb-2"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
            >
              {s.val}
            </div>
            <div className="text-[#0A0A0F]/55 text-sm">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── Mission / Vision ── */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 border-t border-[#0A0A0F]/08">
        <div>
          <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
            Mission
          </p>
          <h2
            className="font-bold text-[#0A0A0F] mb-6"
            style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            To make brands impossible to ignore.
          </h2>
          <p className="text-[#0A0A0F]/55 leading-relaxed">
            We exist to help ambitious brands build a presence that commands attention —
            through strategic creativity, disciplined execution, and a genuine obsession with results.
          </p>
        </div>
        <div>
          <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
            Vision
          </p>
          <h2
            className="font-bold text-[#0A0A0F] mb-6"
            style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            India's most trusted creative growth partner.
          </h2>
          <p className="text-[#0A0A0F]/55 leading-relaxed">
            We're building a studio that India's best brands choose not because we're the cheapest,
            but because we're the best — and because we genuinely care about their success.
          </p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="border-t border-[#0A0A0F]/08">
        <div className="px-6 md:px-10 py-12 max-w-7xl mx-auto">
          <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em]">
            How We Work
          </p>
        </div>
        {values.map((v, i) => (
          <div
            key={v.title}
            className="border-t border-[#0A0A0F]/08 px-6 md:px-10 py-10 max-w-7xl mx-auto flex gap-8 items-start"
          >
            <span className="text-[#E63327] font-mono text-sm flex-shrink-0 pt-1">0{i + 1}</span>
            <div>
              <h3
                className="font-bold text-[#0A0A0F] mb-2"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}
              >
                {v.title}
              </h3>
              <p className="text-[#0A0A0F]/55 leading-relaxed max-w-xl">{v.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Team ── */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto border-t border-[#0A0A0F]/08">
        <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-16">
          The Team
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0A0A0F]/08">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 px-6 md:px-10 max-w-3xl mx-auto border-t border-[#0A0A0F]/08">
        <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-16">
          Our Journey
        </p>
        <div className="space-y-0">
          {milestones.map((m) => (
            <div key={m.year} className="flex gap-8 py-6 border-b border-[#0A0A0F]/08">
              <span className="text-[#E63327] font-mono text-sm flex-shrink-0 w-12">{m.year}</span>
              <span className="text-[#0A0A0F] leading-relaxed">{m.event}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center border-t border-[#0A0A0F]/08">
        <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
          Work With Us
        </p>
        <h2
          className="font-bold text-[#0A0A0F] mb-10"
          style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
        >
          Let's build together.
        </h2>
        <Link
          href="/contact"
          className="inline-block bg-[#E63327] text-white font-bold px-10 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-[#B5261B] transition-colors duration-200"
        >
          Start a Project →
        </Link>
      </section>
    </div>
  );
}
