"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CTASection from "@/components/sections/CTASection";
import { Badge } from "@/components/ui/badge";
import {
  Palette,
  Globe,
  Megaphone,
  BarChart3,
  Camera,
  PenTool,
  Check,
  ChevronDown,
} from "lucide-react";

const services = [
  {
    id: "brand-strategy",
    icon: Palette,
    title: "Brand Strategy",
    tagline: "Position your brand to lead.",
    description:
      "A strong brand is your most valuable asset. We develop comprehensive brand strategies that define who you are, who you serve, and why you matter — then translate that into a visual and verbal identity that turns heads.",
    features: [
      "Brand Audit & Competitive Analysis",
      "Brand Identity & Visual System",
      "Tone of Voice & Messaging Framework",
      "Brand Guidelines Document",
      "Logo & Typography Design",
    ],
    process: [
      { step: "01", title: "Discovery", desc: "Deep-dive into your business, audience, and competitive landscape." },
      { step: "02", title: "Strategy", desc: "Define positioning, brand pillars, and core messaging." },
      { step: "03", title: "Design", desc: "Craft the visual identity — logo, color, type, and assets." },
      { step: "04", title: "Handover", desc: "Full guidelines doc + asset library delivered." },
    ],
    deliveryTime: "3–4 weeks",
    color: "#9CAF88",
  },
  {
    id: "web-design",
    icon: Globe,
    title: "Web Design & Development",
    tagline: "Websites that convert and captivate.",
    description:
      "We build cinematic web experiences using Next.js, Three.js, and a relentless focus on performance and conversion. Every site is custom-designed, fully responsive, and engineered for speed.",
    features: [
      "Custom UI/UX Design (Figma)",
      "Next.js Development (App Router)",
      "Three.js 3D Experiences",
      "CMS Integration (Sanity)",
      "Performance Optimization (Lighthouse ≥ 90)",
    ],
    process: [
      { step: "01", title: "Wireframes", desc: "Low-fi layout exploration and information architecture." },
      { step: "02", title: "Hi-fi Design", desc: "Full Figma mockups for desktop and mobile." },
      { step: "03", title: "Development", desc: "Next.js build with CMS integration and animations." },
      { step: "04", title: "Launch", desc: "Vercel deployment, domain config, and handover." },
    ],
    deliveryTime: "2–3 weeks",
    color: "#7A9068",
  },
  {
    id: "digital-marketing",
    icon: Megaphone,
    title: "Digital Marketing",
    tagline: "Full-funnel growth, measurably.",
    description:
      "From paid media to SEO and email — we build and run data-driven marketing programs that fill your pipeline and reduce your cost per acquisition over time.",
    features: [
      "Meta & Google Ads Management",
      "Search Engine Optimisation (SEO)",
      "Email Marketing & Automation",
      "Growth Hacking & Experiments",
      "Monthly Performance Reports",
    ],
    process: [
      { step: "01", title: "Audit", desc: "Benchmark your current performance and identify quick wins." },
      { step: "02", title: "Strategy", desc: "Build a full-funnel growth plan tailored to your goals." },
      { step: "03", title: "Execute", desc: "Launch campaigns across paid, owned, and earned channels." },
      { step: "04", title: "Optimise", desc: "Weekly analysis and iteration to improve results." },
    ],
    deliveryTime: "Ongoing retainer",
    color: "#B8C9A8",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Performance Analytics",
    tagline: "Turn data into decisions.",
    description:
      "Most brands are flying blind. We implement robust tracking, build custom dashboards, and deliver monthly insights reports so you always know exactly what's working and why.",
    features: [
      "GA4 & GTM Setup",
      "Custom Looker Studio Dashboards",
      "Conversion Funnel Analysis",
      "A/B Testing Programme",
      "Monthly Insights Reports",
    ],
    process: [
      { step: "01", title: "Audit", desc: "Identify tracking gaps and measurement objectives." },
      { step: "02", title: "Setup", desc: "Implement GA4, GTM, and event tracking." },
      { step: "03", title: "Dashboard", desc: "Build custom dashboards for your key metrics." },
      { step: "04", title: "Insights", desc: "Monthly reporting with actionable recommendations." },
    ],
    deliveryTime: "1–2 weeks setup",
    color: "#9CAF88",
  },
  {
    id: "content",
    icon: Camera,
    title: "Content Creation",
    tagline: "Stories that stop the scroll.",
    description:
      "From product photography to viral social content — our creative team produces visually stunning, strategically crafted content for every platform and format.",
    features: [
      "Product & Brand Photography",
      "Video Production & Editing",
      "Long-form Copywriting",
      "Social Media Management",
      "Content Calendar Planning",
    ],
    process: [
      { step: "01", title: "Content Audit", desc: "Review existing assets and identify content gaps." },
      { step: "02", title: "Strategy", desc: "Build a content calendar aligned to your goals." },
      { step: "03", title: "Production", desc: "Shoot, write, and edit all content assets." },
      { step: "04", title: "Publish & Manage", desc: "Schedule, post, and engage across platforms." },
    ],
    deliveryTime: "Ongoing retainer",
    color: "#7A9068",
  },
  {
    id: "creative-direction",
    icon: PenTool,
    title: "Creative Direction",
    tagline: "Campaigns that live in culture.",
    description:
      "End-to-end creative strategy and art direction for brand campaigns, product launches, and high-impact marketing moments that create lasting cultural relevance.",
    features: [
      "Campaign Concept Development",
      "Art Direction",
      "Print & Out-of-Home",
      "Launch Campaigns",
      "Creative QA & Production Oversight",
    ],
    process: [
      { step: "01", title: "Brief", desc: "Deep-dive on campaign goals, audience, and KPIs." },
      { step: "02", title: "Concepts", desc: "3 creative directions for client review." },
      { step: "03", title: "Production", desc: "Art direct all creative assets end-to-end." },
      { step: "04", title: "Launch", desc: "Co-ordinate release and performance monitoring." },
    ],
    deliveryTime: "Project-based",
    color: "#B8C9A8",
  },
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      id={service.id}
      className="rounded-3xl bg-white/60 border border-beige-dark shadow-warm overflow-hidden"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left p-8 flex items-center justify-between gap-4 hover:bg-beige-dark/30 transition-colors"
      >
        <div className="flex items-center gap-5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${service.color}20` }}
          >
            <service.icon size={22} style={{ color: service.color }} />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground">{service.title}</h3>
            <p className="text-stone text-sm mt-0.5">{service.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Badge className="bg-sage/10 text-sage border-sage/20 text-xs">{service.deliveryTime}</Badge>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={18} className="text-stone" />
          </motion.div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 border-t border-beige-dark pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left */}
                <div>
                  <p className="text-stone leading-relaxed mb-6">{service.description}</p>
                  <h4 className="font-semibold text-foreground text-sm mb-4">What&apos;s included</h4>
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-stone text-sm">
                        <Check size={14} className="text-sage mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: process steps */}
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-4">Our Process</h4>
                  <div className="space-y-4">
                    {service.process.map((step) => (
                      <div key={step.step} className="flex gap-4">
                        <div
                          className="text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${service.color}20`, color: service.color }}
                        >
                          {step.step}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-sm">{step.title}</div>
                          <div className="text-stone text-xs mt-0.5">{step.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 bg-beige relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <span className="inline-block text-sage text-sm font-medium uppercase tracking-widest mb-4">
              What We Do
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6 max-w-3xl">
              Services designed to{" "}
              <span className="text-gradient">move the needle</span>.
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="text-stone text-xl leading-relaxed max-w-2xl">
              From brand-building to performance marketing — every service is
              delivered with craft, data, and a relentless focus on results.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services accordion */}
      <section className="py-16 bg-beige">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          {services.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.07}>
              <ServiceCard service={service} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
