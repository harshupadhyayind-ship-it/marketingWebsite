"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

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
    <div className="bg-white min-h-screen">

      {/* ── Page header ── */}
      <section className="pt-40 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
        <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
          Get In Touch
        </p>
        <h1
          className="font-bold text-[#0A0A0F] leading-none"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)", letterSpacing: "-0.04em" }}
        >
          Let's build
          <br />
          something
          <br />
          <em className="text-[#E63327] not-italic">extraordinary.</em>
        </h1>
      </section>

      {/* ── Two-column layout ── */}
      <section className="border-t border-[#0A0A0F]/08 px-6 md:px-10 py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* LEFT — contact details */}
          <div className="flex flex-col gap-10">
            <p className="text-[#0A0A0F]/55 text-lg leading-relaxed max-w-sm">
              Drop us a message and we'll put together a custom strategy for your brand.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-[#0A0A0F]/50 text-[10px] font-mono uppercase tracking-[0.25em] mb-2">
                  Email
                </p>
                <a
                  href="mailto:hello@chronogrowth.in"
                  className="text-[#0A0A0F] text-xl hover:text-[#E63327] transition-colors duration-200"
                >
                  hello@chronogrowth.in
                </a>
              </div>
              <div>
                <p className="text-[#0A0A0F]/50 text-[10px] font-mono uppercase tracking-[0.25em] mb-2">
                  Phone
                </p>
                <a
                  href="tel:+919876543210"
                  className="text-[#0A0A0F] text-xl hover:text-[#E63327] transition-colors duration-200"
                >
                  +91 98765 43210
                </a>
              </div>
              <div>
                <p className="text-[#0A0A0F]/50 text-[10px] font-mono uppercase tracking-[0.25em] mb-2">
                  Location
                </p>
                <p className="text-[#0A0A0F] text-xl">Mumbai, India</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-[#E63327] animate-pulse" />
              <span className="text-[#0A0A0F]/50 text-sm">Usually responds within 24 hrs</span>
            </div>
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
                  className="text-[#E63327] mb-6 font-bold"
                  style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em" }}
                >
                  Message sent ✓
                </div>
                <p className="text-[#0A0A0F]/55 text-lg">
                  We'll review your brief and get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <p className="text-[#E63327] text-[10px] font-mono uppercase tracking-[0.25em] mb-8">
                  Tell us about your project
                </p>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#0A0A0F]/50 text-[10px] font-mono uppercase tracking-[0.2em]">
                    Name *
                  </label>
                  <input
                    {...register("name")}
                    placeholder="Your name"
                    className="w-full bg-white text-[#0A0A0F] text-sm border border-[#0A0A0F]/15 rounded-sm px-4 py-3 outline-none focus:border-[#0A0A0F]/40 placeholder:text-[#0A0A0F]/30 transition-colors duration-150"
                  />
                  {errors.name && <p className="text-[#E63327] text-xs">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#0A0A0F]/50 text-[10px] font-mono uppercase tracking-[0.2em]">
                    Email *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-white text-[#0A0A0F] text-sm border border-[#0A0A0F]/15 rounded-sm px-4 py-3 outline-none focus:border-[#0A0A0F]/40 placeholder:text-[#0A0A0F]/30 transition-colors duration-150"
                  />
                  {errors.email && <p className="text-[#E63327] text-xs">{errors.email.message}</p>}
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#0A0A0F]/50 text-[10px] font-mono uppercase tracking-[0.2em]">
                    Company
                  </label>
                  <input
                    {...register("company")}
                    placeholder="Your company or brand"
                    className="w-full bg-white text-[#0A0A0F] text-sm border border-[#0A0A0F]/15 rounded-sm px-4 py-3 outline-none focus:border-[#0A0A0F]/40 placeholder:text-[#0A0A0F]/30 transition-colors duration-150"
                  />
                </div>

                {/* Budget — pill toggles */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#0A0A0F]/50 text-[10px] font-mono uppercase tracking-[0.2em]">
                    Budget
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgetOptions.map((opt) => (
                      <label key={opt} className="cursor-pointer">
                        <input type="radio" value={opt} {...register("budget")} className="sr-only peer" />
                        <span className="inline-block border border-[#0A0A0F]/15 rounded-sm px-4 py-2 text-xs font-mono text-[#0A0A0F]/50 peer-checked:border-[#E63327] peer-checked:text-[#E63327] peer-checked:bg-[#E63327]/05 hover:border-[#0A0A0F]/30 hover:text-[#0A0A0F]/70 transition-all duration-150 select-none">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#0A0A0F]/50 text-[10px] font-mono uppercase tracking-[0.2em]">
                    Project Brief *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell us about your project goals, timeline, and challenges…"
                    className="w-full bg-white text-[#0A0A0F] text-sm border border-[#0A0A0F]/15 rounded-sm px-4 py-3 outline-none focus:border-[#0A0A0F]/40 placeholder:text-[#0A0A0F]/30 resize-none transition-colors duration-150"
                  />
                  {errors.message && <p className="text-[#E63327] text-xs">{errors.message.message}</p>}
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#E63327] text-white font-bold px-10 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-[#B5261B] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
