import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1E1710] text-[#E8E2D4]">
      <div className="max-w-[1440px] mx-auto px-8 py-16">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-b border-[#3D3222] pb-12 mb-12">
          <div>
            <span className="font-heading font-bold text-2xl text-[#F5F1E8] tracking-tight">
              Chrono<span className="text-[#9CAF88]">Growth</span>
            </span>
            <p className="text-[#8B7E6E] text-sm mt-3 max-w-xs leading-relaxed">
              Premium marketing agency crafting brands that command attention.
              Mumbai, India.
            </p>
          </div>

          <nav className="flex flex-wrap gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label text-[#8B7E6E] hover:text-[#9CAF88] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[#4D4232] text-xs">
          <p>© {new Date().getFullYear()} ChronoGrowth LLP · All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#9CAF88] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#9CAF88] transition-colors">Terms</Link>
            <a
              href="mailto:hello@chronogrowth.in"
              className="hover:text-[#9CAF88] transition-colors inline-flex items-center gap-1"
            >
              hello@chronogrowth.in
              <ArrowUpRight size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
