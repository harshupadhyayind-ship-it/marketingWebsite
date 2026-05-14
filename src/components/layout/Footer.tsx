import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Services", href: "/services" },
  { label: "Work",     href: "/work"     },
  { label: "About",    href: "/about"    },
  { label: "Contact",  href: "/contact"  },
];

const social = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn",  href: "https://linkedin.com"  },
  { label: "Twitter",   href: "https://twitter.com"   },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0F] border-t-2 border-[#E63327]">
      <div className="max-w-[1440px] mx-auto px-8 pt-16 pb-10">

        {/* Top row — brand + nav */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 border-b border-white/08 pb-12 mb-10">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <Image
                src="/logo.svg"
                alt="BRANDD-AID logo"
                width={52}
                height={52}
                className="rounded-sm flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-black text-white text-xl leading-none tracking-[0.06em] group-hover:text-[#E63327] transition-colors duration-200">
                  BRANDD<span className="text-[#E63327]">-AID</span>
                </span>
                <span className="text-[#E63327]/60 text-[8px] font-mono uppercase tracking-[0.28em] mt-1">
                  Marketing That Elevates
                </span>
              </div>
            </Link>
            <p className="text-white/35 text-sm max-w-xs leading-relaxed">
              Elevating brands that refuse to be ignored.
              Mumbai, India.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-10 gap-y-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-white/45 text-xs font-mono uppercase tracking-[0.18em] hover:text-white transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-white/25 text-xs font-mono">
            © {new Date().getFullYear()} BRANDD-AID · All rights reserved
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 text-xs font-mono uppercase tracking-widest hover:text-[#E63327] transition-colors duration-200"
              >
                {s.label}
              </a>
            ))}
            <span className="text-white/15">·</span>
            <a href="mailto:hello@branddaid.com" className="text-white/35 text-xs font-mono hover:text-[#E63327] transition-colors duration-200">
              hello@branddaid.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
