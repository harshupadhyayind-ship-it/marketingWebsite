"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroShapes = dynamic(() => import("@/components/three/HeroShapes"), { ssr: false });

const schema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  budget:  z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const budgetOptions = [
  "Under ₹50,000",
  "₹50K – ₹1L",
  "₹1L – ₹3L",
  "₹3L – ₹10L",
  "₹10L+",
  "Let's discuss",
];

const contactDetails = [
  {
    label: "Email",
    content: "hello@branddaid.com",
    href: "mailto:hello@branddaid.com",
  },
  {
    label: "Phone",
    content: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    label: "Location",
    content: "Mumbai, India",
    href: null,
  },
];

export default function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Form data:", data);
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F5EFE6] min-h-screen">

      {/* ── Page header ── */}
      <section className="pt-40 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
        <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
          Get In Touch
        </p>
        <h1
          className="font-bold text-[#1C1C1C] leading-none"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)", letterSpacing: "-0.04em" }}
        >
          Let's build
          <br />
          something
          <br />
          <em className="text-[#D64545] not-italic">extraordinary.</em>
        </h1>
      </section>

      {/* ── Two-column layout ── */}
      <section className="border-t border-[#1C1C1C]/08 px-6 md:px-10 py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* LEFT — contact details */}
          <div className="flex flex-col gap-10">
            {/* Small floating HeroShapes canvas */}
            <div
              className="relative rounded-sm overflow-hidden border border-[#1C1C1C]/08"
              style={{ height: 200 }}
            >
              <HeroShapes />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#1C1C1C]/55 text-lg leading-relaxed max-w-sm"
            >
              Drop us a message and we'll put together a custom strategy for your brand.
            </motion.p>

            <div className="space-y-8">
              {contactDetails.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[#1C1C1C]/50 text-[10px] font-mono uppercase tracking-[0.25em] mb-2">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-[#1C1C1C] text-xl hover:text-[#D64545] transition-colors duration-200"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-[#1C1C1C] text-xl">{item.content}</p>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 pt-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#D64545] animate-pulse" />
              <span className="text-[#1C1C1C]/50 text-sm">Usually responds within 24 hrs</span>
            </motion.div>
          </div>

          {/* RIGHT — form */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-24"
              >
                <div
                  className="text-[#D64545] mb-6 font-bold"
                  style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em" }}
                >
                  Message sent ✓
                </div>
                <p className="text-[#1C1C1C]/55 text-lg">
                  We'll review your brief and get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <p className="text-[#D64545] text-[10px] font-mono uppercase tracking-[0.25em] mb-8">
                  Tell us about your project
                </p>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#1C1C1C]/50 text-[10px] font-mono uppercase tracking-[0.2em]">
                    Name *
                  </label>
                  <input
                    {...register("name")}
                    placeholder="Your name"
                    className="w-full bg-[#F5EFE6] text-[#1C1C1C] text-sm border border-[#1C1C1C]/15 rounded-sm px-4 py-3 outline-none focus:border-[#1C1C1C]/40 placeholder:text-[#1C1C1C]/30 transition-colors duration-150"
                  />
                  {errors.name && <p className="text-[#D64545] text-xs">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#1C1C1C]/50 text-[10px] font-mono uppercase tracking-[0.2em]">
                    Email *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-[#F5EFE6] text-[#1C1C1C] text-sm border border-[#1C1C1C]/15 rounded-sm px-4 py-3 outline-none focus:border-[#1C1C1C]/40 placeholder:text-[#1C1C1C]/30 transition-colors duration-150"
                  />
                  {errors.email && <p className="text-[#D64545] text-xs">{errors.email.message}</p>}
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#1C1C1C]/50 text-[10px] font-mono uppercase tracking-[0.2em]">
                    Company
                  </label>
                  <input
                    {...register("company")}
                    placeholder="Your company or brand"
                    className="w-full bg-[#F5EFE6] text-[#1C1C1C] text-sm border border-[#1C1C1C]/15 rounded-sm px-4 py-3 outline-none focus:border-[#1C1C1C]/40 placeholder:text-[#1C1C1C]/30 transition-colors duration-150"
                  />
                </div>

                {/* Budget — pill toggles */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#1C1C1C]/50 text-[10px] font-mono uppercase tracking-[0.2em]">
                    Budget
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgetOptions.map((opt) => (
                      <label key={opt} className="cursor-pointer">
                        <input type="radio" value={opt} {...register("budget")} className="sr-only peer" />
                        <span className="inline-block border border-[#1C1C1C]/15 rounded-sm px-4 py-2 text-xs font-mono text-[#1C1C1C]/50 peer-checked:border-[#D64545] peer-checked:text-[#D64545] peer-checked:bg-[#D64545]/05 hover:border-[#1C1C1C]/30 hover:text-[#1C1C1C]/70 transition-all duration-150 select-none">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#1C1C1C]/50 text-[10px] font-mono uppercase tracking-[0.2em]">
                    Project Brief *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell us about your project goals, timeline, and challenges…"
                    className="w-full bg-[#F5EFE6] text-[#1C1C1C] text-sm border border-[#1C1C1C]/15 rounded-sm px-4 py-3 outline-none focus:border-[#1C1C1C]/40 placeholder:text-[#1C1C1C]/30 resize-none transition-colors duration-150"
                  />
                  {errors.message && <p className="text-[#D64545] text-xs">{errors.message.message}</p>}
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#D64545] text-white font-bold px-10 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-[#8B3232] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending…" : "Send Message →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
