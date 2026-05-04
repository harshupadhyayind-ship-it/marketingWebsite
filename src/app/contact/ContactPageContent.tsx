"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, Check, Share2, MessageCircle, Briefcase } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  budget: z.string().optional(),
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

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@chronogrowth.in", href: "mailto:hello@chronogrowth.in" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: MapPin, label: "Location", value: "Mumbai, Maharashtra, India", href: "#" },
];

const social = [
  { icon: Share2, label: "Instagram", href: "#" },
  { icon: MessageCircle, label: "Twitter / X", href: "#" },
  { icon: Briefcase, label: "LinkedIn", href: "#" },
];

export default function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Form data:", data);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-beige relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <span className="inline-block text-sage text-sm font-medium uppercase tracking-widest mb-4">
              Get In Touch
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Let&apos;s build something
              <br />
              <span className="text-gradient">extraordinary</span>.
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="text-stone text-xl leading-relaxed max-w-2xl">
              Tell us about your project and we&apos;ll get back to you within 24
              hours with initial thoughts and next steps.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-beige">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          {/* Contact info sidebar */}
          <AnimatedSection direction="left" className="lg:col-span-1">
            <div className="space-y-6">
              {/* Info cards */}
              <div className="rounded-2xl bg-white border border-beige-dark p-6 shadow-warm">
                <h3 className="font-heading font-bold text-foreground mb-5">Contact Details</h3>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      className="flex items-start gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-sage/15 flex items-center justify-center flex-shrink-0">
                        <info.icon size={15} className="text-sage" />
                      </div>
                      <div>
                        <div className="text-stone text-xs">{info.label}</div>
                        <div className="text-foreground text-sm font-medium group-hover:text-sage transition-colors">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="rounded-2xl bg-white border border-beige-dark p-6 shadow-warm">
                <h3 className="font-heading font-bold text-foreground mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm text-stone">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="text-foreground font-medium">9am – 6pm IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-foreground font-medium">10am – 2pm IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-foreground font-medium">Closed</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-beige-dark">
                  <div className="flex items-center gap-2 text-sm text-sage font-medium">
                    <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                    Usually responds within 24 hrs
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="rounded-2xl bg-white border border-beige-dark p-6 shadow-warm">
                <h3 className="font-heading font-bold text-foreground mb-4">Follow Our Work</h3>
                <div className="flex gap-3">
                  {social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="w-10 h-10 rounded-xl bg-sage/15 flex items-center justify-center hover:bg-sage/25 transition-colors"
                    >
                      <s.icon size={16} className="text-sage" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.15} direction="right" className="lg:col-span-2">
            <div className="rounded-3xl bg-white border border-beige-dark p-8 md:p-10 shadow-warm-lg">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-6">
                    <Check size={28} className="text-sage" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                    Message sent!
                  </h3>
                  <p className="text-stone leading-relaxed max-w-sm mx-auto">
                    Thanks for reaching out. We&apos;ll review your brief and get
                    back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                    Tell us about your project
                  </h2>
                  <p className="text-stone text-sm mb-8">
                    The more detail you share, the better our initial response.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Your Name <span className="text-sage">*</span>
                        </label>
                        <Input
                          {...register("name")}
                          placeholder="Priya Mehta"
                          className="bg-beige border-beige-dark focus:border-sage focus:ring-sage/20"
                        />
                        {errors.name && (
                          <p className="text-xs text-[#C4784A] mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Email Address <span className="text-sage">*</span>
                        </label>
                        <Input
                          {...register("email")}
                          type="email"
                          placeholder="priya@company.com"
                          className="bg-beige border-beige-dark focus:border-sage focus:ring-sage/20"
                        />
                        {errors.email && (
                          <p className="text-xs text-[#C4784A] mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Company / Brand
                      </label>
                      <Input
                        {...register("company")}
                        placeholder="Your company name"
                        className="bg-beige border-beige-dark focus:border-sage"
                      />
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Budget Range
                      </label>
                      <select
                        {...register("budget")}
                        className="w-full h-10 rounded-lg border border-beige-dark bg-beige px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-colors"
                      >
                        <option value="">Select a budget range...</option>
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Project Brief <span className="text-sage">*</span>
                      </label>
                      <Textarea
                        {...register("message")}
                        rows={5}
                        placeholder="Tell us about your project goals, timeline, and any specific challenges you're facing..."
                        className="bg-beige border-beige-dark focus:border-sage focus:ring-sage/20 resize-none"
                      />
                      {errors.message && (
                        <p className="text-xs text-[#C4784A] mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-sage hover:bg-[#7A9068] text-white font-semibold rounded-full py-5 shadow-warm-lg transition-all hover:-translate-y-0.5"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send size={15} />
                        </span>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
