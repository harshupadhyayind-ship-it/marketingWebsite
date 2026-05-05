"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const ContactCanvas = dynamic(() => import("@/components/three/ContactCanvas"), { ssr: false });

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

/* ── 3D tilt wrapper for the form card ── */
function TiltForm({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() { rawX.set(0); rawY.set(0); }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}

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
    <div className="bg-[#0D0B08] min-h-screen">

      {/* ── Hero with 3D portal canvas ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "70vh" }}>
        <div className="absolute inset-0 pointer-events-none">
          <ContactCanvas />
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0D0B08)" }}
        />

        <section className="relative z-10 pt-40 pb-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-end">
          <div>
            <p className="text-[#9CAF88] text-xs font-mono uppercase tracking-[0.2em] mb-6">Get In Touch</p>
            <h1
              className="font-bold text-[#F5F1E8] leading-none"
              style={{ fontSize: "clamp(3rem, 7vw, 7rem)", letterSpacing: "-0.04em" }}
            >
              Let's build
              <br />
              something
              <br />
              <em className="text-[#9CAF88] not-italic">extraordinary.</em>
            </h1>
          </div>
          <div className="space-y-8">
            <div>
              <p className="text-[#8B7E6E] text-xs font-mono uppercase tracking-widest mb-2">Email</p>
              <a
                href="mailto:hello@chronogrowth.in"
                className="text-[#F5F1E8] text-xl hover:text-[#9CAF88] transition-colors duration-200"
              >
                hello@chronogrowth.in
              </a>
            </div>
            <div>
              <p className="text-[#8B7E6E] text-xs font-mono uppercase tracking-widest mb-2">Phone</p>
              <a
                href="tel:+919876543210"
                className="text-[#F5F1E8] text-xl hover:text-[#9CAF88] transition-colors duration-200"
              >
                +91 98765 43210
              </a>
            </div>
            <div>
              <p className="text-[#8B7E6E] text-xs font-mono uppercase tracking-widest mb-2">Location</p>
              <p className="text-[#F5F1E8] text-xl">Mumbai, India</p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-[#9CAF88] animate-pulse" />
              <span className="text-[#8B7E6E] text-sm">Usually responds within 24 hrs</span>
            </div>
          </div>
        </section>
      </div>

      {/* ── Form with subtle 3D tilt ── */}
      <section className="border-t border-[#F5F1E8]/10 py-24 px-6" style={{ perspective: "1200px" }}>
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div
                className="text-[#9CAF88] mb-6"
                style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.04em", fontWeight: 700 }}
              >
                Message sent ✓
              </div>
              <p className="text-[#8B7E6E] text-xl">
                We'll review your brief and get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <TiltForm>
              <p className="text-[#9CAF88] text-xs font-mono uppercase tracking-[0.2em] mb-12">
                Tell us about your project
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">

                {/* Name */}
                <div className="border-t border-[#F5F1E8]/10 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <label className="text-[#8B7E6E] text-sm font-mono uppercase tracking-widest w-40 flex-shrink-0">
                    Name *
                  </label>
                  <div className="flex-1">
                    <input
                      {...register("name")}
                      placeholder="Your name"
                      className="w-full bg-transparent text-[#F5F1E8] text-lg border-none outline-none placeholder:text-[#F5F1E8]/20 focus:placeholder:text-[#F5F1E8]/10"
                    />
                    {errors.name && <p className="text-[#C4784A] text-xs mt-1">{errors.name.message}</p>}
                  </div>
                </div>

                {/* Email */}
                <div className="border-t border-[#F5F1E8]/10 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <label className="text-[#8B7E6E] text-sm font-mono uppercase tracking-widest w-40 flex-shrink-0">
                    Email *
                  </label>
                  <div className="flex-1">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-transparent text-[#F5F1E8] text-lg border-none outline-none placeholder:text-[#F5F1E8]/20"
                    />
                    {errors.email && <p className="text-[#C4784A] text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Company */}
                <div className="border-t border-[#F5F1E8]/10 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <label className="text-[#8B7E6E] text-sm font-mono uppercase tracking-widest w-40 flex-shrink-0">
                    Company
                  </label>
                  <input
                    {...register("company")}
                    placeholder="Your company or brand"
                    className="flex-1 bg-transparent text-[#F5F1E8] text-lg border-none outline-none placeholder:text-[#F5F1E8]/20"
                  />
                </div>

                {/* Budget */}
                <div className="border-t border-[#F5F1E8]/10 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <label className="text-[#8B7E6E] text-sm font-mono uppercase tracking-widest w-40 flex-shrink-0">
                    Budget
                  </label>
                  <select
                    {...register("budget")}
                    className="flex-1 bg-transparent text-[#F5F1E8] text-lg border-none outline-none appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0D0B08]">Select a range…</option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0D0B08]">{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="border-t border-[#F5F1E8]/10 py-6 flex flex-col gap-4">
                  <label className="text-[#8B7E6E] text-sm font-mono uppercase tracking-widest">
                    Project Brief *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell us about your project goals, timeline, and challenges…"
                    className="w-full bg-transparent text-[#F5F1E8] text-lg border-none outline-none resize-none placeholder:text-[#F5F1E8]/20"
                  />
                  {errors.message && <p className="text-[#C4784A] text-xs">{errors.message.message}</p>}
                </div>

                {/* Submit */}
                <div className="border-t border-[#F5F1E8]/10 pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#9CAF88] text-[#0D0B08] font-bold px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#F5F1E8] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending…" : "Send Message →"}
                  </button>
                </div>
              </form>
            </TiltForm>
          )}
        </div>
      </section>
    </div>
  );
}
