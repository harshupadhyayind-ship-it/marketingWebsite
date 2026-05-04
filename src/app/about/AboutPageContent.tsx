"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import { Heart, Zap, Shield, Users } from "lucide-react";

const team = [
  {
    name: "Aryan Malhotra",
    role: "Founder & Creative Director",
    bio: "Former creative lead at Ogilvy. 12 years building brands across FMCG, tech, and lifestyle categories.",
    initial: "A",
  },
  {
    name: "Sanya Kapoor",
    role: "Head of Strategy",
    bio: "Ex-BCG consultant turned marketer. Brings rigorous analytical frameworks to every brand challenge.",
    initial: "S",
  },
  {
    name: "Rahul Dev",
    role: "Lead Developer",
    bio: "Full-stack engineer specialising in Next.js, Three.js, and performance-first web architecture.",
    initial: "R",
  },
  {
    name: "Meera Shah",
    role: "Head of Paid Media",
    bio: "₹50Cr+ in managed ad spend across Meta, Google, and programmatic channels.",
    initial: "M",
  },
  {
    name: "Kabir Nair",
    role: "Content Director",
    bio: "Writer, photographer, and storyteller. Content creator for 20+ brands across India.",
    initial: "K",
  },
  {
    name: "Priya Joshi",
    role: "Brand Designer",
    bio: "Visual identity specialist and Figma wizard. Has designed 60+ brand identities from scratch.",
    initial: "P",
  },
];

const values = [
  {
    icon: Heart,
    title: "Craft First",
    desc: "We believe great work is the best business strategy. Quality is non-negotiable.",
  },
  {
    icon: Zap,
    title: "Relentlessly Fast",
    desc: "Speed is a competitive advantage. We move quickly without sacrificing quality.",
  },
  {
    icon: Shield,
    title: "Radically Honest",
    desc: "We'll tell you what you need to hear, not just what you want to hear.",
  },
  {
    icon: Users,
    title: "Partner Mentality",
    desc: "We treat your brand like it's ours. Long-term relationships, not transactions.",
  },
];

const milestones = [
  { year: "2019", event: "ChronoGrowth founded in Mumbai" },
  { year: "2020", event: "First 10 clients — 100% from referrals" },
  { year: "2021", event: "Launched in-house content studio" },
  { year: "2022", event: "Crossed ₹1Cr in managed media spend" },
  { year: "2023", event: "Expanded team to 12 full-time specialists" },
  { year: "2024", event: "Named one of India's Top 25 indie agencies" },
];

export default function AboutPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 bg-beige relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sage/8 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedSection>
              <span className="inline-block text-sage text-sm font-medium uppercase tracking-widest mb-4">
                Our Story
              </span>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                Marketing that feels
                <br />
                like <span className="text-gradient">art</span>.
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="text-stone text-xl leading-relaxed mb-6">
                ChronoGrowth was born from a simple frustration: most marketing
                looks the same. We set out to prove that strategic thinking and
                beautiful craft aren&apos;t mutually exclusive.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-stone leading-relaxed">
                Founded in 2019, we&apos;ve grown from a two-person studio to a
                full-service agency of 12 specialists — all united by a
                relentless obsession with work that moves people and moves
                needles.
              </p>
            </AnimatedSection>
          </div>

          {/* Stat cards */}
          <AnimatedSection delay={0.2} direction="right">
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "5+", label: "Years", sub: "of excellence" },
                { val: "120+", label: "Projects", sub: "delivered" },
                { val: "40+", label: "Clients", sub: "trust us" },
                { val: "12", label: "Specialists", sub: "in our team" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -4, rotateX: 3, rotateY: -3 }}
                  transition={{ duration: 0.2 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="rounded-2xl bg-white border border-beige-dark p-6 text-center shadow-warm"
                >
                  <div className="font-heading text-4xl font-bold text-sage mb-1">{s.val}</div>
                  <div className="font-semibold text-foreground text-sm">{s.label}</div>
                  <div className="text-stone text-xs">{s.sub}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#2C2416]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <AnimatedSection direction="left">
            <div className="rounded-3xl bg-[#3D3222] border border-[#4D4232] p-8 h-full">
              <div className="text-sage text-sm font-medium uppercase tracking-widest mb-4">Our Mission</div>
              <h2 className="font-heading text-3xl font-bold text-[#F5F1E8] mb-4">
                To make brands impossible to ignore.
              </h2>
              <p className="text-[#8B7E6E] leading-relaxed">
                We exist to help ambitious brands build a presence that commands
                attention — through strategic creativity, disciplined execution,
                and a genuine obsession with results.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.1}>
            <div className="rounded-3xl bg-sage/10 border border-sage/20 p-8 h-full">
              <div className="text-sage text-sm font-medium uppercase tracking-widest mb-4">Our Vision</div>
              <h2 className="font-heading text-3xl font-bold text-[#F5F1E8] mb-4">
                India&apos;s most trusted creative growth partner.
              </h2>
              <p className="text-[#8B7E6E] leading-relaxed">
                We&apos;re building a studio that India&apos;s best brands choose not
                because we&apos;re the cheapest, but because we&apos;re the best —
                and because we genuinely care about their success.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block text-sage text-sm font-medium uppercase tracking-widest mb-4">
              How We Work
            </span>
            <h2 className="font-heading text-4xl font-bold text-foreground">
              Principles that guide us.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
                  transition={{ duration: 0.25 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="rounded-2xl bg-white border border-beige-dark p-6 shadow-warm text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-sage/15 flex items-center justify-center mx-auto mb-4">
                    <v.icon size={20} className="text-sage" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-stone text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-beige-dark">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-14">
            <span className="inline-block text-sage text-sm font-medium uppercase tracking-widest mb-4">
              The Team
            </span>
            <h2 className="font-heading text-4xl font-bold text-foreground">
              The people behind the work.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl bg-white border border-beige-dark p-6 shadow-warm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-sage/20 flex items-center justify-center font-heading text-xl font-bold text-sage">
                      {member.initial}
                    </div>
                    <div>
                      <div className="font-heading font-bold text-foreground">{member.name}</div>
                      <div className="text-sage text-xs font-medium">{member.role}</div>
                    </div>
                  </div>
                  <p className="text-stone text-sm leading-relaxed">{member.bio}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-beige">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block text-sage text-sm font-medium uppercase tracking-widest mb-4">
              Our Journey
            </span>
            <h2 className="font-heading text-4xl font-bold text-foreground">
              Building since 2019.
            </h2>
          </AnimatedSection>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-beige-darker" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <AnimatedSection key={m.year} delay={i * 0.07}>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full bg-sage/15 border-2 border-sage/30 flex items-center justify-center flex-shrink-0 relative z-10 bg-beige">
                      <span className="text-sage font-bold text-xs">{m.year.slice(2)}</span>
                    </div>
                    <div className="pt-2.5">
                      <div className="text-stone text-xs font-medium mb-0.5">{m.year}</div>
                      <div className="font-semibold text-foreground">{m.event}</div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
